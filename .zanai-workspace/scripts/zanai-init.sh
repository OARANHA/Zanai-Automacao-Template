#!/bin/bash
set -euo pipefail

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Kilo Code Workspace Inicializador${NC}"
echo "=================================="

# Detecta se é um projeto novo ou existente
if [ ! -f "package.json" ]; then
    echo -e "${YELLOW}📦 Projeto não detectado. Iniciando modo novo projeto...${NC}"
    ./.killo-workspace/scripts/kilo-bootstrap.sh
else
    echo -e "${YELLOW}🔍 Projeto existente detectado. Modo de integração...${NC}"
    ./.killo-workspace/scripts/kilo-integrate.sh
fi

# Configura VS Code
echo -e "${GREEN}⚙️  Configurando VS Code...${NC}"
cp -r .killo-workspace/vs-code/.vs-code .vs-code

# Instala extensões obrigatórias
echo -e "${GREEN}📦 Instalando extensões VS Code...${NC}"
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-json
code --install-extension ms-python.python
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.docker

# Health check final
echo -e "${GREEN}🔍 Executando health check...${NC}"
node .killo-workspace/health-check/project-scanner.js

echo -e "${GREEN}✅ Kilo Code Workspace pronto!${NC}"
echo -e "${YELLOW}💡 Dica: Abra o VS Code e use Ctrl+Shift+P > 'Kilo: Bootstrap Project'${NC}"