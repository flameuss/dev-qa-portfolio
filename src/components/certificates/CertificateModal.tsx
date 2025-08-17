import React from 'react'
import { motion } from 'motion/react'
import { X } from 'lucide-react'
import { Certificate } from '@/services/drive/googleDriveService'
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-screen overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {certificate.titulo}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Local:</strong> {certificate.local}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Projeto:</strong> {certificate.projetoReferente}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Data:</strong> {certificate.dataTermino}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
