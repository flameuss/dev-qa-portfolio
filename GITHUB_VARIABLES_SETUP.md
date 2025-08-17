# 🔐 Configuração de Variáveis do GitHub

## Variáveis que DEVEM ser configuradas no GitHub

Acesse: `Settings > Secrets and variables > Actions > Variables`

### ✅ Variables (Públicas - podem ser visíveis nos logs)

```
VITE_EMAIL_SERVICE_ID=[SEU_EMAIL_SERVICE_ID]
VITE_EMAIL_TEMPLATE_ID=[SEU_EMAIL_TEMPLATE_ID]
VITE_EMAIL_PUBLIC_KEY=[SEU_EMAIL_PUBLIC_KEY]
VITE_WHATSAPP_NUMBER=[SEU_WHATSAPP_NUMBER]
```

### 🔒 Secrets (Privados - não aparecem nos logs)

```
VITE_GOOGLE_DRIVE_API_KEY=[SUA_GOOGLE_DRIVE_API_KEY]
VITE_GOOGLE_DRIVE_FOLDER_ID=[SUA_GOOGLE_DRIVE_FOLDER_ID]
```

## Como configurar:

### 1. Variables (Dados que podem ser públicos)
1. Vá em: `https://github.com/flameuss/dev-qa-portfolio/settings/variables/actions`
2. Clique em "New repository variable"
3. Adicione cada variável uma por uma:

| Nome | Valor |
|------|--------|
| `VITE_EMAIL_SERVICE_ID` | `[SEU_EMAIL_SERVICE_ID]` |
| `VITE_EMAIL_TEMPLATE_ID` | `[SEU_EMAIL_TEMPLATE_ID]` |
| `VITE_EMAIL_PUBLIC_KEY` | `[SEU_EMAIL_PUBLIC_KEY]` |
| `VITE_WHATSAPP_NUMBER` | `[SEU_WHATSAPP_NUMBER]` |

### 2. Secrets (Dados sensíveis)
1. Vá em: `https://github.com/flameuss/dev-qa-portfolio/settings/secrets/actions`
2. Clique em "New repository secret"
3. Adicione cada secret:

| Nome | Valor |
|------|--------|
| `VITE_GOOGLE_DRIVE_API_KEY` | `[SUA_GOOGLE_DRIVE_API_KEY]` |
| `VITE_GOOGLE_DRIVE_FOLDER_ID` | `[SUA_GOOGLE_DRIVE_FOLDER_ID]` |

## ⚠️ IMPORTANTE

- **NÃO** commite o arquivo `.env.local` com esses dados
- Use o `.env.local.safe` para referência
- O workflow já está configurado para usar essas variáveis
- Após configurar no GitHub, delete este arquivo por segurança

## Status das Variáveis

- [ ] VITE_EMAIL_SERVICE_ID (Variable)
- [ ] VITE_EMAIL_TEMPLATE_ID (Variable)  
- [ ] VITE_EMAIL_PUBLIC_KEY (Variable)
- [ ] VITE_WHATSAPP_NUMBER (Variable)
- [ ] VITE_GOOGLE_DRIVE_API_KEY (Secret)
- [ ] VITE_GOOGLE_DRIVE_FOLDER_ID (Secret)

Marque como ✅ quando configurar cada uma.
