# 🌍 Configuração de Ambiente

## URLs do Projeto

### 🔧 Desenvolvimento
- **URL:** http://localhost:3000/
- **Base Path:** `/` (raiz)
- **Navegação:** URLs diretas (ex: `/contact`)

### 🚀 Produção (GitHub Pages)
- **URL:** https://flameuss.github.io/dev-qa-portfolio/
- **Base Path:** `/dev-qa-portfolio/`
- **Navegação:** URLs com prefixo (ex: `/dev-qa-portfolio/contact`)

## 🔄 Configuração Automática

O projeto agora detecta automaticamente o ambiente:

- **Development:** Base path é `/`
- **Production:** Base path é `/dev-qa-portfolio/`

## 🚀 Comandos

```bash
# Desenvolvimento (localhost:3000)
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

## 🔗 Navegação

### ✅ Correto - Use React Router
```jsx
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()
navigate('/contact')  // ✅ Funciona em dev e prod
```

### ❌ Evite - Links hardcoded
```jsx
window.location.href = '/contact'  // ❌ Não funciona em prod
```

### ✅ Links externos
```jsx
<a href="https://github.com/flameuss" target="_blank">
  GitHub
</a>
```

## 🎯 URLs de Acesso

| Ambiente | Home | About | Projects | Contact |
|----------|------|-------|----------|---------|
| **Dev** | `/` | `/about` | `/projects` | `/contact` |
| **Prod** | `/dev-qa-portfolio/` | `/dev-qa-portfolio/about` | `/dev-qa-portfolio/projects` | `/dev-qa-portfolio/contact` |

## 📝 Notas

- Em desenvolvimento, use `localhost:3000/` (sem prefixo)
- Em produção no GitHub Pages, use `flameuss.github.io/dev-qa-portfolio/`
- A configuração é automática, você não precisa alterar nada manualmente
