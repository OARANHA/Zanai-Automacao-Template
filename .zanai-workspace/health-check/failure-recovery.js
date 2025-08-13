#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');

setInterval(() => {
  try {
    // Verifica se o servidor está respondendo
    execSync('curl -f http://localhost:3000/health || true');
    
    // Verifica uso de memória
    const stats = fs.readFileSync('/proc/meminfo', 'utf8');
    const memMatch = stats.match(/MemAvailable:\s+(\d+)\s+kB/);
    
    if (memMatch && parseInt(memMatch[1]) < 100000) {
      console.log('⚠️  Memória baixa, reiniciando...');
      execSync('pm2 restart all');
    }
  } catch (error) {
    console.log('❌ Falha detectada, executando recovery...');
    execSync('./.killo-workspace/scripts/kilo-recover.sh');
  }
}, 30000); // Verifica a cada 30 segundos