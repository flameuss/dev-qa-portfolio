@echo off
echo 🔧 Verificando e corrigindo imports com aliases...

echo 📁 Verificando arquivos:

set "files=src\App.tsx src\components\layout\Navbar.tsx src\components\layout\Footer.tsx src\components\common\ScrollToTop.tsx src\components\common\ErrorBoundary.tsx src\components\ui\LoadingSpinner.tsx src\components\ui\Button.tsx src\pages\Home.tsx src\pages\About.tsx src\pages\Projects.tsx src\pages\Contact.tsx src\pages\NotFound.tsx"

for %%f in (%files%) do (
    if exist "%%f" (
        echo ✅ %%f
        findstr /C:"@contexts" "%%f" >nul 2>&1
        if not errorlevel 1 (
            echo    🔍 Encontrado @contexts em %%f
        )
    ) else (
        echo ❌ %%f - MISSING
    )
)

echo.
echo 🚀 Configuração dos aliases atualizada em:
echo   - vite.config.ts
echo   - tsconfig.json
echo.
echo 💡 Para aplicar as mudanças:
echo   1. Pare o servidor Vite (Ctrl+C)
echo   2. Execute: npm run dev
echo.
echo 🔄 Se ainda houver problemas, execute:
echo   rmdir /s /q node_modules
echo   del package-lock.json
echo   npm install
echo   npm run dev

pause
