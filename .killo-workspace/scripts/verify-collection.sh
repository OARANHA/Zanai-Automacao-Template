#!/bin/bash
set -euo pipefail

# Verifica se a collection foi definida corretamente
if [ ! -f ".env" ]; then
    echo "❌ Arquivo .env não encontrado"
    exit 1
fi

source .env

if [ -z "$QDRANT_COLLECTION" ]; then
    echo "❌ QDRANT_COLLECTION não está definida no .env"
    exit 1
fi

if [ "$QDRANT_COLLECTION" = "flowise_all" ] || [ "$QDRANT_COLLECTION" = "default" ]; then
    echo "❌ QDRANT_COLLECTION está com valor padrão ($QDRANT_COLLECTION)"
    echo "Por favor, defina um nome específico para seu projeto"
    exit 1
fi

echo "✅ Collection configurada: $QDRANT_COLLECTION"