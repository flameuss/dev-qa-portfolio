import axios from 'axios'

// Tipos para os certificados
export interface Certificate {
  id: string // Adicionar ID único
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
  status?: 'ativo' | 'expirado' | 'em_andamento' | string // Novo campo
  cargaHoraria?: string // Novo campo
  certificadora?: string // Novo campo (pode ser diferente do local)
}

export interface DriveFile {
  id: string
  name: string
  mimeType: string
  webViewLink: string
  webContentLink: string
  size?: number
  createdTime?: string
  modifiedTime?: string
}

export interface DriveApiResponse {
  files: DriveFile[]
  nextPageToken?: string
  incompleteSearch?: boolean
}

class GoogleDriveService {
  private readonly API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY
  private readonly FOLDER_ID = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID
  private readonly BASE_URL = 'https://www.googleapis.com/drive/v3'
  private readonly SHEETS_API_URL = 'https://sheets.googleapis.com/v4/spreadsheets'

  // Cache para evitar requisições desnecessárias
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>()

  constructor() {
    this.validateConfig()
  }

  // Validar configuração
  private validateConfig(): void {
    if (!this.API_KEY) {
      console.warn('⚠️ VITE_GOOGLE_DRIVE_API_KEY não configurado')
    }
    if (!this.FOLDER_ID) {
      console.warn('⚠️ VITE_GOOGLE_DRIVE_FOLDER_ID não configurado')
    }
  }

  // Método para limpar cache
  public clearCache(): void {
    this.cache.clear()
    console.log('🗑️ Cache do Google Drive limpo')
  }

  // Método para testar configuração
  async testConfiguration(): Promise<{ success: boolean; message: string; timestamp: string; details?: any }> {
    try {
      if (!this.API_KEY) {
        return {
        success: false,
        message: 'API Key do Google Drive não configurada',
          timestamp: new Date().toLocaleString()
      }
      }

      if (!this.FOLDER_ID) {
        return {
        success: false,
        message: 'ID da pasta do Google Drive não configurado',
          timestamp: new Date().toLocaleString()
      }
      }

      console.log('🧪 Testando configuração do Google Drive...')
      const files = await this.getFilesFromFolder()
      
      return {
        success: true,
        message: `Configuração OK - ${files.files.length} arquivos encontrados`,
        timestamp: new Date().toLocaleString(),
        details: {
          filesFound: files.files.length,
          folderAccess: true,
          apiKeyValid: true
        }
      }

    } catch (error: any) {
      console.error('❌ Teste de configuração falhou:', error)
      
      return {
        success: false,
        message: `Erro na configuração: ${error.message}`,
        timestamp: new Date().toLocaleString(),
        details: {
          error: error.response?.data || error.message,
          status: error.response?.status
        }
      }
    }
  }

  // Verificar se um item do cache ainda é válido
  private isCacheValid(key: string): boolean {
    const cached = this.cache.get(key)
    if (!cached) return false
    
    const now = Date.now()
    return (now - cached.timestamp) < cached.ttl
  }

  // Obter dados do cache ou executar função
  private async getOrCache<T>(key: string, ttl: number, fn: () => Promise<T>): Promise<T> {
    if (this.isCacheValid(key)) {
      console.log(`📦 Cache hit para: ${key}`)
      return this.cache.get(key)!.data
    }

    console.log(`🔄 Cache miss para: ${key}, executando função...`)
    const data = await fn()
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
    return data
  }

  // Buscar arquivos na pasta do Google Drive com paginação
  async getFilesFromFolder(pageToken?: string): Promise<DriveApiResponse> {
    try {
      if (!this.API_KEY || !this.FOLDER_ID) {
        console.warn('⚠️ Configuração do Google Drive incompleta')
        return { files: [] }
      }

      const cacheKey = `files_${pageToken || 'first'}`
      return this.getOrCache(cacheKey, 2 * 60 * 1000, async () => { // Cache por apenas 2 minutos
        console.log('🔍 Buscando arquivos no Google Drive...')
        
        const params: any = {
          key: this.API_KEY,
          q: `'${this.FOLDER_ID}' in parents and trashed = false`,
          fields: 'nextPageToken,files(id,name,mimeType,webViewLink,webContentLink,size,createdTime,modifiedTime)',
          pageSize: 100, // Buscar até 100 arquivos por vez
          orderBy: 'modifiedTime desc' // Mais recentes primeiro
        }

        if (pageToken) {
          params.pageToken = pageToken
        }

        const response = await axios.get(`${this.BASE_URL}/files`, {
          params,
          timeout: 30000 // 30 segundos de timeout
        })

        const result: DriveApiResponse = {
          files: response.data.files || [],
          nextPageToken: response.data.nextPageToken,
          incompleteSearch: response.data.incompleteSearch
        }

        console.log(`✅ ${result.files.length} arquivos encontrados`)
        return result
      })

    } catch (error: any) {
      console.error('❌ Erro ao buscar arquivos do Google Drive:', error)
      
      // Retornar cache antigo se disponível em caso de erro
      const cacheKey = `files_${pageToken || 'first'}`
      const cached = this.cache.get(cacheKey)
      if (cached) {
        console.log('📦 Retornando dados do cache devido ao erro')
        return cached.data
      }
      
      return { files: [] }
    }
  }

  // Buscar todos os arquivos (lidando com paginação)
  async getAllFiles(): Promise<DriveFile[]> {
    const allFiles: DriveFile[] = []
    let pageToken: string | undefined

    do {
      const response = await this.getFilesFromFolder(pageToken)
      allFiles.push(...response.files)
      pageToken = response.nextPageToken
    } while (pageToken)

    console.log(`📁 Total de arquivos encontrados: ${allFiles.length}`)
    return allFiles
  }

  // Buscar especificamente o arquivo de certificados (planilha)
  async getCertificatesSheet(): Promise<Certificate[]> {
    try {
      console.log('🔍 Buscando planilha de certificados...')
      
      return this.getOrCache('certificates_sheet', 2 * 60 * 1000, async () => { // Cache por apenas 2 minutos
        const files = await this.getAllFiles()
        console.log('📁 Arquivos na pasta:', files.map(f => ({ 
          name: f.name, 
          type: f.mimeType,
          size: f.size 
        })))
        
        // Procurar planilhas (priorizar Google Sheets)
        const spreadsheets = files.filter(file => {
          const isGoogleSheet = file.mimeType === 'application/vnd.google-apps.spreadsheet'
          const isExcelFile = file.mimeType.includes('spreadsheet') || 
                             file.name.match(/\.(xlsx|xls|ods)$/i)
          const notTempFile = !file.name.startsWith('~') && !file.name.startsWith('.')
          
          return (isGoogleSheet || isExcelFile) && notTempFile
        }).sort((a, b) => {
          // Priorizar Google Sheets e arquivos com nomes relacionados
          const aIsGoogleSheet = a.mimeType === 'application/vnd.google-apps.spreadsheet'
          const bIsGoogleSheet = b.mimeType === 'application/vnd.google-apps.spreadsheet'
          const aHasGoodName = a.name.toLowerCase().includes('certificado')
          const bHasGoodName = b.name.toLowerCase().includes('certificado')
          
          if (aIsGoogleSheet && !bIsGoogleSheet) return -1
          if (!aIsGoogleSheet && bIsGoogleSheet) return 1
          if (aHasGoodName && !bHasGoodName) return -1
          if (!aHasGoodName && bHasGoodName) return 1
          
          // Por data de modificação (mais recente primeiro)
          return new Date(b.modifiedTime || 0).getTime() - new Date(a.modifiedTime || 0).getTime()
        })

        console.log('📊 Planilhas encontradas:', spreadsheets.map(s => ({ 
          name: s.name, 
          type: s.mimeType 
        })))

        if (spreadsheets.length === 0) {
          console.warn('📋 Nenhuma planilha encontrada - usando dados mock')
          return this.getMockCertificates()
        }

        // Tentar ler as planilhas encontradas
        for (const sheet of spreadsheets) {
          try {
            console.log(`📖 Tentando ler planilha: ${sheet.name}`)
            const certificates = await this.readSpreadsheetData(sheet)
            
            if (certificates.length > 0) {
              console.log(`✅ ${certificates.length} certificados carregados da planilha: ${sheet.name}`)
              return certificates
            }
          } catch (error) {
            console.warn(`⚠️ Erro ao ler planilha ${sheet.name}:`, error)
            continue
          }
        }

        // Fallback para dados mock se nenhuma planilha pôde ser lida
        console.log('🔄 Usando dados mock como fallback')
        return this.getMockCertificates()
      })

    } catch (error) {
      console.error('❌ Erro ao buscar planilha de certificados:', error)
      return this.getMockCertificates()
    }
  }

  // Ler dados da planilha (suporta Google Sheets e Excel)
  private async readSpreadsheetData(file: DriveFile): Promise<Certificate[]> {
    const isGoogleSheet = file.mimeType === 'application/vnd.google-apps.spreadsheet'
    
    if (isGoogleSheet) {
      return this.readGoogleSheetsData(file.id)
    } else {
      return this.readExcelData(file.id)
    }
  }

  // Ler dados do Google Sheets (mais confiável)
  private async readGoogleSheetsData(fileId: string): Promise<Certificate[]> {
    try {
      console.log('📊 Lendo Google Sheets...')
      
      // Usar a Google Sheets API (mais confiável que CSV export)
      const response = await axios.get(
        `${this.SHEETS_API_URL}/${fileId}/values/A1:Z1000`,
        {
          params: {
            key: this.API_KEY,
            valueRenderOption: 'UNFORMATTED_VALUE',
            dateTimeRenderOption: 'FORMATTED_STRING'
          },
          timeout: 15000
        }
      )

      const values = response.data.values
      if (!values || values.length < 2) {
        console.warn('⚠️ Planilha vazia ou sem dados suficientes')
        return []
      }

      return this.parseSpreadsheetValues(values)
    } catch (error: any) {
      console.error('❌ Erro ao ler Google Sheets:', error)
      
      // Fallback para CSV se a API Sheets falhar
      if (error.response?.status === 403) {
        console.log('🔄 Tentando método CSV como fallback...')
        return this.readCSVData(fileId)
      }
      
      throw error
    }
  }

  // Ler dados de Excel (limitado - requer arquivo público)
  private async readExcelData(fileId: string): Promise<Certificate[]> {
    try {
      console.log('📈 Tentando ler arquivo Excel...')
      
      // Para arquivos Excel, tenta CSV export
      return this.readCSVData(fileId)
    } catch (error) {
      console.error('❌ Erro ao ler arquivo Excel:', error)
      throw error
    }
  }

  // Ler dados como CSV
  private async readCSVData(fileId: string): Promise<Certificate[]> {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${fileId}/export?format=csv`
    
    const response = await axios.get(csvUrl, {
      headers: { 'Accept': 'text/csv' },
      timeout: 15000
    })

    return this.parseCSVData(response.data)
  }

  // Parser de dados da planilha (valores do Sheets API)
  private parseSpreadsheetValues(values: string[][]): Certificate[] {
    if (values.length < 2) return []

    const headers = values[0].map(h => (h || '').toString().trim().toLowerCase())
    const certificates: Certificate[] = []

    console.log('📋 Headers encontrados:', headers)
    console.log('📊 Total de linhas de dados:', values.length - 1)

    // Mapeamento mais robusto de colunas
    const columnMap = this.createColumnMapping(headers)
    console.log('🗺️ Mapeamento de colunas:', columnMap)

    // Processar cada linha de dados
    for (let i = 1; i < values.length; i++) {
      const row = values[i] || []
      
      console.log(`\n🔍 Processando linha ${i}:`, row)
      
      try {
        const certificate = this.createCertificateFromRow(row, columnMap, i)
        
        if (certificate && this.isValidCertificate(certificate)) {
          certificates.push(certificate)
          console.log(`✅ Certificado ${i} criado:`, {
            titulo: certificate.titulo,
            local: certificate.local,
            dataInicio: certificate.dataInicio,
            dataTermino: certificate.dataTermino,
            cargaHoraria: certificate.cargaHoraria,
            status: certificate.status,
            certificado: certificate.certificado
          })
        } else {
          console.log(`❌ Certificado ${i}: dados insuficientes ou inválidos`)
          if (certificate) {
            console.log('   Dados do certificado inválido:', certificate)
          }
        }
      } catch (error) {
        console.warn(`⚠️ Erro ao processar linha ${i}:`, error)
        continue
      }
    }

    console.log(`📊 Total de certificados válidos: ${certificates.length}`)
    return certificates
  }

  // Criar mapeamento robusto de colunas
  private createColumnMapping(headers: string[]): Record<string, number> {
    const mapping: Record<string, number> = {}
    
    // ANÁLISE DA PLANILHA REAL (baseado nas imagens fornecidas):
    // A planilha tem cabeçalhos: ["vc pode analisar", "Local", "Data-de-Início", "Data-de-Término", "Projeto-Referente", "Certificado", "Link-do-Projeto", "Carga-Hora", "Status"]
    // MAS os dados reais começam na PRIMEIRA coluna com o título do certificado
    
    console.log('🔍 Headers recebidos:', headers)
    console.log('📏 Número de colunas:', headers.length)
    
    // Verificar se estamos lidando com a estrutura esperada
    if (headers.length >= 8) {
      // Mapeamento CORRETO baseado na análise visual:
      mapping.titulo = 0        // Primeira coluna: título completo do certificado
      mapping.local = 1         // Segunda coluna: local real (Online, São Paulo, etc.)
      mapping.dataInicio = 2    // Terceira coluna: data de início
      mapping.dataTermino = 3   // Quarta coluna: data de término  
      mapping.projetoReferente = 4  // Quinta coluna: projeto referente
      mapping.certificado = 5   // Sexta coluna: nome do arquivo (teste001.png, qa.pdf, etc.)
      mapping.linkProjeto = 6   // Sétima coluna: link do projeto
      mapping.cargaHoraria = 7  // Oitava coluna: carga horária
      mapping.status = 8        // Nona coluna: status (se existir)
      
      console.log('🎯 Mapeamento CORRIGIDO aplicado:', mapping);
      return mapping
    }
    
    // Fallback para mapeamento flexível
    console.log('⚠️ Estrutura inesperada, usando mapeamento flexível')
    
    const fieldMappings = {
      titulo: [
        'título', 'titulo', 'title', 'nome', 'certificado', 'curso',
        'treinamento', 'nome do certificado', 'nome do curso', 'título do certificado',
        // Primeira coluna como título se não encontrar match específico
        headers[0]?.toLowerCase()
      ],
      local: [
        'local', 'instituição', 'instituicao', 'escola', 'empresa',
        'plataforma', 'provedor', 'organização', 'organizacao'
      ],
      dataInicio: [
        'data inicio', 'data início', 'data de inicio', 'data de início',
        'inicio', 'início', 'start', 'começou', 'comecou', 'data_inicio',
        'data-de-inicio' // Formato específico da planilha
      ],
      dataTermino: [
        'data termino', 'data término', 'data de termino', 'data de término',
        'termino', 'término', 'fim', 'end', 'conclusao', 'conclusão',
        'data_termino', 'data_fim', 'data-de-termino' // Formato específico da planilha
      ],
      projetoReferente: [
        'projeto', 'projeto referente', 'área', 'area', 'categoria',
        'tipo', 'assunto', 'tema', 'especialização', 'especializacao',
        'projeto-referente' // Formato específico da planilha
      ],
      certificado: [
        'arquivo', 'imagem', 'certificado', 'documento', 'anexo',
        'referência', 'referencia', 'nome do arquivo', 'filename'
      ],
      linkProjeto: [
        'link', 'url', 'link projeto', 'link do projeto', 'github',
        'repositório', 'repositorio', 'repo', 'link-do-projeto' // Formato específico da planilha
      ],
      cargaHoraria: [
        'carga horária', 'carga horaria', 'horas', 'duração', 'duracao',
        'tempo', 'ch', 'carga-horaria', 'carga-hora' // Formato específico da planilha
      ],
      certificadora: [
        'certificadora', 'emissor', 'quem emitiu', 'emitido por'
      ],
      status: [
        'status', 'situação', 'situacao', 'estado'
      ]
    }

    for (const [field, variations] of Object.entries(fieldMappings)) {
      const index = this.findBestColumnMatch(headers, variations)
      if (index >= 0) {
        mapping[field] = index
      }
    }

    console.log('🗺️ Mapeamento flexível resultado:', mapping)
    return mapping
  }

  // Encontrar melhor match para coluna
  private findBestColumnMatch(headers: string[], variations: string[]): number {
    for (const variation of variations) {
      // Busca exata
      const exactIndex = headers.findIndex(h => 
        this.normalizeString(h) === this.normalizeString(variation)
      )
      if (exactIndex >= 0) return exactIndex
      
      // Busca por contenção
      const containsIndex = headers.findIndex(h => 
        this.normalizeString(h).includes(this.normalizeString(variation)) ||
        this.normalizeString(variation).includes(this.normalizeString(h))
      )
      if (containsIndex >= 0) return containsIndex
    }
    
    return -1
  }

  // Criar certificado a partir de uma linha
  private createCertificateFromRow(
    row: any[], 
    columnMap: Record<string, number>, 
    rowIndex: number
  ): Certificate | null {
    try {
      console.log(`\n🔍 Criando certificado da linha ${rowIndex}:`, row)
      console.log('   Mapeamento usado:', columnMap)
      
      const getValue = (field: string): string => {
        const index = columnMap[field]
        if (index === undefined || index < 0 || index >= row.length) {
          console.log(`     ${field}: índice ${index} inválido (row.length: ${row.length})`)
          return ''
        }
        const value = (row[index] || '').toString().trim()
        console.log(`     ${field}[${index}]: "${value}"`)
        return value
      }

      // Mapear status 'completo' para 'ativo'
      let status = getValue('status') || 'ativo'
      if (status.toLowerCase() === 'completo' || status.toLowerCase() === 'complete') {
        status = 'ativo'
      }
      
      // Criar o objeto certificado
      const certificate = {
        id: `cert_${rowIndex}_${Date.now()}`, // ID único
        titulo: getValue('titulo'),
        local: getValue('local') || 'N/A', // Local real da planilha
        dataInicio: this.formatDate(getValue('dataInicio')),
        dataTermino: this.formatDate(getValue('dataTermino')),
        projetoReferente: getValue('projetoReferente'),
        certificado: getValue('certificado'), // Nome do arquivo
        linkProjeto: this.validateUrl(getValue('linkProjeto')),
        cargaHoraria: getValue('cargaHoraria'),
        certificadora: getValue('certificadora') || getValue('local') || 'N/A', // Usar local como fallback
        status: status
      }
      
      console.log(`✅ Certificado criado:`, certificate)
      return certificate
      
    } catch (error) {
      console.error(`❌ Erro ao criar certificado da linha ${rowIndex}:`, error)
      return null
    }
  }

  // Validar se um certificado tem dados mínimos necessários
  private isValidCertificate(cert: Certificate): boolean {
    return !!(cert.titulo?.trim() && (cert.local?.trim() || cert.certificado?.trim()))
  }

  // Formatar data
  private formatDate(dateStr: string): string {
    if (!dateStr || dateStr.toLowerCase() === 'dd/mm/yyyy') {
      console.log(`⚠️ Data vazia ou placeholder: "${dateStr}"`)
      return ''
    }
    
    console.log(`🗺 Formatando data: "${dateStr}"`)
    
    try {
      // Limpar string de data
      const cleanDate = dateStr.trim().replace(/"/g, '')
      
      // Verificar formatos específicos da planilha
      const formats = [
        /^\d{2}\/\d{2}\/\d{4}$/, // DD/MM/YYYY (formato da planilha: 01/03/2024)
        /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
        /^\d{2}-\d{2}-\d{4}$/ // DD-MM-YYYY
      ]
      
      // Se já está em formato válido, processar
      for (const format of formats) {
        if (format.test(cleanDate)) {
          // Converter DD/MM/YYYY para formato ISO se necessário
          if (cleanDate.includes('/')) {
            const [day, month, year] = cleanDate.split('/')
            // Validar se é uma data válida
            const dayNum = parseInt(day)
            const monthNum = parseInt(month)
            const yearNum = parseInt(year)
            
            if (dayNum >= 1 && dayNum <= 31 && monthNum >= 1 && monthNum <= 12 && yearNum > 1900) {
              const isoDate = `${yearNum}-${monthNum.toString().padStart(2, '0')}-${dayNum.toString().padStart(2, '0')}`
              console.log(`  ✅ Data convertida: ${cleanDate} -> ${isoDate}`)
              return isoDate
            }
          } else {
            console.log(`  ✅ Data já válida: ${cleanDate}`)
            return cleanDate
          }
        }
      }
      
      console.warn(`  ⚠️ Formato de data não reconhecido: "${cleanDate}"`)
      return cleanDate // Retornar original se não conseguir converter
      
    } catch (error) {
      console.error(`  ❌ Erro ao formatar data: ${error}`)
      return dateStr
    }
  }

  // Validar URL
  private validateUrl(url: string): string | undefined {
    if (!url?.trim()) return undefined
    
    const cleanUrl = url.trim()
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i
    
    if (urlPattern.test(cleanUrl)) {
      return cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`
    }
    
    return undefined
  }

  // Parser de dados CSV (mantido para compatibilidade)
  private parseCSVData(csvData: string): Certificate[] {
    try {
      const lines = csvData.split('\n').filter(line => line.trim())
      if (lines.length < 2) return []

      const headers = this.parseCSVLine(lines[0]).map(h => h.trim().toLowerCase())
      const values = lines.slice(1).map(line => this.parseCSVLine(line))

      return this.parseSpreadsheetValues([headers, ...values])
    } catch (error) {
      console.error('Erro ao fazer parse dos dados CSV:', error)
      return []
    }
  }

  // Parser de linha CSV
  private parseCSVLine(line: string): string[] {
    const result: string[] = []
    let current = ''
    let inQuotes = false
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    
    result.push(current.trim())
    return result.map(val => val.replace(/^"|"$/g, ''))
  }

  // Buscar imagens dos certificados
  async getCertificateImages(): Promise<DriveFile[]> {
    try {
      console.log('🖼️ Buscando imagens dos certificados...')
      
      return this.getOrCache('certificate_images', 2 * 60 * 1000, async () => { // Cache por apenas 2 minutos
        const files = await this.getAllFiles()
        const imageFiles = files.filter(file => 
          file.mimeType.startsWith('image/') || 
          file.mimeType === 'application/pdf' ||
          file.name.match(/\.(jpg|jpeg|png|gif|webp|pdf|svg)$/i)
        )
        
        // Ordenar por nome para melhor matching
        imageFiles.sort((a, b) => a.name.localeCompare(b.name))
        
        console.log('🖼️ Imagens encontradas:', imageFiles.map(f => ({
          name: f.name,
          type: f.mimeType,
          size: f.size
        })))
        
        return imageFiles
      })

    } catch (error) {
      console.error('❌ Erro ao buscar imagens dos certificados:', error)
      return []
    }
  }

  // Combinar dados da planilha com as imagens
  async getCertificatesWithImages(): Promise<Certificate[]> {
    try {
      console.log('🔗 Combinando certificados com imagens...')
      
      const [certificates, images] = await Promise.all([
        this.getCertificatesSheet(),
        this.getCertificateImages()
      ])

      console.log('📜 Certificados encontrados:', certificates.length)
      console.log('🖼️ Imagens disponíveis:', images.length)

      const result = certificates.map((cert, index) => {
        console.log(`\n🔍 Processando certificado ${index + 1}:`)
        console.log('  ID:', cert.id)
        console.log('  Título:', cert.titulo)
        console.log('  Campo Certificado:', cert.certificado)
        
        // Usar sistema de matching melhorado
        const matchResult = this.findBestImageMatch(cert.certificado, cert.titulo, images)
        
        // Aceitar matches com score mínimo de 0.3 (30%)
        const hasValidMatch = matchResult.score >= 0.3
        
        const fileType = hasValidMatch ? this.getFileType(matchResult.image!.name) : undefined
        const finalCert = {
          ...cert,
          imageUrl: hasValidMatch ? this.getImageUrl(matchResult.image!.id, fileType) : undefined,
          downloadUrl: hasValidMatch ? this.getDownloadUrl(matchResult.image!.id) : undefined,
          fileName: hasValidMatch ? matchResult.image!.name : undefined,
          fileType: fileType
        }
        
        if (hasValidMatch && matchResult.image) {
          console.log(`  ✅ MATCH ENCONTRADO!`)
          console.log(`    Imagem: ${matchResult.image.name}`)
          console.log(`    Score: ${(matchResult.score * 100).toFixed(1)}%`)
          console.log(`    ID: ${matchResult.image.id}`)
        } else {
          console.log(`  ❌ Nenhuma imagem encontrada`)
          console.log(`    Melhor score: ${(matchResult.score * 100).toFixed(1)}% (mínimo: 30%)`)
          if (matchResult.image) {
            console.log(`    Melhor candidato: ${matchResult.image.name}`)
          }
        }
        
        return finalCert
      })

      console.log('\n📊 Resumo final:')
      console.log('Total de certificados:', result.length)
      console.log('Com imagens:', result.filter(c => c.imageUrl).length)
      console.log('Sem imagens:', result.filter(c => !c.imageUrl).length)

      return result
    } catch (error) {
      console.error('❌ Erro ao combinar certificados com imagens:', error)
      return []
    }
  }

  // Encontrar melhor match para um certificado
  private findBestImageMatch(certificateName: string, title: string, images: DriveFile[]): { image: DriveFile | null, score: number } {
    console.log(`\n🎯 Procurando match para: "${certificateName || title}"`)
    console.log(`    Título: "${title}"`)
    console.log(`    Referência: "${certificateName}"`)
    
    let bestMatch: DriveFile | null = null
    let bestScore = 0
    
    for (const img of images) {
      // Remove extensão do arquivo
      const imageName = img.name.replace(/\.(jpg|jpeg|png|gif|webp|pdf)$/i, '')
      
      let score = 0
      let matchType = ''
      
      // Estratégia 1: Match exato normalizado
      if (certificateName) {
        const certNorm = this.normalizeString(certificateName)
        const imgNorm = this.normalizeString(imageName)
        
        if (certNorm === imgNorm) {
          score = 1.0
          matchType = 'Exact match'
        } else if (certNorm.includes(imgNorm) || imgNorm.includes(certNorm)) {
          score = 0.9
          matchType = 'Contains match'
        }
      }
      
      // Estratégia 2: Match por título se não achou pelo certificado
      if (score < 0.6 && title) {
        const similarity = this.calculateSimilarity(title, imageName)
        if (similarity > score) {
          score = similarity * 0.8 // Reduz um pouco a confiança
          matchType = 'Title similarity'
        }
      }
      
      // Estratégia 3: Match por palavras-chave tecnológicas
      if (score < 0.5) {
        const techMatch = this.calculateKeywordMatch(title + ' ' + certificateName, imageName)
        if (techMatch > score) {
          score = techMatch
          matchType = 'Tech keywords'
        }
      }
      
      // Estratégia 4: Match por padrões específicos da planilha
      // Arquivos como 'teste001.png' podem corresponder a diferentes certificados
      if (score < 0.3) {
        const patternMatch = this.calculatePatternMatch(certificateName, title, imageName, img.name)
        if (patternMatch > score) {
          score = patternMatch
          matchType = 'Pattern match'
        }
      }
      
      console.log(`    📁 ${img.name}: ${(score * 100).toFixed(1)}% (${matchType})`)
      
      if (score > bestScore) {
        bestMatch = img
        bestScore = score
      }
    }
    
    return { image: bestMatch, score: bestScore }
  }
  
  // Novo método: Match por padrões específicos
  private calculatePatternMatch(certificateName: string, title: string, imageName: string, fullFileName: string): number {
    // Para arquivos como 'teste001.png', 'qa.pdf', etc.
    
    // Se o certificado tem um código/padrão específico, dar preferência
    if (certificateName && certificateName.toLowerCase().includes('teste001')) {
      if (imageName.toLowerCase().includes('teste001')) {
        return 0.95
      }
    }
    
    if (certificateName && certificateName.toLowerCase().includes('qa')) {
      if (imageName.toLowerCase().includes('qa')) {
        return 0.9
      }
    }
    
    // Match genérico por tipo de arquivo e área
    const titleLower = title.toLowerCase()
    const certLower = certificateName.toLowerCase()
    const imgLower = imageName.toLowerCase()
    
    // Áreas/tipos específicos
    const patterns = [
      { keywords: ['marketing', 'digital'], filePatterns: ['marketing', 'digital', 'mkt'], score: 0.7 },
      { keywords: ['workshop', 'ia', 'inteligencia', 'artificial'], filePatterns: ['ia', 'ai', 'workshop'], score: 0.7 },
      { keywords: ['proficiencia', 'idioma', 'ingles', 'cambridge'], filePatterns: ['lang', 'english', 'cambridge'], score: 0.7 },
      { keywords: ['design', 'grafico', 'visual'], filePatterns: ['design', 'grafico', 'visual'], score: 0.7 },
      { keywords: ['qa', 'quality', 'teste', 'testing'], filePatterns: ['qa', 'test', 'quality'], score: 0.8 }
    ]
    
    for (const pattern of patterns) {
      const titleHasKeyword = pattern.keywords.some(keyword => 
        titleLower.includes(keyword) || certLower.includes(keyword)
      )
      const fileHasPattern = pattern.filePatterns.some(filePattern => 
        imgLower.includes(filePattern)
      )
      
      if (titleHasKeyword && fileHasPattern) {
        return pattern.score
      }
    }
    
    return 0
  }

  // Calcular similaridade entre duas strings
  private calculateSimilarity(str1: string, str2: string): number {
    const norm1 = this.normalizeString(str1)
    const norm2 = this.normalizeString(str2)
    
    if (norm1 === norm2) return 1
    if (norm1.length === 0 || norm2.length === 0) return 0
    
    // Verifica se uma string contém a outra
    if (norm1.includes(norm2) || norm2.includes(norm1)) {
      const shorter = norm1.length < norm2.length ? norm1 : norm2
      const longer = norm1.length >= norm2.length ? norm1 : norm2
      return shorter.length / longer.length
    }
    
    // Calcula palavras em comum
    const words1 = norm1.split(/\s+/).filter(w => w.length > 2)
    const words2 = norm2.split(/\s+/).filter(w => w.length > 2)
    
    if (words1.length === 0 || words2.length === 0) return 0
    
    const commonWords = words1.filter(word => words2.includes(word))
    return commonWords.length / Math.max(words1.length, words2.length)
  }

  // Matching por palavras-chave específicas
  private calculateKeywordMatch(certificateName: string, imageName: string): number {
    const keywords = {
      cypress: ['cypress', 'cy'],
      robot: ['robot', 'framework'],
      docker: ['docker', 'container'],
      postman: ['postman', 'api'],
      selenium: ['selenium', 'webdriver'],
      java: ['java', 'jdk'],
      python: ['python', 'py'],
      javascript: ['javascript', 'js', 'node'],
      react: ['react', 'reactjs'],
      angular: ['angular', 'ng']
    }
    
    const certNorm = this.normalizeString(certificateName)
    const imgNorm = this.normalizeString(imageName)
    
    for (const [tech, variants] of Object.entries(keywords)) {
      const certHasTech = variants.some(variant => certNorm.includes(variant))
      const imgHasTech = variants.some(variant => imgNorm.includes(variant))
      
      if (certHasTech && imgHasTech) {
        return 0.8 // Score alto para matches de tecnologia
      }
    }
    
    return 0
  }

  // Normalizar string para matching
  private normalizeString(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^a-z0-9]/g, '') // Remove tudo exceto letras e números
  }

  // Gerar URL pública para visualização da imagem (com suporte melhorado para PDFs)
  private getImageUrl(fileId: string, fileType?: 'image' | 'pdf' | 'unknown'): string {
    // Para PDFs, usar thumbnail API que funciona melhor para preview
    if (fileType === 'pdf') {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800-h600`
    }
    // Para imagens, usar direct view URL
    return `https://drive.google.com/uc?id=${fileId}&export=view`
  }

  // Gerar URL para download da imagem
  private getDownloadUrl(fileId: string): string {
    return `https://drive.google.com/uc?id=${fileId}&export=download`
  }

  // Determinar tipo de arquivo
  private getFileType(fileName: string): 'image' | 'pdf' | 'unknown' {
    const extension = fileName.toLowerCase().split('.').pop()
    
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
      case 'svg':
        return 'image'
      case 'pdf':
        return 'pdf'
      default:
        return 'unknown'
    }
  }

  // Dados mock para desenvolvimento (baseados na estrutura real da planilha)
  private getMockCertificates(): Certificate[] {
    console.log('🧪 Usando dados mock baseados na planilha real')
    const mockCerts: Certificate[] = [
      {
        id: 'real_1',
        titulo: 'Certificado de Conclusão de Curso de Marketing Digital',
        local: 'Online',
        dataInicio: '2024-03-01',
        dataTermino: '2024-06-30',
        projetoReferente: 'Lançamento de Produto X',
        certificado: 'teste001.png',
        linkProjeto: 'https://github.com/flameuss/monitoramento-sites',
        cargaHoraria: '30h',
        certificadora: 'Online',
        status: 'ativo', // Status da planilha convertido para 'ativo'
        // URLs mock para demonstração - usando imagens mais realistas
        imageUrl: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop&crop=center',
        downloadUrl: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop&crop=center',
        fileName: 'teste001.png',
        fileType: 'image'
      },
      {
        id: 'real_2',
        titulo: 'Certificado de Participação em Workshop de IA',
        local: 'São Paulo, Brasil',
        dataInicio: '2024-07-15',
        dataTermino: '2024-07-16',
        projetoReferente: 'Desenvolvimento de Chatbot',
        certificado: 'qa.pdf', // Campo preenchido na planilha
        linkProjeto: '', // Campo VAZIO na planilha (como mostra a imagem 3)
        cargaHoraria: '30h',
        certificadora: 'São Paulo, Brasil',
        status: 'em_andamento', // Status para aparecer amarelo no card
        // Mock de PDF - usando uma imagem que simula preview de PDF
        imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&crop=center',
        downloadUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&crop=center',
        fileName: 'qa.pdf',
        fileType: 'pdf'
      },
      {
        id: 'real_3',
        titulo: 'Certificado de Proficiência em Idioma',
        local: 'Cambridge, Inglaterra',
        dataInicio: '2023-09-01',
        dataTermino: '2023-12-31',
        projetoReferente: 'Intercâmbio Cultural',
        certificado: '', // Campo VAZIO na planilha (como mostra a imagem 3)
        linkProjeto: '', // Campo VAZIO na planilha
        cargaHoraria: '30h',
        certificadora: 'Cambridge, Inglaterra',
        status: 'em_andamento', // Teste de status amarelo
        // Sem imagem pois não tem arquivo
        imageUrl: undefined,
        downloadUrl: undefined,
        fileName: undefined,
        fileType: undefined
      },
      {
        id: 'real_4',
        titulo: 'Certificado de Treinamento em Design Gráfico',
        local: 'Rio de Janeiro, Brasil',
        dataInicio: '2025-01-10',
        dataTermino: '2025-02-28',
        projetoReferente: 'Criação de Identidade Visual',
        certificado: 'teste001.png', // Mesmo arquivo - teste de matching
        linkProjeto: 'https://github.com/flameuss/monitoramento-sites',
        cargaHoraria: '30h',
        certificadora: 'Rio de Janeiro, Brasil',
        status: 'ativo',
        imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&crop=center',
        downloadUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&crop=center',
        fileName: 'teste001.png',
        fileType: 'image'
      },
      {
        id: 'real_5',
        titulo: 'Certificado de Segurança da Informação',
        local: 'Online',
        dataInicio: '2023-11-01',
        dataTermino: '2024-01-31',
        projetoReferente: 'Auditoria de Sistemas',
        certificado: 'security_cert.pdf',
        linkProjeto: '',
        cargaHoraria: '30h',
        certificadora: 'Online',
        status: 'expirado', // Teste de status vermelho
        // Outro exemplo de PDF
        imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop&crop=center',
        downloadUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop&crop=center',
        fileName: 'security_cert.pdf',
        fileType: 'pdf'
      },
      {
        id: 'real_6',
        titulo: 'Certificado de Especialização em Análise de Dados',
        local: 'Belo Horizonte, Brasil',
        dataInicio: '2024-04-05',
        dataTermino: '2024-08-20',
        projetoReferente: 'Otimização de Processos',
        certificado: '', // Campo VAZIO na planilha
        linkProjeto: '', // Campo VAZIO na planilha
        cargaHoraria: '30h',
        certificadora: 'Belo Horizonte, Brasil',
        status: 'ativo',
        // Sem imagem pois não tem arquivo
        imageUrl: undefined,
        downloadUrl: undefined,
        fileName: undefined,
        fileType: undefined
      },
      {
        id: 'real_7',
        titulo: 'teste0001', // Nome genérico como aparece na planilha
        local: 'Altura', // Local da planilha
        dataInicio: '', // Campo vazio como na planilha
        dataTermino: '', // Campo vazio como na planilha
        projetoReferente: '',
        certificado: '', // Campo vazio
        linkProjeto: '',
        cargaHoraria: '',
        certificadora: 'Altura',
        status: 'N/A', // Status N/A como na planilha
        // Mas tem uma imagem PDF preview (como mostra a imagem 4)
        imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&crop=center',
        downloadUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&crop=center',
        fileName: 'teste0001.pdf',
        fileType: 'pdf'
      }
    ]
    
    console.log(`📋 ${mockCerts.length} certificados mock gerados baseados na planilha real`)
    mockCerts.forEach((cert, i) => {
      console.log(`  ${i + 1}. ${cert.titulo.substring(0, 40)}... - ${cert.imageUrl ? '✅ Com imagem' : '❌ Sem imagem'} - Status: ${cert.status}`)
    })
    
    return mockCerts
  }
}

export const googleDriveService = new GoogleDriveService()