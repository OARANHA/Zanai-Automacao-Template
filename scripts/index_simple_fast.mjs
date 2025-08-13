#!/usr/bin/env node
// Versão rápida com sanitização inteligente para evitar problemas de JSON
import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
/* ======================= CONFIG (por ENV) ======================= */
const QDRANT = process.env.QDRANT_URL || 'http://127.0.0.1:6333'
const OLLAMA = process.env.OLLAMA_URL || 'http://127.0.0.1:11434'
const COLLECTION = process.env.QDRANT_COLLECTION  // REMOVIDO o valor padrão
const EMBED_MODEL = process.env.EMBED_MODEL || 'bge-m3'
const EMBED_PAYLOAD = (process.env.EMBED_PAYLOAD || 'auto').toLowerCase()
const INDEX_ROOT = path.resolve(process.env.INDEX_ROOT || '.')
const BATCH = Number(process.env.BATCH || 64)
const ONLY_N = Number(process.env.ONLY_N || 0)
const MAX_DEPTH = Number(process.env.MAX_DEPTH || 8)
const MAX_FILE_MB = Number(process.env.MAX_FILE_MB || 1.5)
const MAX_CHARS_FILE = Number(process.env.MAX_CHARS_FILE || 200_000)
const CHUNK_SIZE = Number(process.env.CHUNK_SIZE || 1200)
const CHUNK_OVERLAP = Number(process.env.CHUNK_OVERLAP || 200)
const GOOD_EXT = /\.(md|mdx|tsx?|jsx?|mjs|cjs|json|ya?ml|css|scss|less|html|txt|sql|sh|bash|zsh|py|go)$/i
const IGNORE_DIRS = new Set(['.git', '.github', '.next', 'node_modules', 'dist', 'build', '.turbo', '.vercel', '.cache', 'coverage'])
;(process.env.IGNORE_DIRS || '')
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .forEach((d) => IGNORE_DIRS.add(d))
const IGNORE_PATHS = (process.env.IGNORE_PATHS || '')
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter(Boolean)

// Verifica se a collection foi definida
if (!COLLECTION) {
    console.error('❌ Erro: QDRANT_COLLECTION não está definida')
    console.error('Por favor, defina uma collection específica no .env')
    process.exit(1)
}

console.log(`🔍 Usando collection: ${COLLECTION}`)

/* ======================= HELPERS ======================= */

// Sanitização rápida e inteligente - focada nos problemas específicos
function fastSanitize(text) {
    if (typeof text !== 'string') return ''

    // 1. Corrigir escapes Unicode incompletos (o principal problema)
    // Converte \u123 (incompleto) para espaço
    let sanitized = text.replace(/\\u[0-9a-fA-F]{1,3}(?![0-9a-fA-F])/g, ' ')

    // 2. Corrigir escapes Unicode muito longos
    // Converte \u123456 para \u1234 (pega só os 4 primeiros dígitos)
    sanitized = sanitized.replace(/\\u([0-9a-fA-F]{4})[0-9a-fA-F]*/g, '\\u$1')

    // 3. Remover caracteres de controle que quebram JSON (menos agressivo)
    // Mantém \t, \n, \r mas remove outros
    sanitized = sanitized.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, ' ')

    // 4. Corrigir aspas não escapadas (que podem quebrar strings JSON)
    sanitized = sanitized.replace(/(?<!\\)"/g, '\\"')

    // 5. Remover barras invertidas soltas que não são escapes válidos
    sanitized = sanitized.replace(/\\(?!["\\/bfnrtu])/g, '\\\\')

    // 6. Limitar tamanho apenas se for muito grande (mantém performance)
    if (sanitized.length > 15000) {
        sanitized = sanitized.substring(0, 15000) + '...[truncated]'
    }

    return sanitized
}

// Verificação rápida de JSON - só verifica se o texto é serializável
function isJSONSafe(text) {
    try {
        JSON.stringify({ test: text })
        return true
    } catch {
        return false
    }
}

function splitText(t, size = CHUNK_SIZE, overlap = CHUNK_OVERLAP) {
    const chunks = []
    if (!t) return chunks
    const step = Math.max(1, size - overlap)
    for (let i = 0; i < t.length; i += step) {
        chunks.push(t.slice(i, i + size))
        if (i + size >= t.length) break
    }
    return chunks
}

async function* walk(dir, depth = 0) {
    if (depth > MAX_DEPTH) return
    let entries
    try {
        entries = await fs.readdir(dir, { withFileTypes: true })
    } catch {
        return
    }
    for (const e of entries) {
        const p = path.join(dir, e.name)
        if (IGNORE_PATHS.some((seg) => p.includes(seg))) continue
        if (e.isDirectory()) {
            if (e.name.startsWith('.') || IGNORE_DIRS.has(e.name)) continue
            yield* walk(p, depth + 1)
        } else if (e.isFile()) {
            if (!GOOD_EXT.test(e.name)) continue
            try {
                const st = await fs.stat(p)
                if (st.size > MAX_FILE_MB * 1024 * 1024) continue
            } catch {}
            yield p
        }
    }
}

async function embed(text) {
    const bodies = [
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
            if (Array.isArray(vec) && vec.length > 0) return vec
        } catch (_) {}
    }
    throw new Error('embedding falhou')
}

async function detectDim() {
    const v = await embed('test')
    if (!Array.isArray(v) || v.length === 0) throw new Error('Falha no embedding probe')
    return v.length
}

async function ensureCollection(dim) {
    const exist = await fetch(`${QDRANT}/collections/${COLLECTION}`)
    if (exist.ok) return
    const bodies = [
        { vectors: { size: dim, distance: 'Cosine' }, on_disk_payload: true },
        { vectors: { config: { size: dim, distance: 'Cosine' } }, on_disk_payload: true }
    ]
    for (const body of bodies) {
        const r = await fetch(`${QDRANT}/collections/${COLLECTION}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body)
        })
        if (r.ok) return
    }
    throw new Error(`Não consegui criar coleção ${COLLECTION}`)
}

async function fastUpsert(points) {
    if (!points.length) return

    // Sanitização rápida em lote
    const sanitizedPoints = points.map((point) => {
        const sanitizedText = fastSanitize(point.payload.text)

        // Verificação rápida - se ainda não for seguro, usar fallback
        const finalText = isJSONSafe(sanitizedText) ? sanitizedText : '[text sanitized]'

        return {
            id: point.id,
            vector: point.vector,
            payload: {
                file: point.payload.file,
                idx: point.payload.idx,
                scope: 'root',
                text: finalText
            }
        }
    })

    // Criar JSON com tratamento de erro mínimo (para manter velocidade)
    let requestBody
    try {
        requestBody = JSON.stringify({ points: sanitizedPoints })
    } catch (jsonError) {
        // Fallback rápido - remover texto completamente
        const fallbackPoints = sanitizedPoints.map((point) => ({
            id: point.id,
            vector: point.vector,
            payload: {
                file: point.payload.file,
                idx: point.payload.idx,
                scope: 'root'
                // sem texto
            }
        }))

        try {
            requestBody = JSON.stringify({ points: fallbackPoints })
        } catch {
            // Se ainda falhar, pular este lote
            console.error('\n⚠️  Lote pulado devido a erro de JSON')
            return
        }
    }

    // Enviar sem retry (para manter velocidade)
    try {
        const r = await fetch(`${QDRANT}/collections/${COLLECTION}/points?wait=true`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: requestBody
        })

        if (!r.ok) {
            const errorText = await r.text()
            throw new Error(`HTTP ${r.status}: ${errorText}`)
        }
    } catch (fetchError) {
        if (fetchError.message.includes('HTTP')) {
            throw fetchError
        }
        throw new Error(`Network error: ${fetchError.message}`)
    }
}

/* ======================= MAIN ======================= */
async function main() {
    try {
        await fs.access(INDEX_ROOT)
    } catch {
        throw new Error(`INDEX_ROOT não encontrado: ${INDEX_ROOT}`)
    }

    console.log(`⚡ MODO RÁPIDO COM SANITIZAÇÃO INTELIGENTE`)
    console.log(`⚙️  QDRANT=${QDRANT}  OLLAMA=${OLLAMA}  MODEL=${EMBED_MODEL}`)
    console.log(`   BATCH=${BATCH}  CHUNK_SIZE=${CHUNK_SIZE}  ROOT=${INDEX_ROOT}`)

    const dim = await detectDim()
    console.log(`→ dimensão detectada: ${dim}`)
    await ensureCollection(dim)

    const files = []
    for await (const f of walk(INDEX_ROOT)) files.push(f)
    const filesForRun = ONLY_N > 0 ? files.slice(0, ONLY_N) : files

    console.log(`📄 ${filesForRun.length}/${files.length} arquivos para indexar...`)

    let buffer = []
    let total = 0
    let startTime = Date.now()

    for (let fi = 0; fi < filesForRun.length; fi++) {
        const file = filesForRun[fi]

        // Progresso a cada 100 arquivos para não impactar performance
        if (fi % 100 === 0 && fi > 0) {
            const elapsed = (Date.now() - startTime) / 1000
            const rate = (total / elapsed).toFixed(1)
            console.log(`\n📊 Progresso: ${fi}/${filesForRun.length} arquivos, ${total} chunks, ${rate} chunks/sec`)
        }

        let raw = ''
        try {
            raw = await fs.readFile(file, 'utf8')
        } catch {
            continue
        }

        if (raw.length > MAX_CHARS_FILE) {
            raw = raw.slice(0, MAX_CHARS_FILE)
        }

        const chunks = splitText(raw)

        for (let i = 0; i < chunks.length; i++) {
            const text = chunks[i]
            let vector

            try {
                vector = await embed(text)
                if (!Array.isArray(vector) || vector.length === 0) {
                    continue
                }
            } catch (e) {
                continue
            }

            buffer.push({
                id: crypto.randomUUID(),
                vector,
                payload: {
                    file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
                    idx: i,
                    scope: 'root',
                    text
                }
            })

            if (buffer.length >= BATCH) {
                try {
                    await fastUpsert(buffer)
                    total += buffer.length
                    process.stdout.write(`\r⚡ upserted ${buffer.length} (total=${total})`)
                    buffer = []
                } catch (upsertError) {
                    console.error(`\n❌ Upsert falhou: ${upsertError.message}`)
                    buffer = []
                    // Continuar com o próximo arquivo
                    break
                }
            }
        }
    }

    // Enviar lote final
    if (buffer.length) {
        try {
            await fastUpsert(buffer)
            total += buffer.length
            process.stdout.write(`\r⚡ upserted ${buffer.length} (total=${total})`)
        } catch (e) {
            console.error(`\n❌ Upsert final falhou: ${e.message}`)
        }
    }

    const totalTime = (Date.now() - startTime) / 1000
    const avgRate = (total / totalTime).toFixed(1)

    console.log(`\n🎉 CONCLUÍDO!`)
    console.log(`   ✅ Total chunks: ${total}`)
    console.log(`   ⏱️  Tempo total: ${totalTime.toFixed(1)}s`)
    console.log(`   📈 Velocidade média: ${avgRate} chunks/segundo`)
}

main().catch((e) => {
    console.error('💥 ERRO FATAL:', e.message)
    process.exit(1)
})
