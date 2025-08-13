const redis = require('redis');
const { promisify } = require('util');
const NodeCache = require('node-cache');
const cacheConfig = require('../config/cache');

class CacheService {
  constructor() {
    // Cache em memória para dados críticos
    this.memoryCache = new NodeCache({
      stdTTL: 60,
      checkperiod: 120
    });

    // Cache Redis para dados persistentes
    this.redisClient = redis.createClient({
      host: cacheConfig.options.host,
      port: cacheConfig.options.port
    });

    this.redisGet = promisify(this.redisClient.get).bind(this.redisClient);
    this.redisSet = promisify(this.redisClient.set).bind(this.redisClient);
  }

  // Método unificado com fallback automático
  async get(key, options = {}) {
    const { useMemory = true, useRedis = true, ...opts } = options;
    
    // 1. Tenta cache em memória
    if (useMemory) {
      const memoryData = this.memoryCache.get(key);
      if (memoryData !== undefined) return memoryData;
    }

    // 2. Tenta Redis
    if (useRedis) {
      try {
        const redisData = await this.redisGet(key);
        if (redisData !== null) {
          const parsed = JSON.parse(redisData);
          // Armazena em memória para próximas requisições
          if (useMemory) this.memoryCache.set(key, parsed);
          return parsed;
        }
      } catch (error) {
        console.error('Redis error:', error);
      }
    }

    return null;
  }

  // Método unificado para setar
  async set(key, value, options = {}) {
    const { ttl = cacheConfig.options.ttl, useMemory = true, useRedis = true } = options;
    
    // 1. Armazena em memória
    if (useMemory) {
      this.memoryCache.set(key, value, ttl);
    }

    // 2. Armazena no Redis
    if (useRedis) {
      try {
        await this.redisSet(key, JSON.stringify(value), 'EX', ttl);
      } catch (error) {
        console.error('Redis error:', error);
      }
    }
  }

  // Métodos específicos para dashboards
  async getKpiData(dashboardId) {
    return this.get(`kpi:${dashboardId}`, {
      ttl: cacheConfig.dashboard.kpiData.ttl
    });
  }

  async setKpiData(dashboardId, data) {
    return this.set(`kpi:${dashboardId}`, data, {
      ttl: cacheConfig.dashboard.kpiData.ttl
    });
  }

  async getChartData(chartId) {
    return this.get(`chart:${chartId}`, {
      ttl: cacheConfig.dashboard.chartData.ttl
    });
  }

  async setChartData(chartId, data) {
    return this.set(`chart:${chartId}`, data, {
      ttl: cacheConfig.dashboard.chartData.ttl
    });
  }
}

module.exports = new CacheService();