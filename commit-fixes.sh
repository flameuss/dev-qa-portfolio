#!/bin/bash

# 🚀 Script de Commit - Correções de Roteamento, Segurança e Bug Fix

echo "🔍 Verificando status do git..."
git status --porcelain

echo ""
echo "📦 Adicionando arquivos modificados..."

# Adicionar correções de roteamento e segurança
git add public/404.html
git add index.html
git add src/App.tsx
git add src/components/router/AppRouter.tsx
git add .github/workflows/deploy.yml
git add .env.local.safe
git add ROUTING_FIX.md
git add GITHUB_VARIABLES_SETUP.md
git add SECURITY_CHECK.md

# Adicionar correção do bug statusConfig
git add src/components/certificates/CertificateCard.tsx
git add BUG_FIX_STATUS_CONFIG.md

echo ""
echo "✅ Arquivos adicionados! Verificando o que será commitado..."
git status --cached

echo ""
echo "📝 Fazendo commit..."
git commit -m "fix: resolve GitHub Pages routing + security + statusConfig bug

🔧 GitHub Pages Routing:
- Improve 404.html redirect script for GitHub Pages
- Optimize index.html SPA routing handling  
- Add AppRouter component for environment detection

🔐 Security Improvements:
- Move sensitive data to GitHub Variables/Secrets
- Add security documentation and setup guides
- Create .env.local.safe template

🐛 Bug Fixes:
- Fix statusConfig undefined error in CertificateCard
- Add proper status badge configuration with colors
- Add dynamic StatusIcon component

Fixes direct route access issues on GitHub Pages
Closes certificate page crash on load"

echo ""
echo "🚀 Fazendo push para o repositório..."
git push origin main

echo ""
echo "✅ COMMIT CONCLUÍDO!"
echo ""
echo "📋 PRÓXIMOS PASSOS:"
echo "1. Configure as variáveis no GitHub seguindo GITHUB_VARIABLES_SETUP.md"
echo "2. Aguarde o deploy automático (~2-3 minutos)"
echo "3. Teste as rotas diretas:"
echo "   - https://flameuss.github.io/dev-qa-portfolio/contact"
echo "   - https://flameuss.github.io/dev-qa-portfolio/about"
echo "   - https://flameuss.github.io/dev-qa-portfolio/certificates"
echo "4. Teste a página de certificados (bug corrigido)"
echo "5. Delete os arquivos de setup após configurar"
