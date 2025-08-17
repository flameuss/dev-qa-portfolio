import { useState, useEffect } from 'react'
import { Certificate, googleDriveService } from '@/services/drive/googleDriveService'

interface UseCertificatesReturn {
  certificates: Certificate[]
  loading: boolean
  error: string | null
  refreshCertificates: () => Promise<void>
  clearCacheAndRefresh: () => Promise<void>
}

export const useCertificates = (): UseCertificatesReturn => {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCertificates = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const certificatesData = await googleDriveService.getCertificatesWithImages()
      setCertificates(certificatesData)
    } catch (err) {
      console.error('Erro ao buscar certificados:', err)
      setError('Erro ao carregar certificados')
    } finally {
      setLoading(false)
    }
  }

  const refreshCertificates = async () => {
    await fetchCertificates()
  }

  const clearCacheAndRefresh = async () => {
    try {
      setLoading(true)
      setError(null)
      
      googleDriveService.clearCache()
      const certificatesData = await googleDriveService.getCertificatesWithImages()
      setCertificates(certificatesData)
    } catch (err) {
      console.error('Erro ao limpar cache e recarregar:', err)
      setError('Erro ao recarregar certificados')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCertificates()
  }, [])

  return {
    certificates,
    loading,
    error,
    refreshCertificates,
    clearCacheAndRefresh
  }
}
