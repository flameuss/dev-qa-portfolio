import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Award, RefreshCw, Search, Filter, Trash2 } from 'lucide-react'
import { useCertificates } from '../hooks/useCertificates'
import { CertificateCard } from '../components/certificates/CertificateCard'
import { CertificateModal } from '../components/certificates/CertificateModal'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { Certificate } from '../services/drive/googleDriveService'

const Certificates: React.FC = () => {
  const { certificates, loading, error, refreshCertificates, clearCacheAndRefresh } = useCertificates()
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'local'>('date')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isClearingCache, setIsClearingCache] = useState(false)

  // Filtrar e ordenar certificados
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
        {/* Header */}
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

        {/* Estatísticas */}
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

        {/* Controles de busca e filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              {/* Campo de busca */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar certificados..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filtro de ordenação */}
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'local')}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="date">Data (mais recente)</option>
                  <option value="title">Título (A-Z)</option>
                  <option value="local">Local (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="flex space-x-2">
              <button
                onClick={handleClearCacheAndRefresh}
                disabled={isClearingCache || isRefreshing}
                className="flex items-center space-x-2 px-3 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors text-sm"
                title="Limpar cache e forçar atualização da planilha"
              >
                <Trash2 className={`h-4 w-4 ${isClearingCache ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{isClearingCache ? 'Limpando...' : 'Limpar Cache'}</span>
              </button>
              
              <button
                onClick={handleRefresh}
                disabled={isRefreshing || isClearingCache}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Atualizar</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Lista de certificados */}
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
              {searchTerm ? 'Nenhum certificado encontrado' : 'Nenhum certificado disponível'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {searchTerm 
                ? 'Tente ajustar os filtros de busca'
                : 'Configure a integração com Google Drive para ver os certificados'
              }
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedCertificates.map((certificate, index) => (
              <CertificateCard
                key={`${certificate.certificado}-${certificate.titulo}`}
                certificate={certificate}
                onClick={() => handleCertificateClick(certificate)}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Modal de certificado */}
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

      {/* Debug removido conforme solicitado */}
    </div>
  )
}

export default Certificates
