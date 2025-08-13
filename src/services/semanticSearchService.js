const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const kiloConfig = require('../../kilo.config');
const execAsync = promisify(exec);

class SemanticSearchService {
  constructor() {
    this.config = kiloConfig.semanticSearch;
    this.validateConfig();
  }

  validateConfig() {
    // Verifica se a collection foi definida corretamente
    if (!this.config.collection || this.config.collection === 'default') {
      throw new Error(
        'QDRANT_COLLECTION não está definida ou está usando valor padrão. ' +
        'Por favor, defina uma collection específica no .env'
      );
    }

    // Verifica se os caminhos dos scripts estão definidos
    if (!this.config.scripts) {
      throw new Error('Scripts não configurados no kilo.config.js');
    }

    const requiredScripts = ['kindex', 'ksearch', 'kread'];
    for (const script of requiredScripts) {
      if (!this.config.scripts[script]) {
        throw new Error(`Script ${script} não configurado no kilo.config.js`);
      }
    }
  }

  async indexFiles(root = this.config.indexRoot) {
    try {
      const scriptPath = path.resolve(this.config.scripts.kindex);
      const command = `bash ${scriptPath} ${root}`;
      
      console.log(`🔍 Indexando: ${root}`);
      console.log(`🔍 Usando collection: ${this.config.collection}`);
      
      const { stdout, stderr } = await execAsync(command);
      
      if (stderr) {
        console.error(`⚠️ Erro na indexação: ${stderr}`);
      }
      
      console.log('✅ Indexação concluída');
      return stdout;
    } catch (error) {
      console.error(`❌ Falha na indexação: ${error.message}`);
      throw new Error(`Falha na indexação dos arquivos: ${error.message}`);
    }
  }

  async search(query, options = {}) {
    try {
      const {
        limit = this.config.searchLimit,
        fileFilter,
        withSnippet = this.config.withSnippet,
        json = false
      } = options;

      let command = `bash ${path.resolve(this.config.scripts.ksearch)} "${query}" --limit ${limit}`;
      
      if (fileFilter) {
        command += ` --file "${fileFilter}"`;
      }
      
      if (!withSnippet) {
        command += ' --no-snippet';
      }
      
      if (json) {
        command += ' --json';
      }

      console.log(`🔎 Buscando: ${query}`);
      console.log(`🔎 Usando collection: ${this.config.collection}`);
      
      const { stdout, stderr } = await execAsync(command);
      
      if (stderr) {
        console.error(`⚠️ Erro na busca: ${stderr}`);
      }
      
      if (json) {
        try {
          return JSON.parse(stdout);
        } catch (parseError) {
          console.error(`❌ Erro ao parsear JSON: ${parseError.message}`);
          throw new Error('Resposta da busca em formato inválido');
        }
      }
      
      return stdout;
    } catch (error) {
      console.error(`❌ Falha na busca: ${error.message}`);
      throw new Error(`Falha na busca semântica: ${error.message}`);
    }
  }

  async readFile(filePath, mode = 'HEAD:200') {
    try {
      const scriptPath = path.resolve(this.config.scripts.kread);
      const command = `bash ${scriptPath} "${filePath}" ${mode}`;
      
      console.log(`📖 Lendo: ${filePath} (${mode})`);
      
      const { stdout, stderr } = await execAsync(command);
      
      if (stderr) {
        console.error(`⚠️ Erro na leitura: ${stderr}`);
      }
      
      return stdout;
    } catch (error) {
      console.error(`❌ Falha na leitura: ${error.message}`);
      throw new Error(`Falha na leitura do arquivo: ${error.message}`);
    }
  }

  async checkStatus() {
    try {
      // Verificar se a collection está definida
      if (!this.config.collection || this.config.collection === 'default') {
        throw new Error(
          'QDRANT_COLLECTION não está definida ou está usando valor padrão. ' +
          'Por favor, defina uma collection específica no .env'
        );
      }

      // Verificar Qdrant
      let qdrantStatus = 'Offline';
      try {
        const qdrantResponse = await fetch(`${this.config.qdrantUrl}/`);
        qdrantStatus = qdrantResponse.ok ? 'Online' : 'Offline';
      } catch (error) {
        console.error(`❌ Erro ao verificar Qdrant: ${error.message}`);
      }
      
      // Verificar Ollama
      let ollamaStatus = 'Offline';
      try {
        const ollamaResponse = await fetch(`${this.config.ollamaUrl}/api/tags`);
        ollamaStatus = ollamaResponse.ok ? 'Online' : 'Offline';
      } catch (error) {
        console.error(`❌ Erro ao verificar Ollama: ${error.message}`);
      }
      
      // Verificar se a collection existe
      let collectionExists = false;
      if (qdrantStatus === 'Online') {
        try {
          const collectionResponse = await fetch(
            `${this.config.qdrantUrl}/collections/${this.config.collection}`
          );
          collectionExists = collectionResponse.ok;
        } catch (error) {
          console.error(`❌ Erro ao verificar collection: ${error.message}`);
        }
      }
      
      return {
        qdrant: qdrantStatus,
        ollama: ollamaStatus,
        collection: this.config.collection,
        collectionExists,
        model: this.config.embedModel
      };
    } catch (error) {
      console.error(`❌ Falha ao verificar status: ${error.message}`);
      throw new Error(`Falha ao verificar status do sistema de busca: ${error.message}`);
    }
  }
}

module.exports = new SemanticSearchService();