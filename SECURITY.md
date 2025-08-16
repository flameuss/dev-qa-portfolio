# 🔒 Configuração de Segurança - Portfolio

## ⚠️ DADOS SENSÍVEIS IDENTIFICADOS

Os seguintes dados NÃO devem ser expostos publicamente:

### 📧 EmailJS (Formulário de Contato):
- `VITE_EMAIL_SERVICE_ID`: ID do serviço EmailJS
- `VITE_EMAIL_TEMPLATE_ID`: ID do template EmailJS  
- `VITE_EMAIL_PUBLIC_KEY`: Chave pública EmailJS

### 📱 Dados Pessoais:
- `VITE_WHATSAPP_NUMBER`: Número pessoal do WhatsApp

## 🛡️ CONFIGURAÇÃO SEGURA

### 1. Arquivo .env.local (Local/Desenvolvimento)
Mantenha seus dados reais apenas no arquivo `.env.local` em sua máquina local.

### 2. Deploy/Produção 
Configure as variáveis de ambiente diretamente no seu provedor:
- **GitHub Pages**: Use GitHub Secrets + GitHub Actions
- **Vercel**: Configure nas Environment Variables
- **Netlify**: Configure nas Site Settings > Environment Variables

### 3. Verificação de Segurança
Antes de commitar, sempre execute:
```bash
git status
```
Confirme que `.env.local` está na lista de arquivos ignorados.

## 📋 Lista de Verificação Antes do Commit:

- [ ] `.env.local` não aparece no `git status`
- [ ] `.gitignore` inclui `*.local`
- [ ] Dados sensíveis removidos do código
- [ ] `.env.example` não contém dados reais

## 🚨 EM CASO DE EXPOSIÇÃO ACIDENTAL:

1. **Revogue imediatamente**:
   - Gere novas chaves no EmailJS
   - Considere trocar o número do WhatsApp se necessário

2. **Remove do histórico do Git**:
   ```bash
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch .env.local' \
   --prune-empty --tag-name-filter cat -- --all
   ```

3. **Force push** (cuidado - reescreve o histórico):
   ```bash
   git push --force --all
   ```
