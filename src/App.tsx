import React from 'react'

import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'

// Contexts
import { ThemeProvider } from '@/contexts/ThemeContext'
import { GitHubProvider } from '@/contexts/GitHubContext'

// Components
import { Navbar } from '@components/layout/Navbar'
import { Footer } from '@components/layout/Footer'
import { ScrollToTop } from '@components/common/ScrollToTop'
import { LoadingSpinner } from '@components/ui/LoadingSpinner'
import { ErrorBoundary } from '@components/common/ErrorBoundary'
import { AppRouter } from '@components/router/AppRouter'

// Pages (Direct imports para resolver build issue)
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