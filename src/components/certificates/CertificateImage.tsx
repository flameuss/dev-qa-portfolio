import React, { useState, useEffect } from 'react'
import { Award, FileText, Image as ImageIcon, AlertCircle, Eye, Download } from 'lucide-react'

interface CertificateImageProps {
  imageUrl?: string
  title: string
  fileName?: string
  fileType?: 'image' | 'pdf' | 'unknown'
  fileId?: string
  className?: string
}

export const CertificateImage: React.FC<CertificateImageProps> = ({
  imageUrl,
  title,
  fileName,
  fileType,
  fileId,
  className = ''
}) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading')
  const [currentUrl, setCurrentUrl] = useState<string | undefined>(imageUrl)
  const [imageError, setImageError] = useState<string | undefined>(undefined)

  // Extract file ID from various Google Drive URL formats
  const extractFileId = (url: string | undefined): string | undefined => {
    if (!url) return undefined
    
    const patterns = [
      /\/d\/([a-zA-Z0-9-_]+)/,
      /id=([a-zA-Z0-9-_]+)/,
      /\/file\/d\/([a-zA-Z0-9-_]+)/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    
    return undefined
  }

  // Generate multiple URL variations for better compatibility
  const generateImageUrls = (originalUrl: string, detectedFileId?: string): string[] => {
    const id = detectedFileId || extractFileId(originalUrl) || fileId || ''
    
    if (!id) return [originalUrl]

    return [
      // Original URL
      originalUrl,
      // Direct view URL
      `https://drive.google.com/uc?id=${id}&export=view`,
      // Thumbnail URL (good for PDFs)
      `https://drive.google.com/thumbnail?id=${id}&sz=w800-h600`,
      // Alternative direct URL
      `https://lh3.googleusercontent.com/d/${id}`,
      // Backup thumbnail with different size
      `https://drive.google.com/thumbnail?id=${id}&sz=w600-h400`,
      // Force download URL as last resort
      `https://drive.google.com/uc?id=${id}&export=download`
    ]
  }

  // Generate PDF preview URL
  const generatePDFPreviewUrl = (originalUrl: string, detectedFileId?: string): string => {
    const id = detectedFileId || extractFileId(originalUrl) || fileId || ''
    
    if (!id) return originalUrl
    
    // For PDFs, try thumbnail first as it works better for preview
    return `https://drive.google.com/thumbnail?id=${id}&sz=w800-h600`
  }

  // Try alternative URLs in sequence
  const tryAlternativeUrl = async (urls: string[], index = 0): Promise<void> => {
    if (index >= urls.length) {
      setImageStatus('error')
      setImageError('Todas as tentativas de carregamento falharam')
      return
    }

    const url = urls[index]
    
    return new Promise<void>((resolve) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = () => {
        console.log(`✅ Imagem carregada com sucesso (tentativa ${index + 1}):`, url)
        setCurrentUrl(url)
        setImageStatus('loaded')
        setImageError(undefined)
        resolve()
      }
      
      img.onerror = () => {
        console.warn(`❌ Falha na tentativa ${index + 1}:`, url)
        tryAlternativeUrl(urls, index + 1).then(resolve)
      }
      
      img.src = url
    })
  }

  // Initialize loading when imageUrl changes
  useEffect(() => {
    if (!imageUrl) {
      setImageStatus('error')
      return
    }

    setImageStatus('loading')
    setImageError(undefined)

    const detectedFileId = extractFileId(imageUrl)
    
    if (fileType === 'pdf') {
      // For PDFs, try to get thumbnail preview
      const pdfPreviewUrl = generatePDFPreviewUrl(imageUrl, detectedFileId)
      tryAlternativeUrl([pdfPreviewUrl, ...generateImageUrls(imageUrl, detectedFileId)])
    } else {
      // For images, try multiple URL formats
      const urls = generateImageUrls(imageUrl, detectedFileId)
      tryAlternativeUrl(urls)
    }
  }, [imageUrl, fileType, fileId])

  const handleRetry = () => {
    if (imageUrl) {
      setImageStatus('loading')
      setImageError(undefined)
      
      const detectedFileId = extractFileId(imageUrl)
      const urls = generateImageUrls(imageUrl, detectedFileId)
      tryAlternativeUrl(urls)
    }
  }

  const handleImageLoad = () => {
    setImageStatus('loaded')
    setImageError(undefined)
  }

  const handleImageError = (error: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('❌ Erro final ao carregar imagem:', currentUrl, error)
    setImageStatus('error')
    setImageError(`Erro ao carregar: ${currentUrl}`)
  }

  const isPDF = fileType === 'pdf' || (fileName && fileName.toLowerCase().endsWith('.pdf'))
  const isImage = fileType === 'image' || (fileName && /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName))

  if (!imageUrl && !currentUrl) {
    return (
      <div className={`bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden ${className}`}>
        <div className="text-center z-10">
          <Award className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Certificado</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">Imagem não disponível</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-50"></div>
      </div>
    )
  }

  return (
    <div className={`bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative group ${className}`}>
      {/* Loading State */}
      {imageStatus === 'loading' && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse flex flex-col items-center justify-center z-20">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
          <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Carregando...</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {isPDF ? 'Preview do PDF' : 'Imagem do certificado'}
          </div>
        </div>
      )}

      {/* PDF Overlay */}
      {isPDF && imageStatus === 'loaded' && (
        <div className="absolute top-2 right-2 z-30">
          <div className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold shadow-lg flex items-center space-x-1">
            <FileText className="h-3 w-3" />
            <span>PDF</span>
          </div>
        </div>
      )}

      {/* Success State - Image Display */}
      {imageStatus !== 'error' && currentUrl && (
        <img
          src={currentUrl}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageStatus === 'loaded' ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } group-hover:scale-110`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      )}

      {/* Error State */}
      {imageStatus === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30">
          <AlertCircle className="h-12 w-12 text-red-500 dark:text-red-400 mb-3" />
          <p className="text-sm text-red-600 dark:text-red-400 text-center px-3 font-medium mb-2">
            Erro ao carregar {isPDF ? 'preview do PDF' : 'imagem'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center px-3 mb-3">
            {fileName || 'Arquivo do certificado'}
          </p>
          <button
            onClick={handleRetry}
            className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md transition-colors font-medium flex items-center space-x-1"
          >
            <Eye className="h-3 w-3" />
            <span>Tentar novamente</span>
          </button>
        </div>
      )}

      {/* Hover Overlay - REMOVIDO o botão ampliar, mantendo apenas o efeito hover */}
      {imageStatus === 'loaded' && (
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
        </div>
      )}

      {/* Fallback for unknown file types */}
      {!isPDF && !isImage && imageStatus !== 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
          <Award className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-2" />
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center font-medium">Certificado</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-1">{fileName}</p>
        </div>
      )}
    </div>
  )
}
