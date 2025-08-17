#!/bin/bash

echo "🔧 CORREÇÃO FINAL: Substituindo imports @ por relativos"

git add src/App.tsx
git add src/pages/Certificates.tsx
git add src/hooks/useCertificates.ts
git add src/components/certificates/CertificateCard.tsx

git commit -m "fix: replace @ imports with relative paths to resolve build

- Replace all @ path imports with relative imports in critical files
- Fix import resolution issues causing TypeScript build failures
- Maintain functionality while ensuring GitHub Actions compatibility

Critical fix for deployment pipeline"

git push origin main

echo "✅ CORREÇÃO FINAL APLICADA!"
echo "🔄 Verificando build: https://github.com/flameuss/dev-qa-portfolio/actions"
