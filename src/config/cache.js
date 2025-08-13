module.exports = {
  driver: 'redis', // Usando o mesmo Redis do seu sistema
  options: {
    host: process.env.CACHE_HOST || 'localhost',
    port: process.env.CACHE_PORT || 6379,
    ttl: parseInt(process.env.CACHE_TTL) || 3600,
    retryDelayOnFailover: 100,
    enableReadyCheck: true
  },
  levels: ['memory', 'redis'], // Cache hierárquico
  // Configurações específicas para dashboards
  dashboard: {
    kpiData: {
      ttl: 300, // 5 minutos para dados de KPI
      staleWhileRevalidate: 60
    },
    chartData: {
      ttl: 900, // 15 minutos para gráficos
      compress: true
    }
  }
};