# 🐳 Multi-stage Dockerfile para Portfolio

# ================================
# Stage 1: Build Stage
# ================================
FROM node:18-alpine AS builder

# Metadata
LABEL maintainer="flameuss"
LABEL description="Portfolio Developer/QA - Build Stage"
LABEL version="1.0.0"

# Instalar dependências do sistema
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Instalar dependências
RUN npm ci --only=production && \
    npm cache clean --force

# Copiar código fonte
COPY public/ ./public/
COPY src/ ./src/
COPY index.html ./

# Build da aplicação
ARG VITE_GITHUB_USERNAME=flameuss
ARG VITE_GITHUB_TOKEN
ARG VITE_BASE_URL=/dev-qa-portfolio/

ENV NODE_ENV=production
ENV VITE_GITHUB_USERNAME=${VITE_GITHUB_USERNAME}
ENV VITE_GITHUB_TOKEN=${VITE_GITHUB_TOKEN}
ENV VITE_BASE_URL=${VITE_BASE_URL}

RUN npm run build

# Verificar se o build foi criado
RUN ls -la dist/

# ================================
# Stage 2: Production Stage
# ================================
FROM nginx:alpine AS production

# Metadata
LABEL maintainer="flameuss"
LABEL description="Portfolio Developer/QA - Production"
LABEL version="1.0.0"

# Instalar certificados SSL e utilitários
RUN apk add --no-cache \
    ca-certificates \
    curl \
    tzdata \
    && update-ca-certificates \
    && rm -rf /var/cache/apk/*

# Configurar timezone
ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Criar usuário não-root
RUN addgroup -g 1001 -S portfolio && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx -s /sbin/nologin -G portfolio -g portfolio portfolio

# Copiar arquivos do build
COPY --from=builder --chown=portfolio:portfolio /app/dist /usr/share/nginx/html

# Copiar configuração customizada do Nginx
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf

# Criar diretórios necessários
RUN mkdir -p /var/cache/nginx/client_temp \
             /var/cache/nginx/proxy_temp \
             /var/cache/nginx/fastcgi_temp \
             /var/cache/nginx/uwsgi_temp \
             /var/cache/nginx/scgi_temp \
    && chown -R portfolio:portfolio /var/cache/nginx \
    && chown -R portfolio:portfolio /var/log/nginx \
    && chown -R portfolio:portfolio /etc/nginx/conf.d \
    && touch /var/run/nginx.pid \
    && chown -R portfolio:portfolio /var/run/nginx.pid

# Configurar permissões para arquivos estáticos
RUN chown -R portfolio:portfolio /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80/ || exit 1

# Expor porta
EXPOSE 80

# Executar como usuário não-root
USER portfolio

# Comando de inicialização
CMD ["nginx", "-g", "daemon off;"]