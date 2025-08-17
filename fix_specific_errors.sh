#!/bin/bash

echo "🔧 Fazendo commit das correções específicas dos erros TypeScript..."
echo

echo "📁 Navegando para o diretório do projeto..."
cd "C:/Users/luish/Documents/Development/dev-qa-portfolio"

echo
echo "📋 Status do git:"
git status

echo
echo "➕ Adicionando arquivos corrigidos..."
git add src/services/drive/googleDriveService.ts
git add src/components/certificates/CertificateImage.tsx

echo
echo "💾 Fazendo commit..."
git commit -m "fix: resolve specific TypeScript build errors

- Add timestamp property to testConfiguration() return type
- Fix CertificateImage prop type issues with optional parameters
- Resolve TS2741: Missing 'timestamp' property
- Resolve TS2345: Type 'string | null' not assignable errors
- Ensure build passes without TypeScript errors"

echo
echo "🚀 Enviando para o GitHub..."
git push origin main

echo
echo "✅ Commit realizado com sucesso!"
echo "🌐 Verificar build em: https://github.com/flameuss/dev-qa-portfolio/actions"
