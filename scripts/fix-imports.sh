#!/bin/bash

echo "🔧 Verificando e corrigindo imports com aliases..."

# Arquivos que podem ter imports com aliases
files_to_check=(
    "src/App.tsx"
    "src/components/layout/Navbar.tsx"
    "src/components/layout/Footer.tsx"
    "src/components/common/ScrollToTop.tsx"
    "src/components/common/ErrorBoundary.tsx"
    "src/components/ui/LoadingSpinner.tsx"
    "src/components/ui/Button.tsx"
    "src/pages/Home.tsx"
    "src/pages/About.tsx"
    "src/pages/Projects.tsx"
    "src/pages/Contact.tsx"
    "src/pages/NotFound.tsx"
)

echo "📁 Verificando arquivos:"
for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
        # Verificar se há imports com @contexts
        if grep -q "@contexts" "$file" 2>/dev/null; then
            echo "   🔍 Encontrado @contexts em $file"
        fi
    else
        echo "❌ $file - MISSING"
    fi
done

echo ""
echo "🚀 Configuração dos aliases atualizada em:"
echo "  - vite.config.ts"
echo "  - tsconfig.json"
echo ""
echo "💡 Para aplicar as mudanças:"
echo "  1. Pare o servidor Vite (Ctrl+C)"
echo "  2. Execute: npm run dev"
echo ""
echo "🔄 Se ainda houver problemas, execute:"
echo "  rm -rf node_modules package-lock.json"
echo "  npm install"
echo "  npm run dev"
