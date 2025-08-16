import React from 'react'
import { motion } from 'motion/react'
import { Home } from 'lucide-react'
import { Button } from '@components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            404
          </h1>
          
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Página não encontrada
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md">
            A página que você está procurando não existe ou foi movida para outro local.
          </p>
          
          <Button variant="primary" onClick={() => window.location.href = '/'}>
            <Home className="mr-2 h-4 w-4" />
            Voltar para Home
          </Button>
        </motion.div>
      </div>
    </div>
  )
}