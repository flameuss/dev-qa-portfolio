# 🔧 Troubleshooting - Portfolio QA

## 🚨 Problemas Comuns e Soluções

### 1. **Erro de Importação Motion**
```bash
Error: Cannot resolve module 'motion/react'
```
**Solução:**
```bash
npm uninstall framer-motion
npm install motion
```

### 2. **GitHub Token Inválido**
```bash
Error: Request failed with status code 401
```
**Solução:**
1. Acesse: https://github.com/settings/tokens
2. Gere um novo token com permissões `repo` e `user`
3. Adicione no `.env.local`:
```env
VITE_GITHUB_TOKEN=seu_novo_token_aqui
```

### 3. **Build Falha**
```bash
Error: Build failed due to rollup errors
```
**Solução:**
```bash
rm -rf node_modules dist
npm install
npm run build
```

### 4. **Animações Não Funcionam**
**Verificar:**
- [ ] Imports corretos: `motion/react`
- [ ] Syntax do Motion válida
- [ ] Componentes wrappados corretamente

### 5. **ESLint Errors**
```bash
npm run lint:fix
```

### 6. **TypeScript Errors**
```bash
npm run type-check
```

### 7. **Deploy Issues**
**Verificar:**
- [ ] `VITE_BASE_URL` configurado
- [ ] GitHub Pages settings
- [ ] Actions permissions

## 📊 Health Check Commands

```bash
# Status geral
npm run type-check && npm run lint && npm run build

# Segurança
npm audit

# Performance
npm run analyze

# Clean reset
npm run clean
```

## 📞 Suporte
- **Issues**: https://github.com/flameuss/dev-qa-portfolio/issues
- **Email**: luis.henrique_campos@outlook.com.br