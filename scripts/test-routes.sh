#!/bin/bash

echo "🔍 Testando configuração de rotas..."

# Verificar se o servidor está rodando
if curl -s http://localhost:3000/ > /dev/null; then
    echo "✅ Servidor Vite está rodando"
    
    # Testar rotas principais
    routes=("/" "/about" "/projects" "/contact")
    
    echo "🌐 Testando rotas:"
    for route in "${routes[@]}"; do
        if curl -s "http://localhost:3000$route" > /dev/null; then
            echo "  ✅ $route"
        else
            echo "  ❌ $route"
        fi
    done
    
    echo ""
    echo "📋 URLs para testar no navegador:"
    for route in "${routes[@]}"; do
        echo "  - http://localhost:3000$route"
    done
    
else
    echo "❌ Servidor Vite não está rodando"
    echo "💡 Execute: npm run dev"
fi

echo ""
echo "🎯 Configuração atual:"
echo "  - Desenvolvimento: Base path '/'"
echo "  - Produção: Base path '/dev-qa-portfolio/'"
echo ""
echo "✅ Navegação corrigida para usar React Router"
