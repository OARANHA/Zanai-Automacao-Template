#!/usr/bin/env bash
set -euo pipefail

# =============================================
# Kilo Code - Script de Leitura Segura de Arquivos
# =============================================

# Função de validação segura
validate_var() {
    local var_name="$1"
    local var_value="$2"
    
    if [[ -z "$var_value" ]]; then
        echo "❌ Erro: $var_name não está definida"
        exit 1
    fi
}

# Função para sanitizar caminho de arquivo
sanitize_filepath() {
    local filepath="$1"
    
    # Converte caminhos Windows para Unix (se necessário)
    if command -v cygpath >/dev/null 2>&1; then
        filepath="$(cygpath -u "$filepath")"
    fi
    
    # Remove path traversal e normaliza
    filepath=$(echo "$filepath" | sed -e 's/\.\.\///g' -e 's/^~\///g' -e 's/^\/\+//g')
    
    # Remove barras duplicadas e normaliza
    filepath=$(echo "$filepath" | sed -e 's/\/\+/\//g' -e 's/\/$//')
    
    echo "$filepath"
}

# Função para validar modo de leitura
validate_mode() {
    local mode="$1"
    
    # Modos permitidos
    case "$mode" in
        ALL|all|'*'|HEAD:*|head:*|TAIL:*|tail:*|L:*|l:*|''|*[0-9]*)
            return 0
            ;;
        *)
            echo "❌ Erro: Modo de leitura inválido: $mode"
            exit 1
            ;;
    esac
}

# Função para validar caminho do arquivo
validate_filepath() {
    local filepath="$1"
    
    # Verifica se o caminho está vazio
    if [[ -z "$filepath" ]]; then
        echo "❌ Erro: Caminho do arquivo não fornecido"
        exit 1
    fi
    
    # Verifica se contém caracteres perigosos
    if [[ "$filepath" =~ [;&|<>`$()\\] ]]; then
        echo "❌ Erro: Caminho contém caracteres inválidos"
        exit 1
    fi
    
    # Verifica se tenta acessar arquivos sensíveis
    if [[ "$filepath" =~ ^/etc/|^/proc/|^/sys/|^/dev/|\.env$|\.key$|\.pem$|\.p12$|\.pfx$ ]]; then
        echo "❌ Erro: Acesso a arquivo sensível negado"
        exit 1
    fi
    
    # Verifica se o arquivo existe e é legível
    if [[ ! -f "$filepath" ]]; then
        echo "❌ Erro: Arquivo não encontrado: $filepath"
        exit 1
    fi
    
    if [[ ! -r "$filepath" ]]; then
        echo "❌ Erro: Sem permissão para ler o arquivo: $filepath"
        exit 1
    fi
    
    # Verifica tamanho do arquivo (máximo 10MB)
    local filesize
    filesize=$(stat -c%s "$filepath" 2>/dev/null || echo 0)
    if [[ $filesize -gt 10485760 ]]; then
        echo "❌ Erro: Arquivo muito grande (máximo 10MB): $filepath"
        exit 1
    fi
}

# Função para ler conteúdo de forma segura
read_content() {
    local filepath="$1"
    local mode="$2"
    
    # Sanitiza CRLF
    strip_crlf() { sed $'s/\r$//'; }
    
    # Funções de leitura
    read_all() { 
        sed -n '1,$p' "$filepath" | strip_crlf; 
    }
    
    read_head() { 
        local n="$1"
        sed -n "1,${n}p" "$filepath" | strip_crlf; 
    }
    
    read_tail() { 
        local n="$1"
        tail -n "$n" "$filepath" | strip_crlf; 
    }
    
    read_range() { 
        local a="$1" b="$2"
        sed -n "${a},${b}p" "$filepath" | strip_crlf; 
    }
    
    # Processa o modo
    case "$mode" in
        ALL|all|'*')
            read_all
            ;;
        HEAD:*|head:*)
            local n="${mode#*:}"
            n="${n:-200}"
            if [[ "$n" =~ ^[0-9]+$ ]] && [[ $n -gt 0 ]] && [[ $n -le 1000 ]]; then
                read_head "$n"
            else
                echo "❌ Erro: Número de linhas inválido para HEAD: $n"
                exit 1
            fi
            ;;
        TAIL:*|tail:*)
            local n="${mode#*:}"
            n="${n:-200}"
            if [[ "$n" =~ ^[0-9]+$ ]] && [[ $n -gt 0 ]] && [[ $n -le 1000 ]]; then
                read_tail "$n"
            else
                echo "❌ Erro: Número de linhas inválido para TAIL: $n"
                exit 1
            fi
            ;;
        L:*|l:*)
            local rng="${mode#*:}"
            local a="${rng%-*}" b="${rng#*-}"
            b="${b:-$}"  # se vazio, até o fim
            
            # Valida os números
            if [[ "$a" =~ ^[0-9]+$ ]] && [[ "$b" =~ ^[0-9]+$ ]] && [[ $a -le $b ]]; then
                read_range "$a" "$b"
            else
                echo "❌ Erro: Intervalo inválido: $rng"
                exit 1
            fi
            ;;
        ''|*[!0-9]*)
            # Modo padrão: HEAD:200
            read_head 200
            ;;
        *)
            # Modo compatível: start end (ex.: "1 400")
            local start="$mode"
            local b="${3:-$}"
            b="${b:-$}"  # se não passar 'end', vai até o fim
            
            if [[ "$start" =~ ^[0-9]+$ ]]; then
                read_range "$start" "$b"
            else
                echo "❌ Erro: Modo inválido: $mode"
                exit 1
            fi
            ;;
    esac
}

# Validação dos argumentos
if [[ $# -lt 1 ]]; then
    echo "❌ Erro: Caminho do arquivo não fornecido"
    echo "Uso: $0 <caminho> [modo] [end]"
    echo "Modos:"
    echo "  ALL           - Arquivo inteiro"
    echo "  HEAD:N        - Primeiras N linhas (padrão: 200)"
    echo "  TAIL:N        - Últimas N linhas"
    echo "  L:A-B         - Linhas de A até B"
    echo "  A B           - Linhas de A até B (compatibilidade)"
    exit 1
fi

# Extrai e sanitiza o caminho do arquivo
FILEPATH="$1"
FILEPATH_SANITIZED=$(sanitize_filepath "$FILEPATH")

# Valida o caminho do arquivo
validate_filepath "$FILEPATH_SANITIZED"

# Extrai e valida o modo
MODE="${2:-HEAD:200}"
validate_mode "$MODE"

# Log seguro (sem expor caminhos completos)
echo "📖 Lendo arquivo de forma segura..."
echo "📁 Arquivo: $(basename "$FILEPATH_SANITIZED")"
echo "🔍 Modo: $MODE"

# Lê o conteúdo de forma segura
CONTENT=$(read_content "$FILEPATH_SANITIZED" "$MODE" "${3:-}")

# Limita tamanho da saída (máximo 50KB)
if [[ ${#CONTENT} -gt 51200 ]]; then
    echo "$CONTENT" | head -c 51200
    echo ""
    echo "[... conteúdo truncado para evitar saída muito grande ...]"
else
    echo "$CONTENT"
fi

echo "✅ Leitura concluída com segurança"