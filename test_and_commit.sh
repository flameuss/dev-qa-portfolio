#!/bin/bash

echo "🔧 Testando build após correções..."
echo

echo "📁 Navegando para o diretório do projeto..."
cd "C:/Users/luish/Documents/Development/dev-qa-portfolio"

echo
echo "🔨 Executando build de teste..."
npm run build

if [ $? -eq 0 ]; then
    echo
    echo "✅ Build realizado com sucesso!"
    echo
    echo "📋 Status do git:"
    git status
    echo
    echo "➕ Adicionando arquivos modificados..."
    git add .
    echo
    echo "💾 Fazendo commit..."
    git commit -m "fix: resolve TypeScript build errors

- Fix CertificateImage null/undefined type issues  
- Update Certificate interface status type
- Resolve TS2345 parameter assignment errors
- Resolve TS2322 type compatibility issues
- Ensure all TypeScript errors are fixed for GitHub Pages build"
    
    echo
    echo "🚀 Enviando para o GitHub..."
    git push origin main
    
    echo
    echo "✅ Build e commit realizados com sucesso!"
    echo "🌐 Verificar GitHub Actions em: https://github.com/flameuss/dev-qa-portfolio/actions"
else
    echo
    echo "❌ Build falhou! Verificar erros acima."
    echo "🔍 Executar 'npm run build' para ver detalhes dos erros."
fi

echo
read -p "Pressione Enter para continuar..."
