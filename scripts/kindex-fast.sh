#!/usr/bin/env bash
set -euo pipefail

# =============================================
# Kilo Code - Script de Indexação Seguro
# =============================================

# Função de validação segura de variáveis
validate_var() {
    local var_name="$1"
    local var_value="$2"
    local pattern="$3"
    
    if [[ -z "$var_value" ]]; then
        echo "❌ Erro: $var_name não está definida"
        exit 1
    fi
    
    if [[ -n "$pattern" ]] && [[ ! "$var_value" =~ $pattern ]]; then
        echo "❌ Erro: $var_name contém caracteres inválidos"
        exit 1
    fi
}

# Função para sanitizar entrada
sanitize_path() {
    local path="$1"
    # Remove caminhos relativos perigosos e normaliza
    echo "$path" | sed -e 's/\.\.\///g' -e 's/^\///g' -e 's/\/$//g'
}

# Carrega variáveis de ambiente de forma segura
if [ -f ".env" ]; then
    while IFS='=' read -r key value; do
        # Ignora comentários e linhas vazias
        [[ $key =~ ^[[:space:]]*# ]] && continue
        [[ -z $key ]] && continue
        
        # Remove espaços e aspas
        key=$(echo "$key" | tr -d ' "')
        value=$(echo "$value" | tr -d '"')
        
        # Valida e exporta apenas variáveis permitidas
        case "$key" in
            QDRANT_URL|OLLAMA_URL|EMBED_MODEL|QDRANT_COLLECTION|EMBED_PAYLOAD|INDEX_ROOT|BATCH|CHUNK_SIZE|CHUNK_OVERLAP|MAX_FILE_MB|MAX_CHARS_FILE|SEARCH_LIMIT|WITH_SNIPPET)
                validate_var "$key" "$value"
                export "$key=$value"
                ;;
        esac
    done < .env
fi

# Configurações com validação
export EMBED_PAYLOAD="${EMBED_PAYLOAD:-input}"
export EMBED_MODEL="${EMBED_MODEL:-all-minilm}"
export INDEX_ROOT="$(sanitize_path "${INDEX_ROOT:-.}")"
export BATCH="${BATCH:-64}"
export CHUNK_SIZE="${CHUNK_SIZE:-1200}"
export CHUNK_OVERLAP="${CHUNK_OVERLAP:-200}"
export MAX_FILE_MB="${MAX_FILE_MB:-1.5}"
export MAX_CHARS_FILE="${MAX_CHARS_FILE:-200000}"

# Validação crítica da collection
validate_var "QDRANT_COLLECTION" "$QDRANT_COLLECTION" '^[a-zA-Z0-9_-]+$'

# Validação de valores numéricos
if ! [[ "$BATCH" =~ ^[0-9]+$ ]] || [ "$BATCH" -lt 1 ] || [ "$BATCH" -gt 1000 ]; then
    echo "❌ Erro: BATCH deve ser um número entre 1 e 1000"
    exit 1
fi

if ! [[ "$CHUNK_SIZE" =~ ^[0-9]+$ ]] || [ "$CHUNK_SIZE" -lt 100 ] || [ "$CHUNK_SIZE" -gt 5000 ]; then
    echo "❌ Erro: CHUNK_SIZE deve ser um número entre 100 e 5000"
    exit 1
fi

# Validação do diretório raiz
if [ ! -d "$INDEX_ROOT" ]; then
    echo "❌ Erro: Diretório INDEX_ROOT não existe: $INDEX_ROOT"
    exit 1
fi

# Log seguro (sem expor informações sensíveis)
echo "🔍 Iniciando indexação segura..."
echo "📁 Diretório: $INDEX_ROOT"
echo "🔢 Collection: $QDRANT_COLLECTION"
echo "⚙️  Modelo: $EMBED_MODEL"

# Executa o módulo Node.js com timeout e tratamento de erro
if command -v node >/dev/null 2>&1; then
    timeout 300 node scripts/index_simple_fast.mjs "$@" || {
        echo "❌ Erro: Falha na indexação ou timeout excedido"
        exit 1
    }
else
    echo "❌ Erro: Node.js não encontrado"
    exit 1
fi

echo "✅ Indexação concluída com segurança"