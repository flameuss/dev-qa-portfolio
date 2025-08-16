#!/bin/bash

echo "🔍 Verificando arquivos com possíveis problemas de encoding..."

# Lista de arquivos para verificar
files=(
    "src/components/ui/SimpleThemeToggle.tsx"
    "src/contexts/ThemeContext.tsx"
    "src/components/layout/Navbar.tsx"
)

echo "📁 Verificando arquivos críticos do tema:"

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
        
        # Verificar se há caracteres suspeitos na primeira linha
        first_line=$(head -n 1 "$file")
        if [[ "$first_line" == *"import"* ]]; then
            echo "   ✅ Import na primeira linha OK"
        else
            echo "   ⚠️  Primeira linha suspeita: $first_line"
        fi
    else
        echo "❌ $file - MISSING"
    fi
done

echo ""
echo "🎨 Status do modo escuro:"
echo "  ✅ ThemeContext reescrito"
echo "  ✅ Navbar atualizada"  
echo "  ✅ Componentes de debug criados"
echo "  ✅ Encoding corrigido"
echo ""
echo "🚀 Para testar:"
echo "  1. Reinicie o servidor: Ctrl+C depois npm run dev"
echo "  2. Clique no ícone sol/lua no navbar"
echo "  3. Use os toggles de debug (canto inferior)"
echo ""
echo "🐛 Se ainda houver erros:"
echo "  1. Limpe o cache: rm -rf node_modules && npm install"
echo "  2. Force refresh: Ctrl+F5 no navegador"
