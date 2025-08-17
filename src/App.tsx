import React, { Suspense } from 'react'

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

// Pages (Lazy Loading)
const Home = React.lazy(() => import('@/pages/Home'))
const About = React.lazy(() => import('@/pages/About'))
const Projects = React.lazy(() => import('@/pages/Projects'))
const Certificates = React.lazy(() => import('@/pages/Certificates'))
const Contact = React.lazy(() => import('@/pages/Contact'))
const NotFound = React.lazy(() => import('@/pages/NotFound'))

// Loading Component for Suspense
const PageLoader: React.FC = () => (
  <div className="flex min-h-screen items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
)

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
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/certificates" element={<Certificates />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
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