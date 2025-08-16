# 🚀 Getting Started - Portfolio QA

Bem-vindo ao projeto Portfolio QA! Este guia irá ajudá-lo a configurar e executar o projeto localmente.

## 📋 Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 (geralmente vem com Node.js)
- **Git** ([Download](https://git-scm.com/))

## 🔧 Configuração Inicial

### 1. Clone o Repositório
```bash
git clone https://github.com/flameuss/dev-qa-portfolio.git
cd dev-qa-portfolio
```

### 2. Instale as Dependências
```bash
npm install
```

### 3. Configure as Variáveis de Ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite o arquivo .env.local com suas informações
```

### 4. Configure o GitHub Token (Opcional mas Recomendado)
1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token (classic)"
3. Selecione os escopos: `public_repo`, `user:read`
4. Copie o token gerado
5. Adicione no `.env.local`:
```env
VITE_GITHUB_TOKEN=seu_token_aqui
```

## 🚀 Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```
Acesse: http://localhost:3000

### Build de Produção
```bash
npm run build
```

### Preview do Build
```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── common/         # Componentes reutilizáveis
│   ├── layout/         # Componentes de layout
│   ├── sections/       # Seções específicas
│   └── ui/             # Componentes de interface
├── contexts/           # Context API do React
├── hooks/              # Custom React Hooks
├── pages/              # Páginas da aplicação
├── services/           # Serviços e APIs
├── types/              # Definições TypeScript
├── utils/              # Funções utilitárias
└── styles/             # Estilos globais
```

## 🎨 Tecnologias Utilizadas

### Core
- **React 18.3+** - Biblioteca UI
- **TypeScript 5.6+** - Linguagem principal
- **Vite 5** - Build tool e dev server

### Styling & Animation
- **Tailwind CSS 3.4+** - Framework CSS
- **Motion 12.0+** - Biblioteca de animações (sucessora do Framer Motion)

### Routing & Forms
- **React Router DOM 6.26+** - Roteamento
- **React Hook Form 7.53+** - Gerenciamento de formulários

### Development
- **ESLint 9** - Linting
- **Prettier 3** - Formatação de código
- **Jest 29** - Testes unitários
- **Playwright** - Testes E2E

## 🧪 Executando Testes

### Testes Unitários
```bash
npm test                    # Executa todos os testes
npm run test:watch          # Modo watch
npm run test:coverage       # Com relatório de cobertura
```

### Testes E2E
```bash
npm run test:e2e           # Testes end-to-end
```

## 📝 Scripts Disponíveis

### Desenvolvimento
- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview do build

### Qualidade de Código
- `npm run lint` - Executa ESLint
- `npm run lint:fix` - Corrige problemas automaticamente
- `npm run format` - Formata código com Prettier
- `npm run type-check` - Verifica tipos TypeScript

### Manutenção
- `npm run clean` - Limpa node_modules e reinstala
- `npm run security:check` - Verifica vulnerabilidades
- `npm run analyze` - Analisa o bundle

### Deploy
- `npm run deploy` - Deploy para GitHub Pages

## 🔧 Personalização

### 1. Informações Pessoais
Edite o arquivo `.env.local`:
```env
VITE_FULL_NAME="Seu Nome"
VITE_EMAIL="seu.email@exemplo.com"
VITE_LINKEDIN_URL="https://linkedin.com/in/seu-perfil"
VITE_GITHUB_USERNAME="seu-usuario"
```

### 2. Configuração do EmailJS (Para formulário de contato)
```env
VITE_EMAIL_SERVICE_ID="seu_service_id"
VITE_EMAIL_TEMPLATE_ID="seu_template_id"
VITE_EMAIL_PUBLIC_KEY="sua_public_key"
```

### 3. Cores e Tema
Edite `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Sua paleta de cores primária
      }
    }
  }
}
```

## 🐳 Docker (Opcional)

### Desenvolvimento
```bash
npm run docker:dev
```

### Produção
```bash
npm run docker:build
```

## 📊 GitHub Pages Deploy

### Configuração Automática
O projeto já está configurado com GitHub Actions para deploy automático.

### Deploy Manual
```bash
npm run deploy
```

## ⚠️ Notas Importantes

### Migração Motion
Este projeto foi migrado do Framer Motion para Motion. Se você vê referências ao Framer Motion em tutoriais antigos, use Motion no lugar:

```typescript
// ✅ Correto (Motion)
import { motion } from 'motion/react'

// ❌ Antigo (Framer Motion) 
import { motion } from 'framer-motion'
```

### Segurança
- Nunca commite tokens de API no código
- Use apenas variáveis de ambiente para informações sensíveis
- Gere seus próprios tokens do GitHub

## 🆘 Resolução de Problemas

### Erro de Instalação
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro de Build
```bash
npm run clean
npm run type-check
npm run build
```

### Problemas com Motion
Consulte o arquivo `MIGRATION_SUMMARY.md` para detalhes da migração.

## 📚 Recursos Adicionais

- [Documentação do React](https://react.dev/)
- [Documentação do Motion](https://motion.dev/)
- [Documentação do Tailwind CSS](https://tailwindcss.com/)
- [Documentação do TypeScript](https://www.typescriptlang.org/)

## 📞 Suporte

- **Issues**: https://github.com/flameuss/dev-qa-portfolio/issues
- **Discussions**: https://github.com/flameuss/dev-qa-portfolio/discussions
- **Email**: luis.henrique_campos@outlook.com.br

---

**🎉 Agora você está pronto para desenvolver!**

Execute `npm run dev` e comece a customizar seu portfolio.