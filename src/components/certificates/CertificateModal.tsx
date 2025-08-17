import React from 'react'
import { motion } from 'motion/react'
import { X, Calendar, MapPin, FolderOpen, Award, ExternalLink, Download, FileText, Eye, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { Certificate } from '../../services/drive/googleDriveService'
import { CertificateImage } from './CertificateImage'

interface CertificateModalProps {
  certificate: Certificate | null
  isOpen: boolean
  onClose: () => void
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  isOpen,
  onClose
}) => {
  if (!isOpen || !certificate) return null

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    
    try {
      // Se já está no formato ISO (YYYY-MM-DD)
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        const date = new Date(dateString + 'T00:00:00')
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('pt-BR')
        }
      }
      
      // Se está no formato DD/MM/YYYY
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
        const [day, month, year] = dateString.split('/')
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('pt-BR')
        }
      }
      
      // Tentar parsing genérico
      const date = new Date(dateString)
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('pt-BR')
      }
      
      return dateString
      
    } catch {
      return dateString
    }
  }

  const handleProjectLink = () => {
    if (certificate.linkProjeto) {
      window.open(certificate.linkProjeto, '_blank', 'noopener,noreferrer')
    }
  }

  const handleDownload = () => {
    if (certificate.downloadUrl) {
      const link = document.createElement('a')
      link.href = certificate.downloadUrl
      link.download = certificate.fileName || `${certificate.certificado || 'certificado'}.${certificate.fileType === 'pdf' ? 'pdf' : 'jpg'}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleViewFullscreen = () => {
    if (certificate.imageUrl) {
      window.open(certificate.imageUrl, '_blank', 'noopener,noreferrer')
    }
  }

  // Determinar configuração do status - IGUAL ao CertificateCard
  const getStatusConfig = (status?: string) => {
    const normalizedStatus = (status || 'N/A').toLowerCase().trim() // Padrão N/A
    
    switch (normalizedStatus) {
      case 'ativo':
      case 'completo':
      case 'complete':
      case 'concluído':
      case 'concluido':
        return {
          icon: CheckCircle,
          color: 'text-green-600 dark:text-green-400',
          bg: 'bg-green-50 dark:bg-green-900/30',
          label: 'Completo' // Mudança: Ativo → Completo
        }
      case 'expirado':
      case 'expired':
      case 'vencido':
        return {
          icon: AlertCircle,
          color: 'text-red-600 dark:text-red-400',
          bg: 'bg-red-50 dark:bg-red-900/30',
          label: 'Expirado'
        }
      case 'em_andamento':
      case 'em andamento':
      case 'progress':
      case 'andamento':
        return {
          icon: Clock,
          color: 'text-yellow-600 dark:text-yellow-400',
          bg: 'bg-yellow-50 dark:bg-yellow-900/30',
          label: 'Em Andamento'
        }
      case 'n/a':
      case 'na':
      case '':
      case null:
      case undefined:
        return {
          icon: AlertCircle,
          color: 'text-gray-600 dark:text-gray-400',
          bg: 'bg-gray-50 dark:bg-gray-900/30',
          label: 'N/A'
        }
      default:
        return {
          icon: AlertCircle,
          color: 'text-gray-600 dark:text-gray-400',
          bg: 'bg-gray-50 dark:bg-gray-900/30',
          label: 'N/A' // Padrão N/A em vez de Ativo
        }
    }
  }

  const statusConfig = getStatusConfig(certificate.status)
  const StatusIcon = statusConfig.icon

  const isPDF = certificate.fileType === 'pdf'
  const hasImage = Boolean(certificate.imageUrl)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative max-w-6xl w-full max-h-[95vh] bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start space-x-4 flex-1 min-w-0">
            <Award className="h-8 w-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                {certificate.titulo}
              </h2>
              <div className="flex items-center space-x-3">
                {/* Status Badge */}
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${statusConfig.bg}`}>
                  <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
                  <span className={`font-medium ${statusConfig.color}`}>
                    {statusConfig.label}
                  </span>
                </div>
                
                {/* Ano */}
                <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {certificate.dataTermino ? new Date(certificate.dataTermino).getFullYear() : 'N/A'}
                </div>
                
                {/* Tipo de arquivo */}
                {certificate.fileType && (
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${
                    isPDF 
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' 
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    {isPDF ? <FileText className="h-3 w-3" /> : <Award className="h-3 w-3" />}
                    <span>{certificate.fileType.toUpperCase()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0 ml-4"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 max-h-[calc(95vh-140px)] overflow-y-auto">
          {/* Imagem/Preview do Certificado */}
          <div className="space-y-4">
            <div className="relative">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden aspect-[4/3]">
                {hasImage ? (
                  <CertificateImage
                    imageUrl={certificate.imageUrl}
                    title={certificate.titulo}
                    fileName={certificate.fileName}
                    fileType={certificate.fileType}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Award className="h-20 w-20 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg text-gray-500 dark:text-gray-400 font-medium mb-2">
                        Certificado não disponível
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        Imagem do certificado não foi encontrada
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Botões de ação da imagem */}
              {hasImage && (
                <div className="flex justify-center mt-4 space-x-3">
                  <button
                    onClick={handleViewFullscreen}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <Eye className="h-4 w-4" />
                    <span>{isPDF ? 'Ver PDF Completo' : 'Visualizar'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Informações do Certificado */}
          <div className="space-y-6">
            {/* Informações básicas */}
            <div className="grid grid-cols-1 gap-6">
              {/* Local/Instituição */}
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Local</h3>
                  <p className="text-gray-600 dark:text-gray-300">{certificate.local}</p>
                  {certificate.certificadora && certificate.certificadora !== certificate.local && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Certificadora: {certificate.certificadora}
                    </p>
                  )}
                </div>
              </div>

              {/* Período */}
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Período</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {formatDate(certificate.dataInicio)} - {formatDate(certificate.dataTermino)}
                  </p>
                  {certificate.cargaHoraria && (
                    <p className="text-sm text-purple-600 dark:text-purple-400 mt-1 font-medium">
                      Carga horária: {certificate.cargaHoraria}
                    </p>
                  )}
                </div>
              </div>

              {/* Projeto Referente */}
              <div className="flex items-start space-x-3">
                <FolderOpen className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Projeto Referente</h3>
                  <p className="text-gray-600 dark:text-gray-300">{certificate.projetoReferente}</p>
                </div>
              </div>

              {/* Arquivo */}
              {certificate.fileName && (
                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Arquivo</h3>
                    <p className="text-gray-600 dark:text-gray-300 font-mono text-sm">
                      {certificate.fileName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Tipo: {certificate.fileType?.toUpperCase() || 'Desconhecido'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Estatísticas */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Informações Adicionais
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {certificate.dataInicio && certificate.dataTermino
                      ? Math.max(1, Math.ceil((new Date(certificate.dataTermino).getTime() - new Date(certificate.dataInicio).getTime()) / (1000 * 60 * 60 * 24)))
                      : 'N/A'
                    }
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Dias de Duração</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {certificate.dataTermino ? new Date(certificate.dataTermino).getFullYear() : 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ano de Conclusão</p>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Ações
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Botão Link do Projeto */}
                {certificate.linkProjeto && (
                  <button
                    onClick={handleProjectLink}
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Ver Projeto</span>
                  </button>
                )}
                
                {/* Botão Download */}
                {certificate.downloadUrl && (
                  <button
                    onClick={handleDownload}
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <Download className="h-4 w-4" />
                    <span>Baixar {isPDF ? 'PDF' : 'Certificado'}</span>
                  </button>
                )}

                {/* Botão Visualizar (quando não há download mas há imagem) */}
                {!certificate.downloadUrl && certificate.imageUrl && (
                  <button
                    onClick={handleViewFullscreen}
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium col-span-full"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Visualizar Certificado</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
