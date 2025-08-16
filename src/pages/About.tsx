import React from 'react'
import { motion } from 'motion/react'

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center md:text-left">
            Sobre Mim
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-center md:text-left">
            <p>
              Sou Luis Henrique da Silva Campos, um Analista de QA Júnior com formação em 
              Análise e Desenvolvimento de Sistemas (FATEC, 2022) e um profundo interesse 
              em qualidade de software e automação.
            </p>
            
            <p>
              Durante minha jornada acadêmica e em cursos como Cypress: Automatizando 
              Testes E2E e Quality Assurance: Plano de Testes e Gestão de Bugs (Alura), 
              desenvolvi uma base sólida em metodologias de teste e raciocínio lógico. 
              Atualmente, estou expandindo minhas competências com Robot Framework e 
              Selenium, aprofundando minha expertise em diversas ferramentas de automação.
            </p>
            
            <h2>Experiência Profissional</h2>
            
            <p>
              Minha experiência profissional consolidou-se como Bolsista no INPE 
              (2021-Presente), onde tive a oportunidade ímpar de trabalhar com sistemas 
              geoespaciais voltados ao monitoramento ambiental da Amazônia.
            </p>
            
            <p>
              Lá, fui responsável por automação de processos, desenvolvimento e 
              implementação de testes manuais e automatizados em aplicações complexas, 
              além de contribuir para a manutenção de serviços web e websites 
              (WordPress, mkdocs/ReadTheDocs).
            </p>
            
            <h2>Projetos Colaborativos</h2>
            
            <p>
              Atuei em projetos colaborativos com instituições como INPE, CNPq, 
              Universidade de Oxford e NERC (UK), sempre com foco em eficiência, 
              qualidade de software e entregas bem documentadas.
            </p>
            
            <h2>Habilidades Técnicas</h2>
            
            <ul>
              <li><strong>Testes:</strong> Cypress, Robot Framework, Selenium, Postman</li>
              <li><strong>Metodologias:</strong> Trello para gestão ágil</li>
              <li><strong>DevOps:</strong> Docker e Linux</li>
              <li><strong>Desenvolvimento:</strong> JavaScript, Node.js, Go</li>
            </ul>
            
            <h2>Objetivos de Carreira</h2>
            
            <p>
              Olhando para o futuro, meu objetivo de carreira é me consolidar como um 
              Analista de QA Pleno, aplicando e expandindo minhas habilidades em 
              automação de testes e colaborando ativamente em equipes ágeis e remotas.
            </p>
            
            <p>
              Busco desafios que me permitam não apenas garantir a excelência do produto, 
              mas também otimizar processos e contribuir para a inovação. Sou autodidata, 
              proativo e apaixonado por tecnologia, sempre em busca de aprendizado contínuo.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}