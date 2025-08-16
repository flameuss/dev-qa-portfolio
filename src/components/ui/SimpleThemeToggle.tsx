import React from 'react'
import { useTheme } from '@contexts/ThemeContext'

export function SimpleThemeToggle() {
  const { theme, setTheme, effectiveTheme } = useTheme()

  const handleToggle = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('light')  
    } else {
      setTheme(effectiveTheme === 'dark' ? 'light' : 'dark')
    }
  }

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-4 right-4 z-50 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transition-all duration-200"
      title={`Alternar para modo ${effectiveTheme === 'dark' ? 'claro' : 'escuro'}`}
    >
      {effectiveTheme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
