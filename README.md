# 🚀 Luis Henrique - Portfolio QA

[![Deploy Status](https://github.com/flameuss/dev-qa-portfolio/workflows/Deploy/badge.svg)](https://github.com/flameuss/dev-qa-portfolio/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Motion](https://img.shields.io/badge/Motion-FF0084?logo=framer&logoColor=white)](https://motion.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

Portfolio profissional de **Luis Henrique da Silva Campos** - Analista de QA especializado em automação de testes, Cypress, Robot Framework e sistemas geoespaciais. Integração automática com GitHub para showcasing de projetos do INPE e experiência profissional.

> 🆕 **Projeto Atualizado (Dezembro 2024)** - Migrado com sucesso do Framer Motion para Motion, todas as dependências foram atualizadas para as versões mais recentes, incluindo React 18.3+, Vite 5, ESLint 9, e Motion 12.0!

## ✨ Features

### 🔄 **Integração GitHub Automática**
- Sincronização em tempo real com repositórios
- Estatísticas atualizadas automaticamente
- Deploy contínuo com GitHub Actions

### 🎨 **Design Moderno**
- Interface responsiva e acessível
- Tema claro/escuro
- Animações suaves com Motion (ex-Framer Motion)
- Design System consistente

### 🚀 **Performance**
- Code splitting e lazy loading
- Otimizações de bundle
- Service Worker (PWA ready)
- Core Web Vitals otimizados

### 🧪 **Qualidade**
- 100% TypeScript
- Testes unitários e E2E
- ESLint + Prettier
- Clean Architecture

### 🐳 **DevOps**
- Docker multi-stage
- CI/CD automatizado
- Monitoramento integrado
- Deploy em GitHub Pages

## 🛠 Tech Stack

### Frontend
- **React 18.3+** - Biblioteca UI com últimas melhorias
- **TypeScript 5.6+** - Tipagem estática avançada
- **Tailwind CSS 3.4+** - Framework CSS otimizado
- **Motion 12.0+** - Biblioteca de animações de alta performance (sucessora do Framer Motion)
- **React Router DOM 6.26+** - Roteamento
- **React Hook Form 7.53+** - Formulários otimizados

### Build & Tools
- **Vite 5** - Build tool ultrarrápida
- **ESLint 9** - Linting com flat config
- **Prettier 3** - Formatação de código
- **Husky 9** - Git hooks
- **Jest 29** - Testes unitários
- **Playwright** - Testes E2E

### Infrastructure
- **GitHub Pages** - Hosting
- **GitHub Actions** - CI/CD
- **Docker** - Containerização
- **Nginx** - Web server

## 🚀 Quick Start

### Pré-requisitos
```bash
Node.js >= 18.0.0
npm >= 9.0.0
Git
```

### 1. Clone o Repositório
```bash
git clone https://github.com/flameuss/dev-qa-portfolio.git
cd dev-qa-portfolio
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
```bash
cp .env.example .env.local
```

Edite `.env.local`:
```env
VITE_GITHUB_USERNAME=seu-usuario
VITE_GITHUB_TOKEN=seu-novo-token-aqui
VITE_EMAIL_SERVICE_ID=seu-emailjs-service-id
# ... outras configurações
```

### 4. Executar em Desenvolvimento
```bash
npm run dev
```

Acesse: http://localhost:3000

## 📦 Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
```

### Qualidade
```bash
npm run lint         # ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Prettier
npm run type-check   # TypeScript check
```

### Testes
```bash
npm test             # Testes unitários
npm run test:watch   # Testes em modo watch
npm run test:coverage # Coverage report
npm run test:e2e     # Testes E2E
```

### Migração e Manutenção
```bash
npm run upgrade:motion  # Migrar Framer Motion → Motion
npm run security:check  # Verificar vulnerabilidades
npm run clean          # Limpar node_modules e reinstalar
```

### Docker
```bash
npm run docker:dev   # Desenvolvimento
npm run docker:build # Build imagem
```

## 🔄 Migração Framer Motion → Motion

### ⚠️ Importante - Alterações Recentes
Este projeto foi **atualizado** do Framer Motion para Motion. As principais mudanças:

#### ✅ **O que foi atualizado:**
- `framer-motion@11.5.6` → `motion@12.0.0`
- Imports: `"framer-motion"` → `"motion/react"`
- Configuração Vite atualizada
- Bundle chunks otimizados

#### 📋 **Checklist de Migração:**
- [x] Desinstalação do framer-motion
- [x] Instalação do motion
- [x] Atualização de imports
- [x] Atualização do vite.config.ts
- [x] Testes de funcionalidade

### 🔧 Como migrar (se necessário):
```bash
# 1. Remover Framer Motion
npm uninstall framer-motion

# 2. Instalar Motion
npm install motion

# 3. Atualizar imports nos arquivos
# Alterar: import { motion } from 'framer-motion'
# Para:    import { motion } from 'motion/react'
```

## 🐳 Docker Usage

### Desenvolvimento
```bash
docker-compose up -d portfolio-dev
```

### Produção
```bash
docker-compose --profile production up -d
```

## 🔧 Configuração GitHub Pages

### 1. Configurar Repository
```bash
# Settings > Pages > Source: GitHub Actions
# Settings > Actions > General > Workflow permissions: Read and write
```

### 2. Configurar Actions Secrets
```bash
GITHUB_TOKEN        # Token de acesso (automático)
VITE_GITHUB_TOKEN   # Token para rate limit (IMPORTANTE: Gerar novo!)
```

### 3. Deploy Manual
```bash
npm run deploy
```

## 📊 GitHub API

### Rate Limits
- **Sem token**: 60 requests/hora
- **Com token**: 5000 requests/hora

### Endpoints Utilizados
```
GET /users/{username}              # Dados do usuário
GET /users/{username}/repos        # Repositórios
GET /repos/{owner}/{repo}/languages # Linguagens
GET /repos/{owner}/{repo}/commits   # Commits
```

## 🔐 Segurança

### 🚨 **ATENÇÃO - Token GitHub**
- O token GitHub anterior foi **REMOVIDO** por motivos de segurança
- **Gere um novo token** em: https://github.com/settings/tokens
- Adicione o novo token no arquivo `.env.local`

### Configurações de Segurança
```bash
# Verificar vulnerabilidades
npm audit

# Fix automático
npm audit fix

# Scan de segurança
npm run security:check
```

## 🎨 Customização

### Design System
```javascript
// tailwind.config.js
colors: {
  primary: { /* sua paleta */ },
  secondary: { /* sua paleta */ }
}
```

### Dados Pessoais
```typescript
// .env.local
VITE_GITHUB_USERNAME=seu-usuario
VITE_FULL_NAME="Seu Nome"
VITE_LINKEDIN_URL="https://linkedin.com/in/seu-perfil"
```

## 📊 Performance

### Bundle Size
- **Otimizado**: ~150KB gzipped
- **Code Splitting**: Chunks automáticos
- **Tree Shaking**: Imports otimizados

### Core Web Vitals
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

## 🏗 Arquitetura

### Estrutura de Pastas
```
src/
├── components/          # Componentes React
│   ├── common/         # Componentes compartilhados
│   ├── layout/         # Layout components
│   ├── sections/       # Seções da página
│   └── ui/             # Componentes de UI
├── contexts/           # Context providers
├── hooks/              # Custom hooks
├── pages/              # Páginas da aplicação
├── services/           # Serviços e APIs
├── types/              # Definições TypeScript
├── utils/              # Utilitários
└── styles/             # Estilos globais
```

## 🧪 Testes

### Configuração
```javascript
// jest.config.js
testEnvironment: 'jsdom',
setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
```

### Comandos
```bash
npm test                    # Todos os testes
npm run test:watch          # Watch mode
npm run test:coverage       # Com coverage
npm run test:e2e           # End-to-end
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Library
- [Motion](https://motion.dev/) - Animation Library (successor to Framer Motion)
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [GitHub API](https://docs.github.com/en/rest) - Data integration
- [Vite](https://vitejs.dev/) - Build tool

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/flameuss/dev-qa-portfolio/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/flameuss/dev-qa-portfolio/discussions)
- 📧 **Email**: luis.henrique_campos@outlook.com.br

## 🔄 Changelog

### v1.1.0 (Dezembro 2024)
- ✅ Migração completa para Motion 12.0
- 🔒 Remoção de token GitHub exposto
- ⚡ Otimizações de performance
- 🔧 Atualização de dependências

### v1.0.0 (Inicial)
- 🎉 Lançamento inicial
- ⚡ Stack React + TypeScript + Vite
- 🎨 Design system com Tailwind
- 🔄 Integração GitHub API

---

**Made with ❤️ by [flameuss](https://github.com/flameuss)**

**⭐ Star this repo if it helped you!**