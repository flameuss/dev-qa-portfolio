@echo off
echo 🔍 Testando configuração de rotas...

REM Testar se o servidor está rodando
curl -s http://localhost:3000/ >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Servidor Vite está rodando
    echo.
    echo 📋 URLs para testar no navegador:
    echo   - http://localhost:3000/
    echo   - http://localhost:3000/about
    echo   - http://localhost:3000/projects  
    echo   - http://localhost:3000/contact
    echo   - http://localhost:3000/home
) else (
    echo ❌ Servidor Vite não está rodando
    echo 💡 Execute: npm run dev
)

echo.
echo 🎯 Configuração atual:
echo   - Desenvolvimento: Base path '/'
echo   - Produção: Base path '/dev-qa-portfolio/'
echo.
echo ✅ Navegação corrigida para usar React Router
echo.

pause
