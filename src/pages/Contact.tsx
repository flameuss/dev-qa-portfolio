import React from 'react'
import { motion } from 'motion/react'

export default function Contact() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Contato
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Vamos conversar?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Estou sempre aberto a novas oportunidades e projetos interessantes. 
                Entre em contato para conversarmos sobre como posso contribuir para sua equipe.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
                  <a 
                    href="mailto:luis.henrique_campos@outlook.com.br"
                    className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    luis.henrique_campos@outlook.com.br
                  </a>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">LinkedIn</h3>
                  <a 
                    href="https://www.linkedin.com/in/luis-hscampos/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    /in/luis-hscampos
                  </a>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">GitHub</h3>
                  <a 
                    href="https://github.com/flameuss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    github.com/flameuss
                  </a>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Localização</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Cachoeira Paulista - SP, Brasil
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Disponibilidade</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Disponível para oportunidades remotas
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Áreas de Interesse
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Quality Assurance
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Automação de testes, testes manuais, gestão de qualidade
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Automação
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Cypress, Robot Framework, Selenium, Postman
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Sistemas Geoespaciais
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Monitoramento ambiental, projetos científicos
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Metodologias Ágeis
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Scrum, Kanban, trabalho remoto colaborativo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}