@echo off
echo 🔍 Verificação Final - Portfolio QA
echo ==================================

REM Verificar se Motion está instalado
echo 📦 Verificando Motion...
npm list motion >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Motion instalado corretamente
) else (
    echo ❌ Motion não encontrado - execute: npm install motion
)

REM Verificar se Framer Motion foi removido
echo 🗑️  Verificando remoção do Framer Motion...
npm list framer-motion >nul 2>&1
if %errorlevel% == 0 (
    echo ⚠️  Framer Motion ainda está instalado - execute: npm uninstall framer-motion
) else (
    echo ✅ Framer Motion removido corretamente
)

REM Verificar TypeScript
echo 🔧 Verificando TypeScript...
npm run type-check >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ TypeScript sem erros
) else (
    echo ❌ Erros de TypeScript encontrados
)

REM Verificar build
echo 🏗️  Testando build...
npm run build >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Build executado com sucesso
) else (
    echo ❌ Erro no build
)

echo ==================================
echo ✅ Verificação concluída!
pause