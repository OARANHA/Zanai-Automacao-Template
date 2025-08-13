require('dotenv').config();

module.exports = {
  env: process.env.KILO_ENV || 'development',
  port: process.env.KILO_PORT || 3000,
  resources: {
    maxWorkers: parseInt(process.env.KILO_MAX_WORKERS) || 4,
    memoryLimit: process.env.KILO_MEMORY_LIMIT || '2GB',
    autoScale: process.env.AUTO_SCALE === 'true'
  },
  // Configurações do sistema de busca semântica
  semanticSearch: {
    qdrantUrl: process.env.QDRANT_URL || 'http://localhost:6333',
    ollamaUrl: process.env.OLLAMA_URL || 'http://localhost:11434',
    embedModel: process.env.EMBED_MODEL || 'bge-m3',
    collection: process.env.QDRANT_COLLECTION || '',
    embedPayload: process.env.EMBED_PAYLOAD || 'auto',
    indexRoot: process.env.INDEX_ROOT || '.',
    batch: parseInt(process.env.BATCH) || 64,
    chunkSize: parseInt(process.env.CHUNK_SIZE) || 1200,
    chunkOverlap: parseInt(process.env.CHUNK_OVERLAP) || 200,
    maxFileMB: parseFloat(process.env.MAX_FILE_MB) || 1.5,
    maxCharsFile: parseInt(process.env.MAX_CHARS_FILE) || 200000,
    searchLimit: parseInt(process.env.SEARCH_LIMIT) || 8,
    withSnippet: process.env.WITH_SNIPPET === '1',
    // Configurações dos scripts
    scripts: {
      kindex: './scripts/kindex-fast.sh',
      ksearch: './scripts/ksearch.sh',
      kread: './scripts/kread.sh',
      indexModule: './scripts/index_simple_fast.mjs',
      searchModule: './scripts/search_repo.mjs'
    }
  }
};