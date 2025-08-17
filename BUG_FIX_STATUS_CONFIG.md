# ✅ ERRO CORRIGIDO - CertificateCard.tsx

## 🐛 Problema Identificado:
- Referência indefinida `statusConfig` na linha que renderiza o badge de status
- Causava erro: `statusConfig is not defined`

## 🔧 Correção Implementada:
- Adicionado `statusConfig` usando `React.useMemo` para configurar cores e labels dos status
- Adicionado `StatusIcon` dinâmico baseado no tipo de status
- Suporte para diferentes status: ativo, em_andamento, expirado, N/A

## 📋 Status Suportados:
- **Ativo/Completo**: Verde (✅)
- **Em Andamento**: Amarelo (⏳)  
- **Expirado/Vencido**: Vermelho (❌)
- **N/A/Padrão**: Cinza (ℹ️)

## 🧪 Teste Necessário:
Agora o erro deve estar resolvido. Teste localmente:
```bash
npm run dev
# Navegar para localhost:3000/certificates
```

## Status: ✅ CORREÇÃO APLICADA
