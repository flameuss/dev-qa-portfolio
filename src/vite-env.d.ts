/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_USERNAME: string
  readonly VITE_GITHUB_TOKEN?: string
  readonly VITE_EMAIL_SERVICE_ID?: string
  readonly VITE_EMAIL_TEMPLATE_ID?: string
  readonly VITE_EMAIL_PUBLIC_KEY?: string
  readonly VITE_GA_TRACKING_ID?: string
  readonly VITE_HOTJAR_ID?: string
  readonly VITE_HOTJAR_VERSION?: string
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_APP_NAME?: string
  readonly VITE_APP_VERSION?: string
  readonly VITE_BASE_URL?: string
  readonly VITE_SITE_URL?: string
  readonly VITE_FULL_NAME?: string
  readonly VITE_EMAIL?: string
  readonly VITE_LOCATION?: string
  readonly VITE_COMPANY?: string
  readonly VITE_BIO?: string
  readonly VITE_LINKEDIN_URL?: string
  readonly VITE_TWITTER_URL?: string
  readonly VITE_DEBUG?: string
  readonly VITE_MOCK_API?: string
  readonly VITE_SHOW_GRID?: string
  // Social Media & Contact
  readonly VITE_SOCIAL_GITHUB?: string
  readonly VITE_SOCIAL_LINKEDIN?: string
  readonly VITE_CONTACT_EMAIL?: string
  readonly VITE_CONTACT_PHONE?: string
  readonly VITE_CONTACT_ADDRESS?: string
  readonly VITE_CONTACT_AVAILABILITY?: string
  // CV/Resume
  readonly VITE_CV_DOWNLOAD_URL?: string
  readonly VITE_CV_VIEW_URL?: string
  // WhatsApp
  readonly VITE_WHATSAPP_NUMBER?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
