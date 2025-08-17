import { useEffect } from 'react'

export interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  noindex?: boolean
}

const defaultProps = {
  title: 'Luis Henrique - Analista QA & Automação de Testes',
  description: 'Analista de QA especializado em automação de testes, Cypress, Robot Framework e sistemas geoespaciais. Portfolio de projetos e experiências profissionais.',
  type: 'website'
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  noindex = false
}) => {
  useEffect(() => {
    const siteUrl = 'https://flameuss.github.io/dev-qa-portfolio'
    const fullTitle = title ? `${title} | ${defaultProps.title}` : defaultProps.title
    const fullDescription = description || defaultProps.description
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl
    const fullImage = image ? `${siteUrl}${image}` : `${siteUrl}/og-image.jpg`
    const keywordsString = keywords.length > 0 ? keywords.join(', ') : 'qa,analista,automação,testes,cypress,robot framework,selenium,portfolio'

    // Update document title
    document.title = fullTitle

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        document.head.appendChild(meta)
      }
      
      meta.setAttribute('content', content)
    }

    // Primary meta tags
    updateMetaTag('description', fullDescription)
    updateMetaTag('keywords', keywordsString)
    updateMetaTag('author', 'Luis Henrique da Silva Campos')

    // Open Graph tags
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:url', fullUrl, true)
    updateMetaTag('og:title', fullTitle, true)
    updateMetaTag('og:description', fullDescription, true)
    updateMetaTag('og:image', fullImage, true)
    updateMetaTag('og:site_name', 'Luis Henrique Portfolio', true)
    updateMetaTag('og:locale', 'pt_BR', true)

    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image', true)
    updateMetaTag('twitter:url', fullUrl, true)
    updateMetaTag('twitter:title', fullTitle, true)
    updateMetaTag('twitter:description', fullDescription, true)
    updateMetaTag('twitter:image', fullImage, true)

    // Robots
    if (noindex) {
      updateMetaTag('robots', 'noindex,nofollow')
    }

  }, [title, description, keywords, image, url, type, noindex])

  return null
}

// Page-specific SEO components
export const HomeSEO: React.FC<Partial<SEOProps>> = (props) => (
  <SEO
    title="Home"
    description="Portfolio profissional de Luis Henrique, Analista de QA especializado em automação de testes e sistemas geoespaciais no INPE."
    keywords={['portfolio', 'qa', 'analista', 'automação', 'testes', 'inpe']}
    {...props}
  />
)

export const AboutSEO: React.FC<Partial<SEOProps>> = (props) => (
  <SEO
    title="Sobre Mim"
    description="Conheça Luis Henrique, Analista de QA Júnior com experiência em automação de testes, Cypress, Robot Framework e projetos geoespaciais."
    url="/about"
    keywords={['sobre', 'perfil', 'experiência', 'qualificações', 'qa', 'analista']}
    {...props}
  />
)

export const ProjectsSEO: React.FC<Partial<SEOProps>> = (props) => (
  <SEO
    title="Projetos"
    description="Explore os projetos de automação de testes e sistemas desenvolvidos por Luis Henrique, incluindo frameworks Cypress e Robot Framework."
    url="/projects"
    keywords={['projetos', 'automação', 'cypress', 'robot framework', 'github', 'portfolio']}
    {...props}
  />
)

export const CertificatesSEO: React.FC<Partial<SEOProps>> = (props) => (
  <SEO
    title="Certificados"
    description="Certificações e cursos completados por Luis Henrique na área de QA, automação de testes e tecnologias relacionadas."
    url="/certificates"
    keywords={['certificados', 'certificações', 'cursos', 'qualificações', 'qa', 'testes']}
    {...props}
  />
)

export const ContactSEO: React.FC<Partial<SEOProps>> = (props) => (
  <SEO
    title="Contato"
    description="Entre em contato com Luis Henrique para oportunidades profissionais, projetos de automação de testes ou colaborações."
    url="/contact"
    keywords={['contato', 'email', 'linkedin', 'oportunidades', 'colaboração']}
    {...props}
  />
)