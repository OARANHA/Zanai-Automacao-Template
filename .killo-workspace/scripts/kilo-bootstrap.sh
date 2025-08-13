#!/bin/bash
set -euo pipefail

echo "🚀 Kilo Bootstrap - Qual tipo de projeto?"
echo "1) Next.js Dashboard"
echo "2) Node.js API"
echo "3) React Admin"
echo "4) Universal Starter"
echo "5) Projeto Existente"

read -p "Escolha (1-5): " choice

case $choice in
  1)
    echo "📦 Criando Next.js Dashboard..."
    cp -r .killo-workspace/templates/nextjs-dashboard/* .
    # Remove package.json do sistema Kilo se existir
    if [ -f "package.json" ] && grep -q "kilo-template" package.json; then
      rm package.json
      echo "🗑️  Removendo package.json do sistema Kilo para evitar conflitos"
    fi
    npm install
    ;;
  2)
    echo "📦 Criando Node.js API..."
    cp -r .killo-workspace/templates/node-api/* .
    # Remove package.json do sistema Kilo se existir
    if [ -f "package.json" ] && grep -q "kilo-template" package.json; then
      rm package.json
      echo "🗑️  Removendo package.json do sistema Kilo para evitar conflitos"
    fi
    npm install
    ;;
  3)
    echo "📦 Criando React Admin..."
    cp -r .killo-workspace/templates/react-admin/* .
    # Remove package.json do sistema Kilo se existir
    if [ -f "package.json" ] && grep -q "kilo-template" package.json; then
      rm package.json
      echo "🗑️  Removendo package.json do sistema Kilo para evitar conflitos"
    fi
    npm install
    ;;
  4)
    echo "📦 Criando Universal Starter..."
    cp -r .killo-workspace/templates/universal-starter/* .
    # Remove package.json do sistema Kilo se existir
    if [ -f "package.json" ] && grep -q "kilo-template" package.json; then
      rm package.json
      echo "🗑️  Removendo package.json do sistema Kilo para evitar conflitos"
    fi
    npm install
    ;;
  5)
    echo "🔍 Modo projeto existente..."
    echo "Por favor, execute o Kilo Agent para análise do projeto"
    ;;
  *)
    echo "❌ Opção inválida"
    exit 1
    ;;
esac

echo "✅ Bootstrap concluído!"