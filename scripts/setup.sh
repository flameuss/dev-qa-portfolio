#!/bin/bash

# 🚀 Setup Script para Portfolio Developer/QA
# Automatiza a configuração completa do projeto

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Emojis
ROCKET='🚀'
CHECK='✅'
CROSS='❌'  
WARNING='⚠️'
INFO='💡'
GEAR='⚙️'

# Script info
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
PROJECT_NAME="dev-qa-portfolio"

echo -e "${BLUE}${ROCKET} Portfolio Developer/QA Setup Script${NC}"
echo -e "${CYAN}============================================${NC}"
echo

# Function to print colored output
print_status() {
    echo -e "${GREEN}${CHECK} $1${NC}"
}

print_error() {
    echo -e "${RED}${CROSS} $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}${WARNING} $1${NC}"
}

print_info() {
    echo -e "${BLUE}${INFO} $1${NC}"
}

print_step() {
    echo -e "${PURPLE}${GEAR} $1${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to get user input
get_input() {
    local prompt="$1"
    local default="$2"
    local var_name="$3"
    
    if [ -n "$default" ]; then
        read -p "$prompt [$default]: " input
        input=${input:-$default}
    else
        read -p "$prompt: " input
    fi
    
    eval "$var_name='$input'"
}

# Check system requirements
print_step "Verificando requisitos do sistema..."

# Check Node.js
if command_exists node; then
    NODE_VERSION=$(node --version)
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | tr -d 'v')
    if [ "$NODE_MAJOR" -ge 18 ]; then
        print_status "Node.js $NODE_VERSION encontrado"
    else
        print_error "Node.js 18+ é necessário. Versão atual: $NODE_VERSION"
        exit 1
    fi
else
    print_error "Node.js não encontrado. Por favor, instale Node.js 18+"
    exit 1
fi

# Check npm
if command_exists npm; then
    NPM_VERSION=$(npm --version)
    print_status "npm $NPM_VERSION encontrado"
else
    print_error "npm não encontrado"
    exit 1
fi

# Check Git
if command_exists git; then
    GIT_VERSION=$(git --version | cut -d' ' -f3)
    print_status "Git $GIT_VERSION encontrado"
else
    print_error "Git não encontrado. Por favor, instale Git"
    exit 1
fi

echo

# Get project configuration
print_step "Configuração do projeto..."

# GitHub username
get_input "GitHub username" "flameuss" GITHUB_USERNAME

# GitHub token (optional but recommended)
print_info "GitHub Personal Access Token é opcional mas recomendado para evitar rate limits"
get_input "GitHub Personal Access Token (opcional)" "" GITHUB_TOKEN

# Project details
get_input "Nome completo" "" FULL_NAME
get_input "Email" "" EMAIL
get_input "Localização" "" LOCATION

echo

# Install dependencies
print_step "Instalando dependências..."
cd "$PROJECT_DIR"

if [ -f "package-lock.json" ]; then
    print_info "Usando npm ci para instalação limpa..."
    npm ci
else
    print_info "Instalando dependências com npm install..."
    npm install
fi

print_status "Dependências instaladas com sucesso"

echo

# Create environment file
print_step "Configurando variáveis de ambiente..."

ENV_FILE="$PROJECT_DIR/.env.local"
cat > "$ENV_FILE" << EOF
# 🔧 Configuração do Portfolio
# Gerado automaticamente pelo setup script

# GitHub Configuration
VITE_GITHUB_USERNAME=$GITHUB_USERNAME
$([ -n "$GITHUB_TOKEN" ] && echo "VITE_GITHUB_TOKEN=$GITHUB_TOKEN" || echo "# VITE_GITHUB_TOKEN=seu_token_aqui")

# Personal Information
VITE_FULL_NAME="$FULL_NAME"
VITE_EMAIL="$EMAIL"
$([ -n "$LOCATION" ] && echo "VITE_LOCATION=\"$LOCATION\"" || echo "# VITE_LOCATION=\"Sua localização\"")

# Application Configuration
VITE_APP_NAME="$PROJECT_NAME"
VITE_APP_VERSION=1.0.0
VITE_BASE_URL=/dev-qa-portfolio/

# Development
NODE_ENV=development
VITE_DEBUG=false
EOF

print_status "Arquivo .env.local criado"

echo

# Final instructions
print_step "Setup completo! 🎉"
echo
print_info "Próximos passos:"

echo -e "${CYAN}1. Desenvolvimento:${NC}"
echo -e "   npm run dev                 # Iniciar servidor de desenvolvimento"
echo -e "   http://localhost:3000       # Acessar aplicação"
echo

echo -e "${CYAN}2. GitHub Repository:${NC}"
echo -e "   git remote add origin https://github.com/$GITHUB_USERNAME/$PROJECT_NAME.git"
echo -e "   git add ."
echo -e "   git commit -m \"🎉 Initial commit - Portfolio setup\""
echo -e "   git push -u origin main"
echo

echo -e "${CYAN}3. GitHub Pages Setup:${NC}"
echo -e "   • Vá para Settings > Pages no seu repositório"
echo -e "   • Source: GitHub Actions"
echo -e "   • O deploy será automático após o push"

echo

print_status "Setup concluído com sucesso!"
echo -e "${GREEN}Seu portfolio está pronto para desenvolvimento.${NC}"