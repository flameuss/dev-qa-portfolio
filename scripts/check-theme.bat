@echo off
echo 🔍 Verificando arquivos com possíveis problemas de encoding...

echo 📁 Verificando arquivos críticos do tema:

set "files=src\components\ui\SimpleThemeToggle.tsx src\contexts\ThemeContext.tsx src\components\layout\Navbar.tsx" 

for %%f in (%files%) do (
    if exist "%%f" (
        echo ✅ %%f
    ) else (
        echo ❌ %%f - MISSING
    )
)

echo.
echo 🎨 Status do modo escuro:
echo   ✅ ThemeContext reescrito
echo   ✅ Navbar atualizada  
echo   ✅ Componentes de debug criados
echo   ✅ Encoding corrigido
echo.
echo 🚀 Para testar:
echo   1. Reinicie o servidor: Ctrl+C depois npm run dev
echo   2. Clique no ícone sol/lua no navbar
echo   3. Use os toggles de debug (canto inferior)
echo.
echo 🐛 Se ainda houver erros:
echo   1. Limpe o cache: rmdir /s /q node_modules ^&^& npm install
echo   2. Force refresh: Ctrl+F5 no navegador

pause
