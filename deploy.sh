#!/bin/bash

# Script de deploy para Vercel - drkjavier.dev
# Uso: ./deploy.sh [dev|prod]

set -e

echo "🚀 Iniciando deploy de drkjavier.dev..."

# Verificar que vercel está instalado
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI no está instalado"
    echo "Instalar con: npm install -g vercel"
    exit 1
fi

# Construir el proyecto
echo "📦 Construyendo el proyecto..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error en el build"
    exit 1
fi

echo "✅ Build completado exitosamente"

# Deploy
if [ "$1" = "prod" ]; then
    echo "🌐 Desplegando a PRODUCCIÓN..."
    vercel --prod
else
    echo "🔧 Desplegando a PREVIEW..."
    vercel
fi

echo "✅ Deploy completado!"
echo "📍 Sitio: https://drkjavier.vercel.app"
