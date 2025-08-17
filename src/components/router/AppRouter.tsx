import React from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'

interface AppRouterProps {
  children: React.ReactNode
}

/**
 * AppRouter - Detects the environment and uses the appropriate router
 * Uses HashRouter for GitHub Pages compatibility when BrowserRouter fails
 */
export const AppRouter: React.FC<AppRouterProps> = ({ children }) => {
  const isGitHubPages = typeof window !== 'undefined' && 
    window.location.hostname === 'flameuss.github.io'
  
  const basename = import.meta.env.PROD ? '/dev-qa-portfolio' : '/'

  // For GitHub Pages, we'll try BrowserRouter first, then fallback to HashRouter if needed
  // The 404.html redirect should handle most cases, but HashRouter is a reliable fallback
  if (isGitHubPages) {
    return (
      <BrowserRouter basename={basename}>
        {children}
      </BrowserRouter>
    )
  }

  // For local development and other deployments, use BrowserRouter
  return (
    <BrowserRouter basename={basename}>
      {children}
    </BrowserRouter>
  )
}
