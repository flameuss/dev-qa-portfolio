# 🚀 Deploy Guide - Portfolio QA

## 📋 Checklist Pré-Deploy

Antes de fazer o deploy, certifique-se de que:

### ✅ **Configuração Básica**
- [ ] Novo GitHub token configurado no `.env.local`
- [ ] Informações pessoais atualizadas no `.env.local`
- [ ] EmailJS configurado (se usando formulário de contato)
- [ ] Build local funcionando: `npm run build`

### ✅ **Verificações Técnicas**
- [ ] TypeScript sem erros: `npm run type-check`
- [ ] ESLint sem problemas: `npm run lint`
- [ ] Testes passando: `npm test`
- [ ] Motion funcionando (sem framer-motion)

## 🌍 Deploy para GitHub Pages

### Configuração Automática (Recomendado)

O projeto já vem configurado com GitHub Actions para deploy automático:

1. **Push para main branch**:
```bash
git add -A
git commit -m "feat: projeto migrado para Motion"
git push origin main
```

2. **GitHub Actions fará automaticamente**:
   - Build do projeto
   - Deploy para GitHub Pages
   - Disponibilização em: https://flameuss.github.io/dev-qa-portfolio

### Deploy Manual (Se necessário)

```bash
# 1. Build local
npm run build

# 2. Deploy manual
npm run deploy
```

## ⚙️ Configuração GitHub Pages

### 1. Configurar Repository Settings
```
GitHub Repository > Settings > Pages
├── Source: GitHub Actions
├── Custom domain: (opcional)
└── Enforce HTTPS: ✅ Enabled
```

### 2. Configurar GitHub Actions Permissions
```
Repository > Settings > Actions > General
├── Actions permissions: Allow all actions
├── Workflow permissions: Read and write permissions
└── Allow GitHub Actions to create and approve pull requests: ✅
```

### 3. Verificar GitHub Actions
```
Repository > Actions
├── Verificar se workflow "Deploy" existe
├── Status deve ser: ✅ Success
└── URL disponível após deploy bem-sucedido
```

## 🔐 Configuração de Secrets (Opcional)

Para funcionalidades avançadas, configure secrets:

```
Repository > Settings > Secrets and variables > Actions

# Secrets necessários:
VITE_GITHUB_TOKEN=seu_token_pessoal
VITE_EMAIL_SERVICE_ID=seu_emailjs_service
VITE_EMAIL_TEMPLATE_ID=seu_emailjs_template
VITE_EMAIL_PUBLIC_KEY=sua_emailjs_key
```

## 📊 Monitoramento Pós-Deploy

### Verificar Deploy
1. **URL**: https://flameuss.github.io/dev-qa-portfolio
2. **Status**: GitHub Actions > Deploy workflow
3. **Logs**: Verificar logs em caso de erro

### Testes Pós-Deploy
- [ ] Site carregando corretamente
- [ ] Navegação funcionando
- [ ] Animações Motion operacionais
- [ ] Tema claro/escuro funcionando
- [ ] Links sociais redirecionando
- [ ] GitHub API integrando (se token configurado)

## 🐛 Troubleshooting Deploy

### Build Falhando
```bash
# Verificar erros localmente
npm run build

# Limpar e tentar novamente
npm run clean
npm run build
```

### GitHub Pages Não Carregando
1. Verificar se GitHub Pages está habilitado
2. Aguardar alguns minutos (propagação DNS)
3. Limpar cache do browser

### Animações Não Funcionando
1. Verificar se Motion está instalado: `npm list motion`
2. Verificar imports: `grep -r "motion/react" src/`
3. Verificar console do browser por erros JavaScript

### GitHub API Não Funcionando
1. Verificar se token está configurado
2. Verificar permissões do token
3. Verificar rate limiting

## 🔄 Deploy Contínuo

### Automatização Configurada
O projeto está configurado para deploy automático quando:
- Push para branch `main`
- Merge de Pull Request
- Novo release/tag

### Workflow File
Localização: `.github/workflows/deploy.yml`

## 📈 Performance e SEO

### Otimizações Aplicadas
- ✅ **Bundle splitting**: Chunks otimizados
- ✅ **Lazy loading**: Páginas carregadas sob demanda
- ✅ **Tree shaking**: Código não utilizado removido
- ✅ **Compression**: Assets comprimidos

### Meta Tags Configuradas
```html
<meta name="description" content="Portfolio Luis Henrique - Analista QA">
<meta name="keywords" content="qa, teste, automação, cypress">
<meta name="author" content="Luis Henrique da Silva Campos">
```

## 🌐 Custom Domain (Opcional)

### Configurar Domínio Personalizado
1. **Adquirir domínio** (ex: luishenrique.dev)
2. **Configurar DNS**:
```
Type: CNAME
Name: www (ou @)
Value: flameuss.github.io
```
3. **GitHub Pages Settings**:
   - Custom domain: `seudominio.com`
   - Enforce HTTPS: ✅

## 📞 Suporte Deploy

### Problemas Comuns
- **404 Error**: Verificar configuração GitHub Pages
- **Build Error**: Executar `npm run clean && npm run build`
- **Animations Not Working**: Verificar migração Motion

### Contatos
- 🐛 **Issues**: https://github.com/flameuss/dev-qa-portfolio/issues  
- 📧 **Email**: luis.henrique_campos@outlook.com.br

---

## 🎉 Deploy Concluído!

Após seguir este guia, seu portfolio estará:
- 🌍 **Online** em GitHub Pages
- ⚡ **Otimizado** para performance
- 🔒 **Seguro** com HTTPS
- 📱 **Responsivo** em todos dispositivos

**URL Final**: https://flameuss.github.io/dev-qa-portfolio