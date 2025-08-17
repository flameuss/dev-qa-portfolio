import React, { useState, useEffect } from 'react'
import { googleDriveService } from '@/services/drive/googleDriveService'
import { AlertCircle, CheckCircle, ExternalLink, Download, Image, FileText, Calendar, MapPin, Award, RefreshCw } from 'lucide-react'
import { CertificateImage } from './CertificateImage'

interface Certificate {
  id: string
  titulo: string
  local: string
  dataInicio: string
  dataTermino: string
  projetoReferente: string
  certificado: string
  linkProjeto?: string
  imageUrl?: string
  downloadUrl?: string
  fileName?: string
  fileType?: 'image' | 'pdf' | 'unknown'
  status?: 'ativo' | 'expirado' | 'em_andamento' | string
  cargaHoraria?: string
  certificadora?: string
}

const GoogleDriveTester: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>(undefined)
  const [view, setView] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    loadCertificates()
  }, [])

  const loadCertificates = async () => {
    try {
      setLoading(true)
      setError(undefined)
      
      console.log('🔄 Carregando certificados...')
      const certs = await googleDriveService.getCertificatesWithImages()
      console.log('✅ Certificados carregados:', certs.length)
      
      setCertificates(certs)
    } catch (error: any) {
      console.error('❌ Erro ao carregar certificados:', error)
      setError(error.message || 'Erro ao carregar certificados')
    } finally {
      setLoading(false)
    }
  }

  const refreshCertificates = () => {
    googleDriveService.clearCache()
    loadCertificates()
  }

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'ativo':
      case 'completo':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'em_andamento':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'expirado':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr === 'dd/mm/yyyy') return 'N/A'
    return dateStr
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Carregando certificados...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-8 w-8 text-red-500 mb-4" />
        <p className="text-red-600 dark:text-red-400 mb-4">Erro: {error}</p>
        <button
          onClick={refreshCertificates}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Meus Certificados
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {certificates.length} certificados encontrados
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={refreshCertificates}
            className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            title="Atualizar certificados"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-md transition-colors ${
                view === 'grid'
                  ? 'bg-white dark:bg-gray-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <div className="grid grid-cols-2 gap-1 w-4 h-4">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-md transition-colors ${
                view === 'list'
                  ? 'bg-white dark:bg-gray-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <div className="space-y-1 w-4 h-4">
                <div className="h-1 bg-current rounded"></div>
                <div className="h-1 bg-current rounded"></div>
                <div className="h-1 bg-current rounded"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Certificates */}
      {certificates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Award className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nenhum certificado encontrado
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Verifique a configuração do Google Drive ou tente atualizar
          </p>
          <button
            onClick={refreshCertificates}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </button>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="aspect-video bg-gray-100 dark:bg-gray-700">
                <CertificateImage
                  imageUrl={cert.imageUrl}
                  title={cert.titulo}
                  fileName={cert.fileName}
                  fileType={cert.fileType}
                  className="w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">
                    {cert.titulo}
                  </h3>
                  {cert.status && (
                    <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${getStatusColor(cert.status)}`}>
                      {cert.status}
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{cert.local}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 flex-shrink-0" />
                    <span>{formatDate(cert.dataInicio)} - {formatDate(cert.dataTermino)}</span>
                  </div>

                  {cert.cargaHoraria && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs">⏱️</span>
                      <span>{cert.cargaHoraria}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {cert.projetoReferente}
                    </span>
                    
                    <div className="flex items-center gap-1">
                      {cert.imageUrl && (
                        <div className="text-green-600 dark:text-green-400" title="Com imagem">
                          {cert.fileType === 'pdf' ? (
                            <FileText className="h-3 w-3" />
                          ) : (
                            <Image className="h-3 w-3" />
                          )}
                        </div>
                      )}
                      
                      {cert.linkProjeto && (
                        <a
                          href={cert.linkProjeto}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                          title="Ver projeto"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-20 h-14 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded">
                  <CertificateImage
                    imageUrl={cert.imageUrl}
                    title={cert.titulo}
                    fileName={cert.fileName}
                    fileType={cert.fileType}
                    className="w-full h-full"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {cert.titulo}
                    </h3>
                    {cert.status && (
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(cert.status)}`}>
                        {cert.status}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{cert.local}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(cert.dataInicio)} - {formatDate(cert.dataTermino)}</span>
                    </div>
                    {cert.cargaHoraria && (
                      <div className="flex items-center gap-1">
                        <span>⏱️</span>
                        <span>{cert.cargaHoraria}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {cert.projetoReferente}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      {cert.imageUrl && (
                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                          {cert.fileType === 'pdf' ? (
                            <FileText className="h-4 w-4" />
                          ) : (
                            <Image className="h-4 w-4" />
                          )}
                          <span className="text-xs">Com arquivo</span>
                        </div>
                      )}
                      
                      {cert.linkProjeto && (
                        <a
                          href={cert.linkProjeto}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Ver projeto
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GoogleDriveTester
