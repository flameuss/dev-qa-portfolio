#!/bin/bash

echo "🔍 Verificação Final - Portfolio QA"
echo "=================================="

# Verificar se Motion está instalado
echo "📦 Verificando Motion..."
if npm list motion &>/dev/null; then
    echo "✅ Motion instalado corretamente"
else
    echo "❌ Motion não encontrado - execute: npm install motion"
fi

# Verificar se Framer Motion foi removido
echo "🗑️  Verificando remoção do Framer Motion..."
if npm list framer-motion &>/dev/null; then
    echo "⚠️  Framer Motion ainda está instalado - execute: npm uninstall framer-motion"
else
    echo "✅ Framer Motion removido corretamente"
fi

# Verificar imports nos arquivos
echo "📁 Verificando imports..."
if grep -r "from 'framer-motion'" src/ &>/dev/null; then
    echo "⚠️  Encontrados imports do framer-motion em:"
    grep -r "from 'framer-motion'" src/
else
    echo "✅ Todos os imports atualizados para motion/react"
fi

# Verificar TypeScript
echo "🔧 Verificando TypeScript..."
if npm run type-check &>/dev/null; then
    echo "✅ TypeScript sem erros"
else
    echo "❌ Erros de TypeScript encontrados"
fi

# Verificar build
echo "🏗️  Testando build..."
if npm run build &>/dev/null; then
    echo "✅ Build executado com sucesso"
else
    echo "❌ Erro no build"
fi

echo "=================================="
echo "✅ Verificação concluída!"