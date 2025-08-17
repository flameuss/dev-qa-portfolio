# 🔐 Configuração de Variáveis do GitHub

## Variáveis que DEVEM ser configuradas no GitHub

Acesse: `Settings > Secrets and variables > Actions > Variables`

### ✅ Variables (Públicas - podem ser visíveis nos logs)

```
VITE_EMAIL_SERVICE_ID=service_s5hanw1
VITE_EMAIL_TEMPLATE_ID=template_ma8yp39
VITE_EMAIL_PUBLIC_KEY=wZ0FhnM5TEWfZqXKJ
VITE_WHATSAPP_NUMBER=12991848281
```

### 🔒 Secrets (Privados - não aparecem nos logs)

```
VITE_GOOGLE_DRIVE_API_KEY=AIzaSyA5dmJGZUs3e2RB2YLaI5xiLh7NLwInp9A
VITE_GOOGLE_DRIVE_FOLDER_ID=1ehYbUfiMs8s_7lir8-hZJc7MEfwj-hiV
```

## Como configurar:

### 1. Variables (Dados que podem ser públicos)
1. Vá em: `https://github.com/flameuss/dev-qa-portfolio/settings/variables/actions`
2. Clique em "New repository variable"
3. Adicione cada variável uma por uma:

| Nome | Valor |
|------|--------|
| `VITE_EMAIL_SERVICE_ID` | `service_s5hanw1` |
| `VITE_EMAIL_TEMPLATE_ID` | `template_ma8yp39` |
| `VITE_EMAIL_PUBLIC_KEY` | `wZ0FhnM5TEWfZqXKJ` |
| `VITE_WHATSAPP_NUMBER` | `12991848281` |

### 2. Secrets (Dados sensíveis)
1. Vá em: `https://github.com/flameuss/dev-qa-portfolio/settings/secrets/actions`
2. Clique em "New repository secret"
3. Adicione cada secret:

| Nome | Valor |
|------|--------|
| `VITE_GOOGLE_DRIVE_API_KEY` | `AIzaSyA5dmJGZUs3e2RB2YLaI5xiLh7NLwInp9A` |
| `VITE_GOOGLE_DRIVE_FOLDER_ID` | `1ehYbUfiMs8s_7lir8-hZJc7MEfwj-hiV` |

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
