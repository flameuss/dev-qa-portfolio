#!/bin/bash

echo "🔧 CORREÇÃO DEFINITIVA: Instalando plugin vite-tsconfig-paths e revertendo imports"

# Instalar o plugin vite-tsconfig-paths
echo "📦 Instalando vite-tsconfig-paths..."
npm install --save-dev vite-tsconfig-paths

# Atualizar vite.config.ts para usar o plugin
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths() // Plugin para resolver automaticamente os aliases do tsconfig.json
  ],
  base: process.env.NODE_ENV === 'production' ? '/dev-qa-portfolio/' : '/',
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          motion: ['motion'],
          forms: ['react-hook-form'],
          utils: ['axios', 'date-fns', 'clsx'],
          ui: ['@headlessui/react', 'lucide-react'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'motion'],
  },
})
EOF

# Reverter App.tsx para usar imports @ limpos
cat > src/App.tsx << 'EOF'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'

// Contexts
import { ThemeProvider } from '@/contexts/ThemeContext'
import { GitHubProvider } from '@/contexts/GitHubContext'

// Components
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/common/ScrollToTop'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { AppRouter } from '@/components/router/AppRouter'

// Pages (Direct imports)
import Home from '@/pages/Home'
import About from '@/pages/About'
import Projects from '@/pages/Projects'
import Certificates from '@/pages/Certificates'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'

// Main App Component
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <GitHubProvider>
          <AppRouter>
            <div className="flex min-h-screen flex-col bg-white transition-colors duration-300 dark:bg-gray-950">
              {/* Navigation */}
              <Navbar />
              
              {/* Main Content */}
              <main className="flex-1">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/certificates" element={<Certificates />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AnimatePresence>
              </main>
              
              {/* Footer */}
              <Footer />
              
              {/* Utility Components */}
              <ScrollToTop />
            </div>
          </AppRouter>
        </GitHubProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
EOF

echo "✅ Configuração atualizada com plugin vite-tsconfig-paths"

git add package.json package-lock.json vite.config.ts src/App.tsx

git commit -m "fix: add vite-tsconfig-paths plugin for proper alias resolution

- Install vite-tsconfig-paths plugin to automatically resolve @ aliases
- Update vite.config.ts to use plugin instead of manual alias mapping
- Revert App.tsx to use clean @ imports that should now work
- Plugin reads tsconfig.json paths and configures Vite automatically

This should resolve all 'Cannot find module' errors in build"

git push origin main

echo "🚀 CORREÇÃO DEFINITIVA APLICADA!"
echo "📋 O plugin vite-tsconfig-paths agora lê automaticamente o tsconfig.json"
echo "🔄 Verificar build: https://github.com/flameuss/dev-qa-portfolio/actions"
