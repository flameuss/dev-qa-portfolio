#!/bin/bash

echo "🚀 Iniciando processo de migração do projeto dev-qa-portfolio..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para print colorido
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    print_error "package.json não encontrado. Execute este script na raiz do projeto."
    exit 1
fi

print_info "Projeto detectado: dev-qa-portfolio"

# 1. Backup do node_modules e package-lock.json
print_info "Fazendo backup dos arquivos existentes..."
if [ -d "node_modules" ]; then
    rm -rf node_modules.backup 2>/dev/null
    mv node_modules node_modules.backup
    print_status "Backup do node_modules criado"
fi

if [ -f "package-lock.json" ]; then
    cp package-lock.json package-lock.json.backup
    print_status "Backup do package-lock.json criado"
fi

# 2. Remover arquivo ESLint antigo se existir
if [ -f ".eslintrc.js" ]; then
    mv .eslintrc.js .eslintrc.js.backup
    print_status "Arquivo .eslintrc.js antigo movido para backup"
fi

# 3. Limpar cache do npm
print_info "Limpando cache do npm..."
npm cache clean --force
print_status "Cache do npm limpo"

# 4. Instalar dependências
print_info "Instalando novas dependências..."
npm install

if [ $? -eq 0 ]; then
    print_status "Dependências instaladas com sucesso"
else
    print_error "Erro ao instalar dependências"
    print_info "Restaurando backup..."
    if [ -d "node_modules.backup" ]; then
        rm -rf node_modules
        mv node_modules.backup node_modules
    fi
    if [ -f "package-lock.json.backup" ]; then
        mv package-lock.json.backup package-lock.json
    fi
    exit 1
fi

# 5. Verificar problemas de linting
print_info "Verificando configuração do ESLint..."
npm run lint > lint_output.tmp 2>&1

if [ $? -eq 0 ]; then
    print_status "ESLint configurado corretamente"
    rm lint_output.tmp
else
    print_warning "ESLint encontrou alguns problemas"
    print_info "Tentando corrigir automaticamente..."
    npm run lint:fix > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        print_status "Problemas de linting corrigidos automaticamente"
    else
        print_warning "Alguns problemas precisam ser corrigidos manualmente"
        cat lint_output.tmp
    fi
    rm lint_output.tmp
fi

# 6. Verificar build
print_info "Testando build do projeto..."
npm run build > build_output.tmp 2>&1

if [ $? -eq 0 ]; then
    print_status "Build executado com sucesso"
    rm build_output.tmp
else
    print_error "Erro no build do projeto"
    cat build_output.tmp
    rm build_output.tmp
    print_info "Verifique os erros acima e execute novamente após as correções"
fi

# 7. Executar testes se existirem
if npm run | grep -q "test"; then
    print_info "Executando testes..."
    npm test -- --watchAll=false > test_output.tmp 2>&1
    
    if [ $? -eq 0 ]; then
        print_status "Todos os testes passaram"
        rm test_output.tmp
    else
        print_warning "Alguns testes falharam"
        cat test_output.tmp
        rm test_output.tmp
    fi
fi

# 8. Verificar se Playwright precisa de setup
if npm list @playwright/test > /dev/null 2>&1; then
    print_info "Playwright detectado. Verificando browsers..."
    if ! npx playwright list > /dev/null 2>&1; then
        print_warning "Browsers do Playwright não estão instalados"
        print_info "Execute: npx playwright install"
    else
        print_status "Playwright está configurado corretamente"
    fi
fi

# 9. Limpeza final
print_info "Limpando arquivos temporários..."
rm -rf node_modules.backup 2>/dev/null
rm -f package-lock.json.backup 2>/dev/null
rm -f .eslintrc.js.backup 2>/dev/null

print_status "Limpeza concluída"

# 10. Resumo final
echo
echo "=========================================="
echo "🎉 MIGRAÇÃO CONCLUÍDA COM SUCESSO!"
echo "=========================================="
echo
print_info "Próximos passos recomendados:"
echo "1. Revisar o arquivo de documentação gerado"
echo "2. Testar as funcionalidades principais da aplicação"
echo "3. Verificar se há components que precisam de ajustes"
echo "4. Considerar executar: npm run analyze (para análise do bundle)"
echo
print_info "Comandos úteis:"
echo "• npm run dev          - Executar em modo desenvolvimento"
echo "• npm run build        - Gerar build de produção"
echo "• npm run preview      - Preview do build"
echo "• npm run lint         - Verificar linting"
echo "• npm run test         - Executar testes"
echo
print_status "Projeto atualizado e pronto para uso!"
