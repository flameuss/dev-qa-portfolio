# 🔍 Debug Rápido - Verificar Dados dos Certificados

## Como verificar os dados no navegador:

1. **Abra o navegador** em `http://localhost:3000/certificates`

2. **Abra o Console** (F12 → Console)

3. **Procure pelos logs** que mostram:

### 📋 Dados da Planilha:
```
📋 Headers encontrados: [...]
📊 Total de linhas de dados: ...
🔍 Processando linha 1: [...]
✅ Certificado 1 criado: {...}
```

### 📜 Dados dos Cards:
```
📜 Card 1 - Dados do certificado: {
  titulo: "...",
  local: "...",
  dataInicio: "...",
  dataTermino: "...",
  cargaHoraria: "...",
  status: "...",
  imageUrl: "...",
  fileName: "..."
}
```

### 🗺 Formatação de Datas:
```
🗺 Formatando data: "..."
  ✅ Formatado (ISO): "..."
```

### 🖼️ Imagens:
```
✅ Imagem carregada com sucesso: {...}
❌ Erro ao carregar imagem: {...}
```

## 🎯 O que verificar:

1. **Headers da planilha** estão corretos?
2. **Dados dos certificados** têm todos os campos?
3. **URLs das imagens** estão sendo geradas?
4. **Datas** estão sendo formatadas corretamente?
5. **Carga horária e status** aparecem nos dados?

## 🚨 Se ainda houver problemas:

Execute no console do navegador:
```javascript
// Ver dados dos certificados carregados
window.certificatesDebug = true;

// Ver URLs das imagens
document.querySelectorAll('img').forEach(img => 
  console.log('Imagem:', img.src, img.alt)
);
```

---
**Depois de verificar os logs, me conte quais dados estão aparecendo corretamente e quais ainda têm problemas!**