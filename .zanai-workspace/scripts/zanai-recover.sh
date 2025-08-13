#!/bin/bash
set -euo pipefail

echo "🔧 Kilo Recovery - Tentando recuperar de falhas..."

# 1. Verifica se o node_modules está corrompido
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.package-lock.json" ]; then
    echo "📦 node_modules corrompido. Reinstalando..."
    rm -rf node_modules package-lock.json
    npm install
fi

# 2. Verifica se o .env está faltando
if [ ! -f ".env" ] && [ -f ".env.example" ]; then
    echo "📝 .env faltando. Criando a partir do exemplo..."
    cp .env.example .env
    echo "⚠️  Por favor, configure as variáveis no .env"
fi

# 3. Verifica se as configurações do Kilo estão OK
if [ ! -d ".killo-workspace" ]; then
    echo "🔧 Configurações Kilo faltando. Reconfigurando..."
    git clone https://github.com/seu-usuario/kilo-template.git .killo-workspace
fi

# 4. Executa health check
echo "🔍 Executando health check final..."
node .killo-workspace/health-check/project-scanner.js

echo "✅ Recuperação concluída!"