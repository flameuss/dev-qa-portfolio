@echo off
echo 🔧 Testando configuração do projeto...

REM Verificar se estamos no diretório correto
if not exist "package.json" (
    echo ❌ Execute este script na raiz do projeto.
    pause
    exit /b 1
)

echo 📁 Verificando arquivos críticos...

set "files=src\pages\Home.tsx src\pages\About.tsx src\pages\Projects.tsx src\pages\Contact.tsx src\pages\NotFound.tsx src\contexts\ThemeContext.tsx src\contexts\GitHubContext.tsx src\components\layout\Navbar.tsx src\components\layout\Footer.tsx src\components\ui\LoadingSpinner.tsx src\components\common\ScrollToTop.tsx src\components\common\ErrorBoundary.tsx src\vite-env.d.ts"

set "all_exist=true"

for %%f in (%files%) do (
    if exist "%%f" (
        echo ✅ %%f
    ) else (
        echo ❌ %%f - MISSING
        set "all_exist=false"
    )
)

if "%all_exist%"=="true" (
    echo.
    echo ✅ Todos os arquivos necessários estão presentes!
    echo.
    echo 🚀 Tentando executar o projeto...
    call npm run dev
) else (
    echo.
    echo ❌ Alguns arquivos estão faltando. Verifique os arquivos marcados como MISSING.
    pause
)
