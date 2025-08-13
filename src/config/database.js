module.exports = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER, // OBRIGATÓRIO - sem valor padrão
  password: process.env.DB_PASSWORD, // OBRIGATÓRIO - sem valor padrão
  database: process.env.DB_NAME, // OBRIGATÓRIO - sem valor padrão
  pool: {
    max: parseInt(process.env.DB_POOL_MAX) || 20,
    min: parseInt(process.env.DB_POOL_MIN) || 5,
    idle: parseInt(process.env.DB_POOL_IDLE) || 30000,
    acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 60000
  },
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  // Otimização de queries
  indexes: process.env.DB_INDEXES ? process.env.DB_INDEXES.split(',') : [],
  batch: {
    size: parseInt(process.env.DB_BATCH_SIZE) || 1000
  },
  // Timeout de conexão
  connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT) || 30000,
  // Logging de queries (apenas em desenvolvimento)
  logging: process.env.NODE_ENV === 'development'
};