module.exports = {
  level: process.env.KILO_ENV === 'production' ? 'warn' : 'debug',
  format: 'json', // Logs em JSON para fácil análise
  transports: [
    {
      type: 'file',
      filename: 'logs/error.log',
      level: 'error'
    },
    {
      type: 'file',
      filename: 'logs/combined.log'
    }
  ]
};