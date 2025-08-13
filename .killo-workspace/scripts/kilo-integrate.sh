#!/bin/bash
set -euo pipefail

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔗 Kilo Code - Integração com Projeto Existente${NC}"
echo "================================================="

# Verifica se já existe configuração Kilo
if [ -d ".killo-workspace" ]; then
    echo -e "${YELLOW}⚠️  Configuração Kilo já existe. Verificando...${NC}"
else
    echo -e "${RED}❌ Erro: Este script deve ser executado a partir do diretório raiz do projeto${NC}"
    echo -e "${YELLOW}   Execute: git clone https://github.com/seu-usuario/kilo-template.git .killo-workspace${NC}"
    echo -e "${YELLOW}   Depois execute: ./.killo-workspace/scripts/kilo-init.sh${NC}"
    exit 1
fi

# Verifica se é um projeto válido
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: Não foi encontrado package.json no diretório atual${NC}"
    echo -e "${YELLOW}   Certifique-se de estar no diretório raiz do projeto${NC}"
    exit 1
fi

# Backup do package.json existente
echo -e "${YELLOW}💾 Fazendo backup do package.json existente...${NC}"
cp package.json package.json.backup.$(date +%Y%m%d_%H%M%S)

# Remove package.json do sistema Kilo se existir
if [ -f "package.json" ] && grep -q "kilo-template" package.json; then
    echo -e "${YELLOW}🗑️  Removendo package.json do sistema Kilo para evitar conflitos...${NC}"
    rm package.json
fi

# Analisa o tipo de projeto
echo -e "${BLUE}🔍 Analisando tipo de projeto existente...${NC}"
PROJECT_TYPE="unknown"

if grep -q "next" package.json; then
    PROJECT_TYPE="nextjs"
    echo -e "${GREEN}✅ Projeto Next.js detectado${NC}"
elif grep -q "react" package.json; then
    PROJECT_TYPE="react"
    echo -e "${GREEN}✅ Projeto React detectado${NC}"
elif grep -q "express\|fastify\|hapi" package.json; then
    PROJECT_TYPE="node-api"
    echo -e "${GREEN}✅ Projeto Node.js API detectado${NC}"
elif grep -q "vue" package.json; then
    PROJECT_TYPE="vue"
    echo -e "${GREEN}✅ Projeto Vue.js detectado${NC}"
else
    PROJECT_TYPE="universal"
    echo -e "${YELLOW}⚠️  Tipo de projeto não identificado, usando configuração universal${NC}"
fi

# Integra scripts do Kilo
echo -e "${BLUE}📦 Integrando scripts do Kilo Code...${NC}"

# Cria diretório scripts se não existir
mkdir -p scripts

# Copia os scripts do Kilo
cp scripts/kindex-fast.sh scripts/
cp scripts/ksearch.sh scripts/
cp scripts/kread.sh scripts/
cp scripts/index_simple_fast.mjs scripts/
cp scripts/search_repo.mjs scripts/

# Dá permissão de execução
chmod +x scripts/*.sh

# Atualiza package.json com scripts do Kilo
echo -e "${BLUE}📝 Atualizando package.json com scripts do Kilo...${NC}"

# Verifica se o jq está instalado para manipular JSON
if command -v jq &> /dev/null; then
    # Usa jq para atualizar o package.json de forma segura
    jq '.scripts += {
        "kindex": "bash scripts/kindex-fast.sh",
        "ksearch": "bash scripts/ksearch.sh",
        "kread": "bash scripts/kread.sh",
        "health-check": "node .killo-workspace/health-check/project-scanner.js",
        "recover": "./.killo-workspace/scripts/kilo-recover.sh"
    }' package.json > package.json.tmp && mv package.json.tmp package.json
else
    # Fallback: usa sed para adicionar scripts (menos seguro mas funciona)
    echo -e "${YELLOW}⚠️  jq não encontrado, usando método alternativo...${NC}"
    
    # Adiciona scripts se não existirem
    if ! grep -q '"kindex"' package.json; then
        sed -i '/"scripts": {/a\
    "kindex": "bash scripts/kindex-fast.sh",' package.json
    fi
    
    if ! grep -q '"ksearch"' package.json; then
        sed -i '/"kindex":/a\
    "ksearch": "bash scripts/ksearch.sh",' package.json
    fi
    
    if ! grep -q '"kread"' package.json; then
        sed -i '/"ksearch":/a\
    "kread": "bash scripts/kread.sh",' package.json
    fi
    
    if ! grep -q '"health-check"' package.json; then
        sed -i '/"kread":/a\
    "health-check": "node .killo-workspace/health-check/project-scanner.js",' package.json
    fi
    
    if ! grep -q '"recover"' package.json; then
        sed -i '/"health-check":/a\
    "recover": "./.killo-workspace/scripts/kilo-recover.sh"' package.json
    fi
fi

# Cria ou atualiza .env.example
echo -e "${BLUE}🔧 Configurando variáveis de ambiente...${NC}"

if [ -f ".env.example" ]; then
    echo -e "${YELLOW}📝 .env.example já existe, mesclando configurações...${NC}"
    
    # Adiciona variáveis do Kilo se não existirem
    if ! grep -q "QDRANT_COLLECTION" .env.example; then
        echo "" >> .env.example
        echo "# Kilo Code - Busca Semântica" >> .env.example
        echo "QDRANT_URL=http://localhost:6333" >> .env.example
        echo "OLLAMA_URL=http://localhost:11434" >> .env.example
        echo "EMBED_MODEL=bge-m3" >> .env.example
        echo "QDRANT_COLLECTION=" >> .env.example
        echo "EMBED_PAYLOAD=auto" >> .env.example
        echo "INDEX_ROOT=." >> .env.example
        echo "BATCH=64" >> .env.example
        echo "CHUNK_SIZE=1200" >> .env.example
        echo "CHUNK_OVERLAP=200" >> .env.example
        echo "MAX_FILE_MB=1.5" >> .env.example
        echo "MAX_CHARS_FILE=200000" >> .env.example
        echo "SEARCH_LIMIT=8" >> .env.example
        echo "WITH_SNIPPET=1" >> .env.example
    fi
else
    echo -e "${GREEN}📄 Criando .env.example...${NC}"
    cat > .env.example << EOF
# Variáveis de ambiente do projeto existente
# Adicione suas variáveis específicas aqui

# Kilo Code - Busca Semântica
QDRANT_URL=http://localhost:6333
OLLAMA_URL=http://localhost:11434
EMBED_MODEL=bge-m3
QDRANT_COLLECTION=
EMBED_PAYLOAD=auto
INDEX_ROOT=.
BATCH=64
CHUNK_SIZE=1200
CHUNK_OVERLAP=200
MAX_FILE_MB=1.5
MAX_CHARS_FILE=200000
SEARCH_LIMIT=8
WITH_SNIPPET=1
EOF
fi

# Cria .env se não existir
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}📝 .env não encontrado, criando a partir do exemplo...${NC}"
    cp .env.example .env
    echo -e "${RED}⚠️  Por favor, edite o arquivo .env e configure as variáveis!${NC}"
fi

# Configura VS Code
echo -e "${BLUE}⚙️  Configurando VS Code...${NC}"
if [ -d ".vscode" ]; then
    echo -e "${YELLOW}📁 Diretório .vscode já existe, mantendo configurações existentes...${NC}"
else
    mkdir -p .vscode
fi

# Copia configurações do VS Code sem sobrescrever
if [ ! -f ".vscode/settings.json" ]; then
    cp .killo-workspace/vs-code/settings.json .vscode/
    echo -e "${GREEN}✅ Configurações do VS Code adicionadas${NC}"
fi

if [ ! -f ".vscode/extensions.json" ]; then
    cp .killo-workspace/vs-code/extensions.json .vscode/
    echo -e "${GREEN}✅ Recomendações de extensões adicionadas${NC}"
fi

if [ ! -f ".vscode/tasks.json" ]; then
    cp .killo-workspace/vs-code/tasks.json .vscode/
    echo -e "${GREEN}✅ Tasks do VS Code adicionadas${NC}"
fi

# Adiciona dependências do Kilo se necessário
echo -e "${BLUE}📦 Verificando dependências...${NC}"

if ! grep -q '"kilocode"' package.json; then
    echo -e "${YELLOW}📦 Adicionando Kilo Code como dependência...${NC}"
    
    if command -v jq &> /dev/null; then
        jq '.dependencies.kilocode = "^3.0.0"' package.json > package.json.tmp && mv package.json.tmp package.json
    else
        sed -i '/"dependencies": {/a\    "kilocode": "^3.0.0",' package.json
    fi
    
    echo -e "${YELLOW}⚠️  Execute 'npm install' para instalar as novas dependências${NC}"
fi

# Cria estrutura básica se não existir
echo -e "${BLUE}🏗️  Verificando estrutura do projeto...${NC}"

if [ ! -d "src" ]; then
    echo -e "${YELLOW}📁 Criando diretório src/...${NC}"
    mkdir -p src
fi

if [ ! -d "src/config" ]; then
    echo -e "${YELLOW}📁 Criando diretório src/config/...${NC}"
    mkdir -p src/config
fi

if [ ! -d "src/services" ]; then
    echo -e "${YELLOW}📁 Criando diretório src/services/...${NC}"
    mkdir -p src/services
fi

# Cria kilo.config.js se não existir
if [ ! -f "kilo.config.js" ]; then
    echo -e "${GREEN}📄 Criando kilo.config.js...${NC}"
    cat > kilo.config.js << EOF
require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  resources: {
    maxWorkers: parseInt(process.env.KILO_MAX_WORKERS) || 4,
    memoryLimit: process.env.KILO_MEMORY_LIMIT || '2GB',
    autoScale: process.env.AUTO_SCALE === 'true'
  },
  // Configurações do sistema de busca semântica
  semanticSearch: {
    qdrantUrl: process.env.QDRANT_URL || 'http://localhost:6333',
    ollamaUrl: process.env.OLLAMA_URL || 'http://localhost:11434',
    embedModel: process.env.EMBED_MODEL || 'bge-m3',
    collection: process.env.QDRANT_COLLECTION,
    embedPayload: process.env.EMBED_PAYLOAD || 'auto',
    indexRoot: process.env.INDEX_ROOT || '.',
    batch: parseInt(process.env.BATCH) || 64,
    chunkSize: parseInt(process.env.CHUNK_SIZE) || 1200,
    chunkOverlap: parseInt(process.env.CHUNK_OVERLAP) || 200,
    maxFileMB: parseFloat(process.env.MAX_FILE_MB) || 1.5,
    maxCharsFile: parseInt(process.env.MAX_CHARS_FILE) || 200000,
    searchLimit: parseInt(process.env.SEARCH_LIMIT) || 8,
    withSnippet: process.env.WITH_SNIPPET === '1',
    // Configurações dos scripts
    scripts: {
      kindex: './scripts/kindex-fast.sh',
      ksearch: './scripts/ksearch.sh',
      kread: './scripts/kread.sh',
      indexModule: './scripts/index_simple_fast.mjs',
      searchModule: './scripts/search_repo.mjs'
    }
  }
};
EOF
fi

# Executa health check final
echo -e "${BLUE}🔍 Executando health check final...${NC}"
if command -v node &> /dev/null; then
    node .killo-workspace/health-check/project-scanner.js || true
else
    echo -e "${YELLOW}⚠️  Node.js não encontrado, pulando health check${NC}"
fi

echo ""
echo -e "${GREEN}✅ Integração do Kilo Code concluída!${NC}"
echo ""
echo -e "${BLUE}📋 Próximos passos:${NC}"
echo -e "${YELLOW}   1. Edite o arquivo .env e configure QDRANT_COLLECTION${NC}"
echo -e "${YELLOW}   2. Execute: npm install${NC}"
echo -e "${YELLOW}   3. Execute: npm run health-check${NC}"
echo -e "${YELLOW}   4. Abra o VS Code e use Ctrl+Shift+P > 'Kilo: Bootstrap Project'${NC}"
echo ""
echo -e "${GREEN}🚀 Seu projeto agora está integrado com o Kilo Code!${NC}"