# 🧪 Teste da Integração Google Drive - Instruções

## 🎯 Objetivo

Verificar a estrutura real da sua planilha no Google Drive e ajustar o sistema de certificados de acordo.

## ⚙️ Configuração Atual

- **API Key**: `AIzaSyA5dmJGZUs3e2RB2YLaI5xiLh7NLwInp9A`
- **Folder ID**: `1ehYbUfiMs8s_7lir8-hZJc7MEfwj-hiV`

## 🚀 Como Testar

### 1. Executar o Projeto
```bash
npm run dev
```

### 2. Acessar a Página de Certificados
Vá para: `http://localhost:5173/certificates`

### 3. Usar o Componente de Teste
- **Localização**: No topo da página (só aparece em desenvolvimento)
- **Nome**: "Google Drive API Tester"
- **Ação**: Clique em "Executar Teste"

### 4. Analisar os Resultados
O teste executará 4 passos:

1. **Validação de Configuração** ✅
   - Verifica se API key e folder ID estão configurados

2. **Acesso à Pasta** 🔍
   - Testa se consegue acessar a pasta do Google Drive

3. **Lista de Arquivos** 📁
   - Mostra todos os arquivos na pasta
   - Identifica planilhas e imagens

4. **Leitura da Planilha** 📊
   - Lê a primeira planilha encontrada
   - **IMPORTANTE**: Mostra as colunas (headers) e dados de exemplo

### 5. Download do Relatório
- Clique em "Download" para salvar os resultados em JSON
- Este arquivo contém toda a estrutura da sua planilha

## 📋 O Que Procurar nos Resultados

### Passo 3 - Lista de Arquivos
- Quantos arquivos existem na pasta?
- Quantas planilhas foram encontradas?
- Quantas imagens foram encontradas?
- Os nomes dos arquivos estão listados?

### Passo 4 - Leitura da Planilha
**MAIS IMPORTANTE**: 
- **Headers (Colunas)**: Quais são os nomes das colunas da sua planilha?
- **Dados de Exemplo**: Como estão organizados os dados?

Exemplo do que esperamos ver:
```
Colunas: ["Título do Certificado", "Local", "Data Início", "Data Término", ...]
Dados: [["Cypress Automation", "Udemy", "15/01/2023", "20/02/2023", ...]]
```

## 🛠️ Possíveis Problemas e Soluções

### ❌ Erro 403 - Forbidden
**Causa**: Pasta não está pública
**Solução**: 
1. Abra a pasta no Google Drive
2. Clique em "Compartilhar"
3. Configure como "Qualquer pessoa com o link pode visualizar"

### ❌ Nenhuma planilha encontrada
**Causa**: Arquivo não está no formato correto
**Solução**:
- Use Google Sheets (recomendado)
- Ou arquivo .xlsx
- Nome deve conter "certificado" ou similar

### ❌ Erro de CORS/Network
**Causa**: Restrições do navegador
**Solução**: 
- O erro é normal no ambiente de desenvolvimento
- O sistema real funcionará em produção

## 📊 Após o Teste

### Informações Necessárias
Por favor, compartilhe:

1. **Estrutura da Planilha**:
   - Quais são as colunas (headers)?
   - Como estão nomeadas?
   - Exemplo de 1-2 linhas de dados

2. **Arquivos de Imagem**:
   - Quantos arquivos de imagem tem?
   - Como estão nomeados?
   - Exemplo: "cypress-certificate.jpg", "docker-cert.png"

### Ajustes que Faremos
Com base nos resultados:

1. **Mapeamento de Colunas**: Ajustar o sistema para reconhecer suas colunas
2. **Matching de Imagens**: Otimizar para seus nomes de arquivos
3. **Campos Personalizados**: Adicionar campos específicos da sua planilha
4. **Validações**: Ajustar para seu formato de dados

## 🔄 Próximos Passos

1. **Execute o teste** conforme instruções acima
2. **Compartilhe os resultados** (principalmente a estrutura da planilha)
3. **Aguarde os ajustes** personalizados para seus dados
4. **Teste novamente** após os ajustes
5. **Remoção do componente de teste** quando tudo estiver funcionando

## 📞 Suporte

Se encontrar problemas:
1. Verifique o console do navegador (F12) para erros
2. Use o botão "Download" para salvar o relatório completo
3. Compartilhe os resultados para análise

---

**Lembre-se**: O componente de teste é temporário e só aparece em desenvolvimento. Após identificarmos a estrutura da sua planilha, faremos os ajustes necessários e removeremos este componente.