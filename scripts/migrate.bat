@echo off
setlocal enabledelayedexpansion

echo 🚀 Iniciando processo de migração do projeto dev-qa-portfolio...

REM Verificar se estamos no diretório correto
if not exist "package.json" (
    echo ❌ package.json não encontrado. Execute este script na raiz do projeto.
    pause
    exit /b 1
)

echo ℹ️  Projeto detectado: dev-qa-portfolio

REM 1. Backup do node_modules e package-lock.json
echo ℹ️  Fazendo backup dos arquivos existentes...
if exist "node_modules" (
    if exist "node_modules.backup" rmdir /s /q "node_modules.backup" >nul 2>&1
    ren "node_modules" "node_modules.backup" >nul 2>&1
    echo ✅ Backup do node_modules criado
)

if exist "package-lock.json" (
    copy "package-lock.json" "package-lock.json.backup" >nul 2>&1
    echo ✅ Backup do package-lock.json criado
)

REM 2. Remover arquivo ESLint antigo se existir
if exist ".eslintrc.js" (
    ren ".eslintrc.js" ".eslintrc.js.backup" >nul 2>&1
    echo ✅ Arquivo .eslintrc.js antigo movido para backup
)

REM 3. Limpar cache do npm
echo ℹ️  Limpando cache do npm...
call npm cache clean --force >nul 2>&1
echo ✅ Cache do npm limpo

REM 4. Instalar dependências
echo ℹ️  Instalando novas dependências...
call npm install

if !errorlevel! equ 0 (
    echo ✅ Dependências instaladas com sucesso
) else (
    echo ❌ Erro ao instalar dependências
    echo ℹ️  Restaurando backup...
    if exist "node_modules.backup" (
        if exist "node_modules" rmdir /s /q "node_modules"
        ren "node_modules.backup" "node_modules"
    )
    if exist "package-lock.json.backup" (
        ren "package-lock.json.backup" "package-lock.json"
    )
    pause
    exit /b 1
)

REM 5. Verificar problemas de linting
echo ℹ️  Verificando configuração do ESLint...
call npm run lint >lint_output.tmp 2>&1

if !errorlevel! equ 0 (
    echo ✅ ESLint configurado corretamente
    del lint_output.tmp >nul 2>&1
) else (
    echo ⚠️  ESLint encontrou alguns problemas
    echo ℹ️  Tentando corrigir automaticamente...
    call npm run lint:fix >nul 2>&1
    if !errorlevel! equ 0 (
        echo ✅ Problemas de linting corrigidos automaticamente
    ) else (
        echo ⚠️  Alguns problemas precisam ser corrigidos manualmente
        type lint_output.tmp
    )
    del lint_output.tmp >nul 2>&1
)

REM 6. Verificar build
echo ℹ️  Testando build do projeto...
call npm run build >build_output.tmp 2>&1

if !errorlevel! equ 0 (
    echo ✅ Build executado com sucesso
    del build_output.tmp >nul 2>&1
) else (
    echo ❌ Erro no build do projeto
    type build_output.tmp
    del build_output.tmp >nul 2>&1
    echo ℹ️  Verifique os erros acima e execute novamente após as correções
)

REM 7. Executar testes se existirem
call npm run 2>&1 | findstr "test" >nul
if !errorlevel! equ 0 (
    echo ℹ️  Executando testes...
    call npm test -- --watchAll=false >test_output.tmp 2>&1
    
    if !errorlevel! equ 0 (
        echo ✅ Todos os testes passaram
        del test_output.tmp >nul 2>&1
    ) else (
        echo ⚠️  Alguns testes falharam
        type test_output.tmp
        del test_output.tmp >nul 2>&1
    )
)

REM 8. Verificar se Playwright precisa de setup
call npm list @playwright/test >nul 2>&1
if !errorlevel! equ 0 (
    echo ℹ️  Playwright detectado. Verificando browsers...
    call npx playwright list >nul 2>&1
    if not !errorlevel! equ 0 (
        echo ⚠️  Browsers do Playwright não estão instalados
        echo ℹ️  Execute: npx playwright install
    ) else (
        echo ✅ Playwright está configurado corretamente
    )
)

REM 9. Limpeza final
echo ℹ️  Limpando arquivos temporários...
if exist "node_modules.backup" rmdir /s /q "node_modules.backup" >nul 2>&1
if exist "package-lock.json.backup" del "package-lock.json.backup" >nul 2>&1
if exist ".eslintrc.js.backup" del ".eslintrc.js.backup" >nul 2>&1

echo ✅ Limpeza concluída

REM 10. Resumo final
echo.
echo ==========================================
echo 🎉 MIGRAÇÃO CONCLUÍDA COM SUCESSO!
echo ==========================================
echo.
echo ℹ️  Próximos passos recomendados:
echo 1. Revisar o arquivo de documentação gerado
echo 2. Testar as funcionalidades principais da aplicação
echo 3. Verificar se há components que precisam de ajustes
echo 4. Considerar executar: npm run analyze (para análise do bundle)
echo.
echo ℹ️  Comandos úteis:
echo • npm run dev          - Executar em modo desenvolvimento
echo • npm run build        - Gerar build de produção
echo • npm run preview      - Preview do build
echo • npm run lint         - Verificar linting
echo • npm run test         - Executar testes
echo.
echo ✅ Projeto atualizado e pronto para uso!
echo.
pause
