import React from 'react'
import { motion } from 'motion/react'
import { Calendar, MapPin, FolderOpen, Award, ExternalLink, Download, Clock } from 'lucide-react'
import { Certificate } from '@/services/drive/googleDriveService'
import { CertificateImage } from './CertificateImage'
import { StatusBadge, Badge } from '@/components/ui'

interface CertificateCardProps {
  certificate: Certificate
  onClick: () => void
  index: number
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  onClick,
  index
}) => {
  // Configuração de status badge
  const statusConfig = React.useMemo(() => {
    const status = certificate.status || 'ativo'
    
    switch (status.toLowerCase()) {
      case 'ativo':
      case 'completo':
      case 'complete':
        return {
          label: 'Ativo',
          bg: 'bg-green-100 dark:bg-green-900/30',
          color: 'text-green-700 dark:text-green-300',
          icon: 'CheckCircle'
        }
      case 'em_andamento':
      case 'em andamento':
      case 'andamento':
        return {
          label: 'Em Andamento',
          bg: 'bg-yellow-100 dark:bg-yellow-900/30',
          color: 'text-yellow-700 dark:text-yellow-300',
          icon: 'Clock'
        }
      case 'expirado':
      case 'expired':
      case 'vencido':
        return {
          label: 'Expirado',
          bg: 'bg-red-100 dark:bg-red-900/30',
          color: 'text-red-700 dark:text-red-300',
          icon: 'XCircle'
        }
      default:
        return {
          label: 'N/A',
          bg: 'bg-gray-100 dark:bg-gray-700/30',
          color: 'text-gray-600 dark:text-gray-400',
          icon: 'Info'
        }
    }
  }, [certificate.status])
  
  // Ícone de status dinâmico
  const StatusIcon = React.useMemo(() => {
    switch (statusConfig.icon) {
      case 'CheckCircle':
        return () => <div className="w-3 h-3 rounded-full bg-current" />
      case 'Clock':
        return Clock
      case 'XCircle':
        return () => <div className="w-3 h-3 rounded-full bg-current" />
      default:
        return () => <div className="w-3 h-3 rounded-full bg-current" />
    }
  }, [statusConfig.icon])
  
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    
    console.log('🗺 Formatando data:', dateString)
    
    try {
      // Se já está no formato ISO (YYYY-MM-DD)
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        const date = new Date(dateString + 'T00:00:00')
        if (!isNaN(date.getTime())) {
          const formatted = date.toLocaleDateString('pt-BR', { 
            month: 'short', 
            year: 'numeric' 
          })
          console.log('  ✅ Formatado (ISO):', formatted)
          return formatted
        }
      }
      
      // Se está no formato DD/MM/YYYY
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
        const [day, month, year] = dateString.split('/')
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
        if (!isNaN(date.getTime())) {
          const formatted = date.toLocaleDateString('pt-BR', { 
            month: 'short', 
            year: 'numeric' 
          })
          console.log('  ✅ Formatado (DD/MM/YYYY):', formatted)
          return formatted
        }
      }
      
      // Tentar parsing genérico
      const date = new Date(dateString)
      if (!isNaN(date.getTime())) {
        const formatted = date.toLocaleDateString('pt-BR', { 
          month: 'short', 
          year: 'numeric' 
        })
        console.log('  ✅ Formatado (genérico):', formatted)
        return formatted
      }
      
      console.warn('  ⚠️ Data inválida, retornando original:', dateString)
      return dateString
      
    } catch (error) {
      console.error('  ❌ Erro ao formatar data:', error)
      return dateString
    }
  }

  const handleProjectLink = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (certificate.linkProjeto) {
      window.open(certificate.linkProjeto, '_blank', 'noopener,noreferrer')
    }
  }

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (certificate.downloadUrl) {
      const link = document.createElement('a')
      link.href = certificate.downloadUrl
      link.download = certificate.fileName || `${certificate.certificado || 'certificado'}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -2, scale: 1.005 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 certificate-card-height flex flex-col overflow-hidden group"
      onClick={onClick}
    >
      {/* Header com badges - altura fixa */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center space-x-2">
          <Award className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full whitespace-nowrap">
            Certificado
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Badge de Status - SEMPRE VISÍVEL */}
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${statusConfig.bg} min-w-0`}>
            <StatusIcon className={`h-3 w-3 ${statusConfig.color} flex-shrink-0`} />
            <span className={`font-medium ${statusConfig.color} whitespace-nowrap`}>
              {statusConfig.label}
            </span>
          </div>
          
          {/* Ano */}
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {certificate.dataTermino ? new Date(certificate.dataTermino).getFullYear() : 'N/A'}
          </div>
        </div>
      </div>

      {/* Imagem do certificado - altura fixa */}
      <div className="mx-4 mb-3 h-32 flex-shrink-0">
        <CertificateImage
          imageUrl={certificate.imageUrl}
          title={certificate.titulo}
          fileName={certificate.fileName || certificate.certificado}
          fileType={certificate.fileType}
          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Conteúdo principal - área flexível */}
      <div className="px-4 flex-1 flex flex-col">
        {/* Título com altura fixa e truncamento */}
        <div className="mb-3">
          <h3 className="font-bold text-base text-gray-900 dark:text-white leading-tight">
            <span 
              className="block overflow-hidden text-ellipsis whitespace-nowrap"
              title={certificate.titulo}
            >
              {certificate.titulo}
            </span>
          </h3>
        </div>

        {/* Informações - área flexível */}
        <div className="space-y-2 flex-1">
          {/* Local/Certificadora */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate" title={certificate.certificadora || certificate.local}>
              {certificate.certificadora || certificate.local}
            </span>
          </div>

          {/* Data */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="text-xs">
              {formatDate(certificate.dataInicio)} - {formatDate(certificate.dataTermino)}
            </span>
          </div>

          {/* Projeto Referente */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <FolderOpen className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate text-xs" title={certificate.projetoReferente}>
              {certificate.projetoReferente}
            </span>
          </div>

          {/* Carga Horária (sempre exibir se disponível) */}
          {certificate.cargaHoraria && (
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <Clock className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                {certificate.cargaHoraria}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer com botões - altura fixa */}
      <div className="mt-auto p-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 flex-1">
            Ver detalhes
          </span>
          
          <div className="flex items-center space-x-1.5">
            {/* Botão Link do Projeto */}
            {certificate.linkProjeto && (
              <button
                onClick={handleProjectLink}
                className="flex items-center space-x-1 px-2 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded text-xs transition-colors hover:scale-105"
                title="Ver projeto relacionado"
              >
                <ExternalLink className="h-3 w-3" />
                <span className="hidden sm:inline">Projeto</span>
              </button>
            )}
            
            {/* Botão Download - PADRONIZADO para sempre mostrar "Baixar" */}
            {certificate.downloadUrl && (
              <button
                onClick={handleDownload}
                className="flex items-center space-x-1 px-2 py-1 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 rounded text-xs transition-colors hover:scale-105"
                title={`Baixar certificado ${certificate.fileType === 'pdf' ? '(PDF)' : '(Imagem)'}`}
              >
                <Download className="h-3 w-3" />
                <span className="hidden sm:inline">Baixar</span>
              </button>
            )}
            
            {/* Indicador de disponibilidade */}
            <div className={`w-1.5 h-1.5 rounded-full ${
              certificate.imageUrl 
                ? 'bg-green-400 animate-pulse' 
                : 'bg-gray-400'
            }`} title={certificate.imageUrl ? 'Certificado disponível' : 'Certificado não encontrado'}></div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}