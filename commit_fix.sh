#!/bin/bash

echo "🔧 Fazendo commit das correções no GoogleDriveTester..."
echo

echo "📁 Navegando para o diretório do projeto..."
cd "C:/Users/luish/Documents/Development/dev-qa-portfolio"

echo
echo "📋 Verificando status do git..."
git status

echo
echo "➕ Adicionando arquivo corrigido..."
git add src/components/GoogleDriveTester.tsx

echo
echo "💾 Fazendo commit..."
git commit -m "fix: corrige problemas de sintaxe no GoogleDriveTester.tsx

- Remove conteúdo Markdown incorreto do arquivo .tsx
- Adiciona componente React válido com TypeScript
- Resolve erros de build TS1127, TS1005, TS1434
- Prepara para deploy no GitHub Pages"

echo
echo "🚀 Enviando para o GitHub..."
git push origin main

echo
echo "✅ Commit realizado com sucesso!"
echo "🌐 Verificar GitHub Actions em: https://github.com/flameuss/dev-qa-portfolio/actions"
