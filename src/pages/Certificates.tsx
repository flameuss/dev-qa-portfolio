import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Award, RefreshCw, Search, Filter, Trash2 } from 'lucide-react'
import { useCertificates } from '@/hooks/useCertificates'
import { CertificateCard } from '@/components/certificates/CertificateCard'
import { CertificateModal } from '@/components/certificates/CertificateModal'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Certificate } from '@/services/drive/googleDriveService'

const Certificates: React.FC = () => {
  const { certificates, loading, error, refreshCertificates, clearCacheAndRefresh } = useCertificates()
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'local'>('date')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isClearingCache, setIsClearingCache] = useState(false)

  const filteredAndSortedCertificates = certificates
    .filter(cert =>
      cert.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.local.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.projetoReferente.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.dataTermino).getTime() - new Date(a.dataTermino).getTime()
        case 'title':
          return a.titulo.localeCompare(b.titulo)
        case 'local':
          return a.local.localeCompare(b.local)
        default:
          return 0
      }
    })

  const handleCertificateClick = (certificate: Certificate) => {
    setSelectedCertificate(certificate)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCertificate(null)
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshCertificates()
    setIsRefreshing(false)
  }

  const handleClearCacheAndRefresh = async () => {
    setIsClearingCache(true)
    await clearCacheAndRefresh()
    setIsClearingCache(false)
  }

  const getCertificateStats = () => {
    const totalCerts = certificates.length
    const uniqueLocals = new Set(certificates.map(cert => cert.local)).size
    const currentYear = new Date().getFullYear()
    const thisYearCerts = certificates.filter(cert => 
      new Date(cert.dataTermino).getFullYear() === currentYear
    ).length

    return { totalCerts, uniqueLocals, thisYearCerts }
  }

  const { totalCerts, uniqueLocals, thisYearCerts } = getCertificateStats()

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 py-12 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Certificados
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Minhas conquistas e certificações na área de tecnologia e QA
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {totalCerts}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Total de Certificados
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {uniqueLocals}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Instituições Diferentes
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {thisYearCerts}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Certificados em {new Date().getFullYear()}
            </div>
          </div>
        </motion.div>

        {error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-red-600 dark:text-red-400 text-lg mb-4">
              {error}
            </div>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Tentar novamente
            </button>
          </motion.div>
        ) : filteredAndSortedCertificates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'Nenhum certificado encontrado' : 'Página em desenvolvimento'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {searchTerm 
                ? 'Tente ajustar os filtros de busca'
                : 'Funcionalidade de certificados será ativada em breve'
              }
            </p>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">
              Funcionalidade em desenvolvimento
            </p>
          </div>
        )}

        <AnimatePresence>
          {isModalOpen && (
            <CertificateModal
              certificate={selectedCertificate}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Certificates
