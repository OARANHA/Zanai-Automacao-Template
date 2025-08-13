#!/usr/bin/env bash
set -euo pipefail

# =============================================
# Kilo Code - Script de Busca Seguro
# =============================================

# Função de validação segura
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
sanitize_input() {
    local input="$1"
    # Remove caracteres perigosos e limita tamanho
    echo "$input" | sed -e 's/[;&|<>`$()]//g' -e 's/\.\.\///g' | head -c 1000
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
            QDRANT_URL|OLLAMA_URL|EMBED_MODEL|QDRANT_COLLECTION|SEARCH_LIMIT|WITH_SNIPPET)
                validate_var "$key" "$value"
                export "$key=$value"
                ;;
        esac
    done < .env
fi

# Configurações com validação
export EMBED_MODEL="${EMBED_MODEL:-all-minilm}"
export SEARCH_LIMIT="${SEARCH_LIMIT:-8}"
export WITH_SNIPPET="${WITH_SNIPPET:-1}"

# Validação crítica da collection
validate_var "QDRANT_COLLECTION" "$QDRANT_COLLECTION" '^[a-zA-Z0-9_-]+$'

# Validação do limite de busca
if ! [[ "$SEARCH_LIMIT" =~ ^[0-9]+$ ]] || [ "$SEARCH_LIMIT" -lt 1 ] || [ "$SEARCH_LIMIT" -gt 50 ]; then
    echo "❌ Erro: SEARCH_LIMIT deve ser um número entre 1 e 50"
    exit 1
fi

# Validação dos argumentos
if [ $# -eq 0 ]; then
    echo "❌ Erro: Query de busca não fornecida"
    echo "Uso: $0 \"sua query\" [--limit N] [--file filtro] [--json] [--no-snippet]"
    exit 1
fi

# Extrai e sanitiza a query
QUERY="$1"
QUERY_SANITIZED=$(sanitize_input "$QUERY")

if [ -z "$QUERY_SANITIZED" ]; then
    echo "❌ Erro: Query inválida após sanitização"
    exit 1
fi

# Processa argumentos adicionais de forma segura
shift
LIMIT="$SEARCH_LIMIT"
FILE_FILTER=""
JSON_OUTPUT=false
WITH_SNIPPET_FLAG="$WITH_SNIPPET"

while [[ $# -gt 0 ]]; do
    case $1 in
        --limit)
            if [[ -n "${2:-}" ]] && [[ "$2" =~ ^[0-9]+$ ]]; then
                LIMIT="$2"
                shift
            else
                echo "❌ Erro: --limit requer um número válido"
                exit 1
            fi
            ;;
        --file)
            if [[ -n "${2:-}" ]]; then
                FILE_FILTER=$(sanitize_input "$2")
                shift
            else
                echo "❌ Erro: --file requer um valor"
                exit 1
            fi
            ;;
        --json)
            JSON_OUTPUT=true
            ;;
        --no-snippet)
            WITH_SNIPPET_FLAG="0"
            ;;
        *)
            echo "❌ Erro: Argumento desconhecido: $1"
            exit 1
            ;;
    esac
    shift
done

# Validação final do limite
if ! [[ "$LIMIT" =~ ^[0-9]+$ ]] || [ "$LIMIT" -lt 1 ] || [ "$LIMIT" -gt 50 ]; then
    echo "❌ Erro: Limite inválido: $LIMIT"
    exit 1
fi

# Log seguro (sem expor a query completa)
echo "🔎 Iniciando busca segura..."
echo "🔢 Collection: $QDRANT_COLLECTION"
echo "⚙️  Modelo: $EMBED_MODEL"
echo "📊 Limite: $LIMIT"

# Constrói comando de forma segura
CMD_ARGS=("$QUERY_SANITIZED" "--limit" "$LIMIT")

if [[ -n "$FILE_FILTER" ]]; then
    CMD_ARGS+=("--file" "$FILE_FILTER")
fi

if [[ "$JSON_OUTPUT" == true ]]; then
    CMD_ARGS+=("--json")
fi

if [[ "$WITH_SNIPPET_FLAG" == "0" ]]; then
    CMD_ARGS+=("--no-snippet")
fi

# Executa o módulo Node.js com timeout e tratamento de erro
if command -v node >/dev/null 2>&1; then
    timeout 60 node scripts/search_repo.mjs "${CMD_ARGS[@]}" || {
        echo "❌ Erro: Falha na busca ou timeout excedido"
        exit 1
    }
else
    echo "❌ Erro: Node.js não encontrado"
    exit 1
fi

echo "✅ Busca concluída com segurança"