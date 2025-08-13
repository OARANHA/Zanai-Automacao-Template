#!/usr/bin/env node
// Busca semântica no Qdrant usando embeddings do Ollama
// Uso: node scripts/search_repo.mjs "sua pergunta" [--limit 8] [--file <substr|/regex/i>] [--json] [--no-snippet]
const QDRANT = process.env.QDRANT_URL || 'http://127.0.0.1:6333'
const OLLAMA = process.env.OLLAMA_URL || 'http://127.0.0.1:11434'
const COLLECTION = process.env.QDRANT_COLLECTION  // REMOVIDO o valor padrão
const EMBED_MODEL = process.env.EMBED_MODEL || 'bge-m3'
const DEFAULT_LIMIT = Number(process.env.SEARCH_LIMIT || 8)
const WITH_SNIPPET = !/^0|false|no$/i.test(String(process.env.WITH_SNIPPET || '1'))
const EMBED_PAYLOAD = (process.env.EMBED_PAYLOAD || 'auto').toLowerCase()



// Verifica se a collection foi definida
if (!COLLECTION) {
    console.error('❌ Erro: QDRANT_COLLECTION não está definida')
    console.error('Por favor, defina uma collection específica no .env')
    process.exit(1)
}

console.log(`🔎 Usando collection: ${COLLECTION}`)
/* ======================= FUNÇÕES ======================= */

function parseArgs() {
    const args = process.argv.slice(2)
    const out = { q: '', limit: DEFAULT_LIMIT, json: false, fileFilter: null, withSnippet: WITH_SNIPPET }
    // flags simples
    for (let i = 0; i < args.length; i++) {
        const a = args[i]
        if (a === '--limit' && i + 1 < args.length) {
            out.limit = Number(args[++i]) || out.limit
            continue
        }
        if (a === '--json') {
            out.json = true
            continue
        }
        if (a === '--no-snippet') {
            out.withSnippet = false
            continue
        }
        if (a === '--file' && i + 1 < args.length) {
            out.fileFilter = args[++i]
            continue
        }
        // tudo que não for flag vira parte do texto
        out.q += (out.q ? ' ' : '') + a
    }
    return out
}
function compileFileFilter(spec) {
    if (!spec) return null
    // regex estilo /padrão/flags
    const m = String(spec).match(/^\/(.*)\/([gimsuy]*)$/)
    if (m) {
        try {
            const re = new RegExp(m[1], m[2])
            return (s) => re.test(s)
        } catch {
            /* fallback substr */
        }
    }
    const sub = String(spec).toLowerCase()
    return (s) => String(s).toLowerCase().includes(sub)
}
async function embed(text) {
    const bodies =
        EMBED_PAYLOAD === 'prompt'
            ? [
                  { model: EMBED_MODEL, prompt: text },
                  { model: EMBED_MODEL, input: text },
                  { model: EMBED_MODEL, input: [text] }
              ]
            : EMBED_PAYLOAD === 'input'
            ? [
                  { model: EMBED_MODEL, input: text },
                  { model: EMBED_MODEL, prompt: text },
                  { model: EMBED_MODEL, input: [text] }
              ]
            : [
                  { model: EMBED_MODEL, input: text },
                  { model: EMBED_MODEL, prompt: text },
                  { model: EMBED_MODEL, input: [text] }
              ]
    for (const body of bodies) {
        try {
            const r = await fetch(`${OLLAMA}/api/embeddings`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(body)
            })
            if (!r.ok) continue
            const j = await r.json().catch(() => ({}))
            const vec =
                j.embedding ??
                (Array.isArray(j.data) ? j.data[0]?.embedding : undefined) ??
                (Array.isArray(j.embeddings) ? j.embeddings[0] : undefined)
            if (Array.isArray(vec) && vec.length) return vec
        } catch {}
    }
    throw new Error('Falha ao gerar embedding')
}
function makeSnippet(t = '', max = 180) {
    if (!t) return ''
    const clean = String(t).replace(/\s+/g, ' ').trim()
    return clean.length > max ? clean.slice(0, max) + '…' : clean
}
async function search(vector, limit, fileFilterFn) {
    // Para permitir filtro por arquivo no cliente, pedimos mais resultados e filtramos.
    const overshoot = fileFilterFn ? Math.min(limit * 5, 100) : limit
    const res = await fetch(`${QDRANT}/collections/${COLLECTION}/points/search`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            vector,
            limit: overshoot,
            with_payload: true,
            with_vectors: false
        })
    })
    if (!res.ok) {
        const txt = await res.text().catch(() => '')
        throw new Error(`Qdrant HTTP ${res.status}: ${txt}`)
    }
    let result = (await res.json()).result || []
    if (fileFilterFn) {
        result = result.filter((r) => fileFilterFn(r?.payload?.file || ''))
    }
    result.sort((a, b) => (b.score || 0) - (a.score || 0))
    return result.slice(0, limit)
}
async function main() {
    const { q, limit, json, fileFilter, withSnippet } = parseArgs()
    if (!q) {
        console.error('Uso: node scripts/search_repo.mjs "sua pergunta" [--limit 8] [--file <substr|/regex/i>] [--json] [--no-snippet]')
        process.exit(1)
    }
    const fileFilterFn = compileFileFilter(fileFilter)
    const v = await embed(q)
    const hits = await search(v, limit, fileFilterFn)
    if (json) {
        console.log(JSON.stringify({ query: q, collection: COLLECTION, hits }, null, 2))
        return
    }
    console.log(`🔎 "${q}"  |  coleção: ${COLLECTION}  |  top ${limit}${fileFilter ? `  |  filtro: ${fileFilter}` : ''}`)
    for (const r of hits) {
        const p = r.payload || {}
        const line = `• ${p.file || '<sem arquivo>'}  (score ${Number(r.score).toFixed(3)})  idx=${p.idx ?? '?'}`
        if (withSnippet && p.text) {
            console.log(line + `\n    → ${makeSnippet(p.text)}\n`)
        } else {
            console.log(line)
        }
    }
}
main().catch((e) => {
    console.error('Erro:', e.message)
    process.exit(1)
})