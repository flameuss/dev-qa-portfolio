@echo off

REM 🔧🔐 Fix Build Errors + Security Fix

echo 🚨 CORREÇÃO URGENTE: Build errors + dados sensíveis expostos

git add src/App.tsx
git add src/components/certificates/CertificateCard.tsx
git add GITHUB_VARIABLES_SETUP.md

echo 📝 Fazendo commit da correção...
git commit -m "fix: resolve build errors + remove exposed sensitive data

🔧 Build Fixes:
- Replace lazy loading with direct imports to fix module resolution
- Remove unused Suspense and PageLoader components  
- Fix import path for StatusBadge and Badge components

🔐 Security Fix:
- Remove exposed API keys and tokens from GITHUB_VARIABLES_SETUP.md
- Replace sensitive data with placeholder templates
- Maintain setup guide without exposing credentials

Critical: Fixes GitHub Actions build failure + security exposure"

echo 🚀 Fazendo push...
git push origin main

echo ✅ CORREÇÃO CRÍTICA COMMITADA!
echo 🔄 Acompanhe em: https://github.com/flameuss/dev-qa-portfolio/actions
echo.
echo ⚠️ IMPORTANTE: Configure as variáveis manualmente no GitHub:
echo Variables: https://github.com/flameuss/dev-qa-portfolio/settings/variables/actions
echo Secrets: https://github.com/flameuss/dev-qa-portfolio/settings/secrets/actions

pause
