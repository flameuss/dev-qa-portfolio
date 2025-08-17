#!/bin/bash

echo "🔧 Corrigindo erros TS2345 específicos - string | null para string | undefined"
echo

echo "📁 Navegando para o diretório do projeto..."
cd "C:/Users/luish/Documents/Development/dev-qa-portfolio"

echo
echo "📋 Status do git:"
git status

echo
echo "➕ Adicionando arquivo corrigido..."
git add src/components/certificates/CertificateImage.tsx

echo
echo "💾 Fazendo commit..."
git commit -m "fix: resolve TS2345 type compatibility errors

- Change imageError state from 'string | null' to 'string | undefined'
- Update all setImageError calls to use 'undefined' instead of 'null'
- Fix lines 120, 121, 124, 135 in CertificateImage.tsx
- Resolve 'Argument of type string | null is not assignable to parameter of type string | undefined'"

echo
echo "🚀 Enviando para o GitHub..."
git push origin main

echo
echo "✅ Correções específicas aplicadas com sucesso!"
echo "🌐 Verificar build em: https://github.com/flameuss/dev-qa-portfolio/actions"
