require('dotenv').config();
const express = require('express');
const cacheConfig = require('./config/cache');
const dbConfig = require('./config/database');
const securityConfig = require('./config/security');
const loggingConfig = require('./config/logging');
const ErrorHandler = require('./utils/errorHandler');
const semanticSearchService = require('./services/semanticSearchService');

// Sistema Kilo Code próprio - sem dependências externas
class KiloCode {
  constructor() {
    this.config = null;
    this.cache = null;
    this.database = null;
    this.security = null;
    this.logger = null;
  }

  configure(config) {
    this.config = config;
    this.logger = this.createLogger(loggingConfig);
    this.security = this.createSecurity(securityConfig);
    this.cache = this.createCache(cacheConfig);
    this.database = this.createDatabase(dbConfig);
  }

  createLogger(config) {
    return {
      info: (msg) => console.log(`[INFO] ${msg}`),
      error: (msg) => console.error(`[ERROR] ${msg}`),
      warn: (msg) => console.warn(`[WARN] ${msg}`)
    };
  }

  createSecurity(config) {
    return {
      cors: () => (req, res, next) => {
        res.header('Access-Control-Allow-Origin', config.cors.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
      },
      rateLimit: () => {
        const requests = new Map();
        return (req, res, next) => {
          const ip = req.ip;
          const now = Date.now();
          const windowStart = now - (config.rateLimit.windowMs || 900000);
          
          if (!requests.has(ip)) {
            requests.set(ip, []);
          }
          
          const userRequests = requests.get(ip).filter(time => time > windowStart);
          requests.set(ip, userRequests);
          
          if (userRequests.length >= (config.rateLimit.max || 100)) {
            return res.status(429).json({ error: 'Too many requests' });
          }
          
          userRequests.push(now);
          next();
        };
      },
      helmet: () => (req, res, next) => {
        res.header('X-Content-Type-Options', 'nosniff');
        res.header('X-Frame-Options', 'DENY');
        res.header('X-XSS-Protection', '1; mode=block');
        next();
      }
    };
  }

  createCache(config) {
    // Cache simples em memória com fallback
    const cache = new Map();
    return {
      get: (key) => cache.get(key),
      set: (key, value, ttl = 3600) => {
        cache.set(key, value);
        setTimeout(() => cache.delete(key), ttl * 1000);
      },
      del: (key) => cache.delete(key),
      clear: () => cache.clear()
    };
  }

  createDatabase(config) {
    // Placeholder para configuração de banco de dados
    return {
      query: async (text, params) => {
        // Implementação básica - pode ser expandida
        return { rows: [], rowCount: 0 };
      }
    };
  }
}

// Inicialização do Kilo Code
const kiloCode = new KiloCode();
kiloCode.configure(require('../kilo.config'));

const app = express();

// Middlewares essenciais
app.use(express.json());
app.use(kiloCode.security.cors());
app.use(kiloCode.security.rateLimit());
app.use(kiloCode.security.helmet());

// Rotas do sistema de busca semântica
app.post('/semantic-search/index', async (req, res) => {
  try {
    const { root } = req.body;
    const result = await semanticSearchService.indexFiles(root);
    res.json({ success: true, message: 'Indexação concluída', result });
  } catch (error) {
    ErrorHandler.handle(error, req, res);
  }
});

app.post('/semantic-search/search', async (req, res) => {
  try {
    const { query, options } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query é obrigatória' });
    }
    const result = await semanticSearchService.search(query, options);
    res.json({ success: true, result });
  } catch (error) {
    ErrorHandler.handle(error, req, res);
  }
});

app.post('/semantic-search/read-file', async (req, res) => {
  try {
    const { filePath, mode } = req.body;
    if (!filePath) {
      return res.status(400).json({ error: 'filePath é obrigatório' });
    }
    const result = await semanticSearchService.readFile(filePath, mode);
    res.json({ success: true, content: result });
  } catch (error) {
    ErrorHandler.handle(error, req, res);
  }
});

app.get('/semantic-search/status', async (req, res) => {
  try {
    const status = await semanticSearchService.checkStatus();
    res.json({ success: true, status });
  } catch (error) {
    ErrorHandler.handle(error, req, res);
  }
});

// Middleware de erro
app.use(ErrorHandler.handle);

// Inicialização do servidor
const PORT = process.env.KILO_PORT || 3000;
app.listen(PORT, () => {
  kiloCode.logger.info(`Servidor rodando na porta ${PORT}`);
});