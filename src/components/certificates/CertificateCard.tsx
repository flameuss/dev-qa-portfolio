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
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Award className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-600">Certificado</span>
        </div>
        
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${statusConfig.bg}`}>
          <StatusIcon className={`h-3 w-3 ${statusConfig.color}`} />
          <span className={`font-medium ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
        </div>
      </div>
      
      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
        {certificate.titulo}
      </h3>
      
      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4" />
          <span>{certificate.local}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>{certificate.dataTermino}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <FolderOpen className="h-4 w-4" />
          <span>{certificate.projetoReferente}</span>
        </div>
      </div>
    </motion.div>
  )
}
