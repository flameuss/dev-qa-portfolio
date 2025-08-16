#!/bin/bash

echo "🔧 Testando configuração do projeto..."

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Execute este script na raiz do projeto."
    exit 1
fi

# Verificar se os arquivos críticos existem
echo "📁 Verificando arquivos críticos..."

files=(
    "src/pages/Home.tsx"
    "src/pages/About.tsx"
    "src/pages/Projects.tsx"
    "src/pages/Contact.tsx"
    "src/pages/NotFound.tsx"
    "src/contexts/ThemeContext.tsx"
    "src/contexts/GitHubContext.tsx"
    "src/components/layout/Navbar.tsx"
    "src/components/layout/Footer.tsx"
    "src/components/ui/LoadingSpinner.tsx"
    "src/components/common/ScrollToTop.tsx"
    "src/components/common/ErrorBoundary.tsx"
    "src/vite-env.d.ts"
)

all_exist=true
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - MISSING"
        all_exist=false
    fi
done

if [ "$all_exist" = true ]; then
    echo ""
    echo "✅ Todos os arquivos necessários estão presentes!"
    echo ""
    echo "🚀 Tentando executar o projeto..."
    npm run dev
else
    echo ""
    echo "❌ Alguns arquivos estão faltando. Verifique os arquivos marcados como MISSING."
fi
