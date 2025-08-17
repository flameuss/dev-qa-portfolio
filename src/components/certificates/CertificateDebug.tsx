import React, { useState } from 'react'
import { googleDriveService } from '@/services/drive/googleDriveService'
import { Settings, TestTube, RefreshCw, Eye, EyeOff, Download, FileText, Image, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

interface TestResult {
  success: boolean
  message: string
  details?: any
  timestamp: string
}

interface DebugInfo {
  configuration?: TestResult
  files?: any[]
  certificates?: any[]
  images?: any[]
  matching?: any[]
  timestamp: string
}

const CertificateDebug: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<'config' | 'files' | 'certificates' | 'images' | 'matching'>('config')

  const runFullTest = async () => {
    setLoading(true)
    const timestamp = new Date().toLocaleString()
    
    try {
      console.log('🧪 Iniciando teste completo do Google Drive...')
      
      // 1. Testar configuração
      console.log('📋 1/5: Testando configuração...')
      const configTest = await googleDriveService.testConfiguration()
      
      // 2. Buscar arquivos
      console.log('📁 2/5: Buscando arquivos...')
      const files = await googleDriveService.getAllFiles()
      
      // 3. Buscar certificados
      console.log('📜 3/5: Buscando certificados...')
      const certificates = await googleDriveService.getCertificatesSheet()
      
      // 4. Buscar imagens
      console.log('🖼️ 4/5: Buscando imagens...')
      const images = await googleDriveService.getCertificateImages()
      
      // 5. Testar matching
      console.log('🔗 5/5: Testando matching...')
      const certificatesWithImages = await googleDriveService.getCertificatesWithImages()
      
      setDebugInfo({
        configuration: configTest,
        files,
        certificates,
        images,
        matching: certificatesWithImages,
        timestamp
      })

      setActiveTab('config')
      
    } catch (error: any) {
      console.error('❌ Erro no teste completo:', error)
      setDebugInfo({
        configuration: {
          success: false,
          message: `Erro no teste: ${error.message}`,
          timestamp
        },
        timestamp
      })
    } finally {
      setLoading(false)
    }
  }

  const clearCache = () => {
    googleDriveService.clearCache()
    setDebugInfo(null)
    console.log('🗑️ Cache limpo e debug resetado')
  }

  const downloadDebugLog = () => {
    if (!debugInfo) return
    
    const logData = JSON.stringify(debugInfo, null, 2)
    const blob = new Blob([logData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `google-drive-debug-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const renderConfigTab = () => {
    if (!debugInfo?.configuration) return null
    
    const config = debugInfo.configuration
    
    return (
      <div className="space-y-4">
        <div className={`flex items-center space-x-2 p-3 rounded-lg ${
          config.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {config.success ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
          <span className="font-medium">{config.message}</span>
        </div>
        
        {config.details && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Detalhes:</h4>
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs overflow-auto">
              {JSON.stringify(config.details, null, 2)}
            </pre>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>API Key:</strong> {import.meta.env.VITE_GOOGLE_DRIVE_API_KEY ? '✅ Configurada' : '❌ Não configurada'}
          </div>
          <div>
            <strong>Folder ID:</strong> {import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID ? '✅ Configurado' : '❌ Não configurado'}
          </div>
        </div>
      </div>
    )
  }

  const renderFilesTab = () => {
    if (!debugInfo?.files) return <div className="text-gray-500">Nenhum dado de arquivo disponível</div>
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Arquivos Encontrados ({debugInfo.files.length})</h4>
        </div>
        
        <div className="max-h-60 overflow-y-auto space-y-2">
          {debugInfo.files.map((file, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs">
              {file.mimeType?.startsWith('image/') ? (
                <Image className="h-4 w-4 text-blue-500" />
              ) : file.mimeType === 'application/pdf' ? (
                <FileText className="h-4 w-4 text-red-500" />
              ) : (
                <FileText className="h-4 w-4 text-gray-500" />
              )}
              <div className="flex-1">
                <div className="font-medium">{file.name}</div>
                <div className="text-gray-500">{file.mimeType}</div>
              </div>
              <div className="text-right">
                <div>{file.size ? `${Math.round(file.size / 1024)} KB` : 'N/A'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderCertificatesTab = () => {
    if (!debugInfo?.certificates) return <div className="text-gray-500">Nenhum dado de certificado disponível</div>
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Certificados Encontrados ({debugInfo.certificates.length})</h4>
        </div>
        
        <div className="max-h-60 overflow-y-auto space-y-2">
          {debugInfo.certificates.map((cert, index) => (
            <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded text-xs space-y-1">
              <div className="font-medium text-blue-600">{cert.titulo}</div>
              <div className="grid grid-cols-2 gap-2 text-gray-600">
                <div><strong>Local:</strong> {cert.local}</div>
                <div><strong>Status:</strong> {cert.status || 'N/A'}</div>
                <div><strong>Início:</strong> {cert.dataInicio}</div>
                <div><strong>Término:</strong> {cert.dataTermino}</div>
                <div><strong>Projeto:</strong> {cert.projetoReferente}</div>
                <div><strong>Carga H.:</strong> {cert.cargaHoraria || 'N/A'}</div>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <span>{cert.linkProjeto ? '🔗' : '❌'}</span>
                  <span>Link Projeto</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>{cert.certificado ? '📄' : '❌'}</span>
                  <span>Referência</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderImagesTab = () => {
    if (!debugInfo?.images) return <div className="text-gray-500">Nenhum dado de imagem disponível</div>
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Imagens Encontradas ({debugInfo.images.length})</h4>
        </div>
        
        <div className="max-h-60 overflow-y-auto space-y-2">
          {debugInfo.images.map((img, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs">
              <Image className="h-4 w-4 text-green-500" />
              <div className="flex-1">
                <div className="font-medium">{img.name}</div>
                <div className="text-gray-500">{img.mimeType}</div>
              </div>
              <div className="text-right">
                <div>{img.size ? `${Math.round(img.size / 1024)} KB` : 'N/A'}</div>
                <div className="text-gray-400">{img.id.substring(0, 8)}...</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderMatchingTab = () => {
    if (!debugInfo?.matching) return <div className="text-gray-500">Nenhum dado de matching disponível</div>
    
    const withImages = debugInfo.matching.filter(c => c.imageUrl).length
    const withoutImages = debugInfo.matching.length - withImages
    const matchRate = ((withImages / debugInfo.matching.length) * 100).toFixed(1)
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Resultado do Matching</h4>
          <div className="text-sm">
            <span className="text-green-600">{withImages} com imagem</span> / 
            <span className="text-red-600 ml-1">{withoutImages} sem imagem</span>
            <span className="text-gray-500 ml-1">({matchRate}%)</span>
          </div>
        </div>
        
        <div className="max-h-60 overflow-y-auto space-y-2">
          {debugInfo.matching.map((cert, index) => (
            <div key={index} className={`p-3 rounded text-xs space-y-1 ${
              cert.imageUrl ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
            }`}>
              <div className="flex items-center justify-between">
                <div className="font-medium">{cert.titulo.substring(0, 40)}...</div>
                <div className="flex items-center space-x-1">
                  {cert.imageUrl ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-green-600">Match</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-red-600">No Match</span>
                    </>
                  )}
                </div>
              </div>
              
              {cert.imageUrl && (
                <div className="space-y-1 text-gray-600">
                  <div><strong>Arquivo:</strong> {cert.fileName}</div>
                  <div><strong>Tipo:</strong> {cert.fileType}</div>
                  <div className="break-all"><strong>URL:</strong> {cert.imageUrl.substring(0, 60)}...</div>
                </div>
              )}
              
              <div className="text-gray-500">
                <strong>Campo Certificado:</strong> {cert.certificado || 'N/A'}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'config', label: 'Configuração', icon: Settings, content: renderConfigTab },
    { id: 'files', label: 'Arquivos', icon: FileText, content: renderFilesTab },
    { id: 'certificates', label: 'Certificados', icon: TestTube, content: renderCertificatesTab },
    { id: 'images', label: 'Imagens', icon: Image, content: renderImagesTab },
    { id: 'matching', label: 'Matching', icon: RefreshCw, content: renderMatchingTab }
  ]

  if (!isExpanded) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
        >
          <Settings className="h-4 w-4" />
          <span>Debug Drive</span>
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 w-96 max-h-96 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-blue-600" />
          <h3 className="font-bold text-lg">Google Drive Debug</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={runFullTest}
            disabled={loading}
            className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded text-sm transition-colors"
            title="Executar teste completo"
          >
            <TestTube className={`h-4 w-4 ${loading ? 'animate-pulse' : ''}`} />
            <span>{loading ? 'Testando...' : 'Testar'}</span>
          </button>
          
          {debugInfo && (
            <button
              onClick={downloadDebugLog}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
              title="Download do log de debug"
            >
              <Download className="h-4 w-4" />
            </button>
          )}
          
          <button
            onClick={clearCache}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
            title="Limpar cache"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
            title="Minimizar"
          >
            <EyeOff className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-1 px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <tab.icon className="h-3 w-3" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        {debugInfo ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-500 border-b pb-2">
              <span>Última atualização: {debugInfo.timestamp}</span>
            </div>
            
            {tabs.find(tab => tab.id === activeTab)?.content()}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <AlertCircle className="h-8 w-8 mb-2" />
            <p className="text-sm">Clique em "Testar" para iniciar o debug</p>
          </div>
        )}
      </div>

      {loading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg flex items-center space-x-3">
            <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
            <span>Executando testes...</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default CertificateDebug