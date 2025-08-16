# 🔄 Guia de Migração - Framer Motion para Motion

## ⚠️ **IMPORTANTE - Leia antes de começar**

Este projeto foi migrado do **Framer Motion** para **Motion**. Se você está clonando este projeto ou fazendo fork, siga estas instruções.

## 🆕 **Para Novos Clones/Forks**

Se você está clonando este projeto pela primeira vez após a migração:

```bash
# 1. Clone normalmente
git clone https://github.com/flameuss/dev-qa-portfolio.git
cd dev-qa-portfolio

# 2. Instale dependências (Motion já está no package.json)
npm install

# 3. Configure suas variáveis de ambiente
cp .env.example .env.local
```

## 🔄 **Para Projetos Existentes (Migração Manual)**

Se você já tinha este projeto antes da migração e quer atualizar:

### Opção 1: Migração Automática
```bash
# Execute o script de migração
npm run upgrade:motion
```

### Opção 2: Migração Manual
```bash
# 1. Backup primeiro!
git add -A && git commit -m "backup antes migração"

# 2. Remover Framer Motion
npm uninstall framer-motion

# 3. Instalar Motion
npm install motion

# 4. Atualizar imports em TODOS os arquivos:
# ANTES: import { motion } from 'framer-motion'
# DEPOIS: import { motion } from 'motion/react'

# 5. Limpar e testar
rm -rf node_modules dist
npm install
npm run build
```

## 📁 **Arquivos que Precisam de Atualização**

Se você fizer a migração manual, estes arquivos precisam ter os imports atualizados:

```bash
src/App.tsx
src/components/common/ScrollToTop.tsx
src/components/layout/Navbar.tsx
src/pages/Home.tsx
src/pages/About.tsx
src/pages/Projects.tsx
src/pages/Contact.tsx
src/pages/NotFound.tsx
```

**Mudança necessária em cada arquivo:**
```typescript
// ANTES
import { motion, AnimatePresence } from 'framer-motion'

// DEPOIS
import { motion, AnimatePresence } from 'motion/react'
```

## 🔧 **Configuração Vite**

O arquivo `vite.config.ts` também foi atualizado:

```typescript
// ANTES
rollupOptions: {
  output: {
    manualChunks: {
      motion: ['framer-motion'],
    }
  }
}

// DEPOIS  
rollupOptions: {
  output: {
    manualChunks: {
      motion: ['motion'],
    }
  }
}
```

## 🔐 **Importante: Configuração GitHub Token**

⚠️ **ATENÇÃO**: O token GitHub foi removido por questões de segurança!

1. Gere um novo token em: https://github.com/settings/tokens
2. Adicione no seu `.env.local`:
```env
VITE_GITHUB_TOKEN=seu_novo_token_aqui
```

## ✅ **Validação da Migração**

Após migrar, execute:

```bash
# 1. Verificar tipos
npm run type-check

# 2. Verificar lint
npm run lint

# 3. Build de produção
npm run build

# 4. Testar localmente
npm run preview
```

## 🐛 **Problemas Comuns**

### Import Error
```bash
Error: Cannot resolve module 'framer-motion'
```
**Solução**: Você perdeu algum import. Procure por "framer-motion" no projeto:
```bash
grep -r "framer-motion" src/
```

### Build Error
```bash
Error: Build failed
```
**Solução**: 
```bash
rm -rf node_modules dist
npm install
```

## 📚 **Recursos**

- [Motion Documentation](https://motion.dev/docs)
- [Migration Guide](https://motion.dev/docs/react-upgrade-guide)
- [GitHub Issues](https://github.com/flameuss/dev-qa-portfolio/issues)

## 🆘 **Precisa de Ajuda?**

Se encontrar problemas na migração:

1. Verifique o arquivo `TROUBLESHOOTING.md`
2. Consulte as [GitHub Issues](https://github.com/flameuss/dev-qa-portfolio/issues)
3. Entre em contato: luis.henrique_campos@outlook.com.br

---

**✅ Migração concluída com sucesso em Dezembro/2024**