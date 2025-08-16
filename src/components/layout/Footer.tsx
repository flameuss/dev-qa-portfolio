import React from 'react'
import { Github, Linkedin, Mail, MapPin, Calendar, MessageCircle } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Luis Henrique
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Analista de QA especializado em automação de testes e sistemas geoespaciais. 
              Experiência no INPE com projetos de monitoramento ambiental.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="h-4 w-4" />
              Cachoeira Paulista - SP
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="/projects" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                  Projetos
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contato
            </h3>
            <div className="space-y-3 flex flex-col items-center">
              <a
                href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                {import.meta.env.VITE_CONTACT_EMAIL}
              </a>
              
          
              
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Calendar className="h-4 w-4" />
                Disponível para oportunidades remotas
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 mt-6">
             
              <a
                href={import.meta.env.VITE_SOCIAL_GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              
              <a
                href={import.meta.env.VITE_SOCIAL_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              
              <a
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
               
              </a>
              
              <a
                href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        </div>

        {/* New bottom section for full-width line and centered text */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {currentYear} Luis Henrique da Silva Campos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}