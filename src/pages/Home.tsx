import React from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Github, Linkedin, Mail, Download, MessageCircle } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()
  
  const handleDownloadCV = () => {
    const cvUrl = import.meta.env.VITE_CV_DOWNLOAD_URL
    if (cvUrl) {
      // Abre o CV em uma nova aba para download
      window.open(cvUrl, '_blank')
    } else {
      console.error('URL do CV não configurada no arquivo .env')
      alert('CV não disponível no momento. Tente novamente mais tarde.')
    }
  }

  const handleContact = () => {
    // Navegar para página de contato usando React Router
    navigate('/contact')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Luis Henrique
            </h1>
            <h2 className="mt-4 text-2xl font-medium text-primary-600 dark:text-primary-400 sm:text-3xl">
              Analista de QA
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              Especialista em automação de testes, Cypress, Robot Framework e sistemas 
              geoespaciais. Focado em qualidade de software e entregas de excelência.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
          >
            <button
              onClick={handleContact}
              className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Entre em Contato
              <ArrowRight className="h-4 w-4" />
            </button>
            
            <button
              onClick={handleDownloadCV}
              className="inline-flex items-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <Download className="h-4 w-4" />
              Download CV
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex justify-center gap-6"
          >
            <a
              href={import.meta.env.VITE_SOCIAL_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href={import.meta.env.VITE_SOCIAL_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="sr-only">WhatsApp</span>
            </a>
            <a
              href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
              className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            >
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Especialidades
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Principais tecnologias e metodologias que domino
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Automação de Testes
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Cypress, Robot Framework, Selenium para testes E2E e de integração
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs rounded">
                  Cypress
                </span>
                <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs rounded">
                  Robot Framework
                </span>
                <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs rounded">
                  Selenium
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Metodologias Ágeis
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Gestão de projetos, planejamento de testes e documentação
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 text-xs rounded">
                  Scrum
                </span>
                <span className="px-2 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 text-xs rounded">
                  Trello
                </span>
                <span className="px-2 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200 text-xs rounded">
                  Jira
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Sistemas Geoespaciais
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Experiência com sistemas de monitoramento ambiental no INPE
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200 text-xs rounded">
                  GIS
                </span>
                <span className="px-2 py-1 bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200 text-xs rounded">
                  Docker
                </span>
                <span className="px-2 py-1 bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200 text-xs rounded">
                  Linux
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Vamos Trabalhar Juntos?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Estou sempre aberto a novos desafios e oportunidades. Entre em contato 
              para discutirmos como posso contribuir para seu projeto.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <button
                onClick={handleContact}
                className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Fale Comigo
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
