module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET, // REMOVIDO valor padrão - OBRIGATÓRIO
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    algorithm: 'HS256'
  },
  encryption: {
    key: process.env.ENCRYPTION_KEY, // REMOVIDO valor padrão - OBRIGATÓRIO
    algorithm: 'aes-256-cbc'
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: process.env.RATE_LIMIT_MAX || 100, // Limite de requisições
    skipSuccessfulRequests: false
  },
  cors: {
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
  },
  helmet: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"]
      }
    }
  }
};