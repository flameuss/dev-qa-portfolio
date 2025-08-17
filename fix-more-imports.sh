#!/bin/bash

echo "🔧 CORREÇÃO ADICIONAL: Mais imports @ corrigidos"

git add src/components/certificates/CertificateModal.tsx
git add src/components/certificates/CertificateCard.tsx

git commit -m "fix: correct remaining @ imports in certificate components

- Fix CertificateModal import path
- Fix CertificateCard ui imports with explicit index
- Ensure all critical certificate components use relative paths

Additional import resolution fixes for build pipeline"

git push origin main

echo "✅ CORREÇÃO ADICIONAL APLICADA!"
echo "🔄 Verificando build: https://github.com/flameuss/dev-qa-portfolio/actions"
