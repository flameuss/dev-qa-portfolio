# 📁 Configuração de Certificados

## 🎯 **Visão Geral**

A página de certificados integra-se com o Google Drive para exibir automaticamente seus certificados e suas informações através de uma planilha de controle.

## 🔧 **Configuração do Google Drive**

### 1️⃣ **Criação da API Key**

1. Acesse o [Google Cloud Console](https://console.developers.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a **Google Drive API**
4. Vá para **Credenciais** → **Criar Credenciais** → **Chave de API**
5. Copie a chave gerada

### 2️⃣ **Configuração da Pasta**

1. Crie uma pasta no Google Drive para os certificados
2. Adicione o arquivo **"Certificados.xlsx"** na pasta
3. Compartilhe a pasta como **"Qualquer pessoa com o link"**
4. Extraia o ID da pasta da URL: `https://drive.google.com/drive/folders/[ID_DA_PASTA]`

### 3️⃣ **Estrutura da Planilha**

O arquivo **"Certificados.xlsx"** deve ter as seguintes colunas:

| Coluna | Descrição | Exemplo |
|--------|-----------|---------|
| `Título do Certificado` | Nome do certificado | "Cypress - Automação de Testes E2E" |
| `Local` | Instituição emissora | "Udemy" |
| `Data de Início` | Data de início (YYYY-MM-DD) | "2023-01-15" |
| `Data de Término` | Data de conclusão (YYYY-MM-DD) | "2023-02-20" |
| `Projeto Referente` | Projeto relacionado | "Automação Web" |
| `Certificado` | Nome do arquivo de imagem | "cypress-automation-certificate" |
| `Link do Projeto` | URL do projeto (opcional) | "https://github.com/user/projeto" |

### 4️⃣ **Adição de Imagens**

1. Adicione as imagens dos certificados na mesma pasta
2. Nomeie os arquivos conforme a coluna **"Certificado"**
3. Formatos suportados: JPG, PNG, GIF, WEBP

## ⚙️ **Configuração das Variáveis**

Adicione ao seu `.env.local`:

```bash
# Google Drive API
VITE_GOOGLE_DRIVE_API_KEY="sua-api-key-aqui"
VITE_GOOGLE_DRIVE_FOLDER_ID="id-da-pasta-aqui"
```

## 🚀 **Funcionalidades**

- ✅ **Visualização em Grid**: Cards responsivos dos certificados
- ✅ **Busca e Filtros**: Por título, local ou projeto
- ✅ **Modal de Detalhes**: Visualização completa com imagem
- ✅ **Estatísticas**: Total, instituições e certificados do ano
- ✅ **Atualização Automática**: Botão para sincronizar com Drive
- ✅ **Botão Link do Projeto**: Acesso direto ao projeto relacionado (quando disponível)
- ✅ **Botão Download**: Download direto do certificado
- ✅ **Modo Escuro**: Compatível com toda a aplicação

## 🔄 **Fluxo de Funcionamento**

1. **Carregamento**: Busca arquivos na pasta do Google Drive
2. **Leitura**: Processa a planilha "Certificados.xlsx"
3. **Matching**: Associa imagens aos certificados pelo nome
4. **Exibição**: Renderiza cards com informações e imagens
5. **Interação**: Modal com detalhes ao clicar nos cards

## 📝 **Exemplo de Dados**

```excel
Título do Certificado | Local | Data de Início | Data de Término | Projeto Referente | Certificado | Link do Projeto
Cypress - Automação E2E | Udemy | 2023-01-15 | 2023-02-20 | Automação Web | cypress-certificate | https://github.com/user/cypress-project
Robot Framework | Alura | 2023-03-10 | 2023-04-15 | Framework Testes | robot-certificate | 
Docker para Devs | Docker | 2023-05-01 | 2023-05-30 | DevOps | docker-certificate | https://github.com/user/docker-examples
```

## 🎨 **Personalização**

### Dados Mock (Desenvolvimento)
Se não configurar o Google Drive, a aplicação usa dados mock para demonstração.

### Estilização
Todos os componentes seguem o design system da aplicação e são responsivos.

## 🔍 **Troubleshooting**

### Certificados não aparecem?
- Verifique se a API key está correta
- Confirme se a pasta está compartilhada publicamente
- Verifique o ID da pasta na URL

### Imagens não carregam?
- Confirme os nomes dos arquivos na planilha
- Verifique se as imagens estão na mesma pasta
- Teste se as imagens são acessíveis publicamente

### Planilha não é lida?
- Confirme se o arquivo se chama exatamente "Certificados.xlsx"
- Verifique se as colunas estão nomeadas corretamente
- Teste se o arquivo está acessível no Drive
