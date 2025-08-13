#!/usr/bin/env node
/**
 * Sistema de Verificação de Segurança
 * Verifica vulnerabilidades e configurações inseguras
 */

const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

class SecurityCheck {
  constructor() {
    this.issues = [];
    this.recommendations = [];
    this.severityLevels = {
      critical: '🚨 CRÍTICO',
      high: '⚠️  ALTO',
      medium: '⚡ MÉDIO',
      low: 'ℹ️  BAIXO'
    };
  }

  async run() {
    console.log('🔒 Kilo Code - Verificação de Segurança');
    console.log('====================================');
    
    try {
      await this.checkEnvironmentVariables();
      await this.checkConfigurationFiles();
      await this.checkScriptsSecurity();
      await this.checkDependencies();
      await this.checkFilePermissions();
      await this.checkNetworkSecurity();
      await this.generateSecurityReport();
      
      console.log('\n✅ Verificação de segurança concluída!');
    } catch (error) {
      console.error('\n❌ Erro durante verificação de segurança:', error.message);
    }
  }

  async checkEnvironmentVariables() {
    console.log('🔍 Verificando variáveis de ambiente...');
    
    try {
      const envContent = await fs.readFile('.env', 'utf8');
      const envLines = envContent.split('\n');
      
      // Verificar variáveis críticas
      const criticalVars = ['JWT_SECRET', 'ENCRYPTION_KEY', 'DB_PASSWORD'];
      
      for (const line of envLines) {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith('#')) {
          const [key, value] = trimmedLine.split('=');
          
          if (criticalVars.includes(key)) {
            if (!value || value === '""' || value === "''") {
              this.addIssue('critical', `Variável crítica vazia: ${key}`);
              this.addRecommendation(`Defina um valor seguro para ${key}`);
            } else if (this.isDefaultValue(value)) {
              this.addIssue('high', `Variável crítica com valor padrão: ${key}`);
              this.addRecommendation(`Altere o valor padrão de ${key} para um valor seguro`);
            } else if (this.isWeakValue(value)) {
              this.addIssue('high', `Variável crítica com valor fraco: ${key}`);
              this.addRecommendation(`Use um valor mais forte para ${key} (mínimo 32 caracteres)`);
            }
          }
        }
      }
      
      // Verificar se QDRANT_COLLECTION está configurada
      if (!envContent.includes('QDRANT_COLLECTION=') || envContent.includes('QDRANT_COLLECTION=')) {
        this.addIssue('medium', 'QDRANT_COLLECTION não está definida');
        this.addRecommendation('Defina um nome único para sua collection no Qdrant');
      }
      
    } catch (error) {
      this.addIssue('medium', 'Arquivo .env não encontrado');
      this.addRecommendation('Crie um arquivo .env com as variáveis necessárias');
    }
  }

  async checkConfigurationFiles() {
    console.log('🔍 Verificando arquivos de configuração...');
    
    // Verificar security.js
    try {
      const securityConfig = require('../src/config/security');
      
      if (securityConfig.jwt?.secret === 'chave_super_secreta_12345') {
        this.addIssue('critical', 'Chave JWT padrão em security.js');
        this.addRecommendation('Remova valores padrão do arquivo de configuração');
      }
      
      if (securityConfig.encryption?.key === 'chave_de_criptografia_67890') {
        this.addIssue('critical', 'Chave de criptografia padrão em security.js');
        this.addRecommendation('Remova valores padrão do arquivo de configuração');
      }
      
    } catch (error) {
      this.addIssue('low', 'Arquivo de configuração de segurança não encontrado');
    }
    
    // Verificar database.js
    try {
      const dbConfig = require('../src/config/database');
      
      if (dbConfig.password === 'senha_segura') {
        this.addIssue('critical', 'Senha de banco de dados padrão');
        this.addRecommendation('Remova valores padrão do arquivo de configuração');
      }
      
    } catch (error) {
      this.addIssue('low', 'Arquivo de configuração de banco não encontrado');
    }
  }

  async checkScriptsSecurity() {
    console.log('🔍 Verificando segurança dos scripts...');
    
    const scripts = [
      'scripts/kindex-fast.sh',
      'scripts/ksearch.sh',
      'scripts/kread.sh'
    ];
    
    for (const script of scripts) {
      try {
        const content = await fs.readFile(script, 'utf8');
        
        // Verificar se usa export $(cat .env | xargs) - inseguro
        if (content.includes('export $(cat .env | xargs)')) {
          this.addIssue('critical', `Script inseguro detectado: ${script}`);
          this.addRecommendation('O script foi atualizado para carregar variáveis de forma segura');
        }
        
        // Verificar permissões
        const stats = await fs.stat(script);
        if ((stats.mode & parseInt('777', 8)) !== parseInt('755', 8)) {
          this.addIssue('medium', `Permissões incorretas no script: ${script}`);
          this.addRecommendation('Execute: chmod 755 ' + script);
        }
        
      } catch (error) {
        this.addIssue('low', `Script não encontrado: ${script}`);
      }
    }
  }

  async checkDependencies() {
    console.log('🔍 Verificando dependências...');
    
    try {
      const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
      
      // Verificar dependências conhecidas por vulnerabilidades
      const vulnerableDeps = {
        'lodash': '<4.17.21',
        'express': '<4.17.1',
        'axios': '<0.21.1',
        'minimist': '<1.2.6'
      };
      
      for (const [dep, version] of Object.entries(vulnerableDeps)) {
        if (packageJson.dependencies?.[dep]) {
          const installedVersion = packageJson.dependencies[dep];
          if (this.isVersionVulnerable(installedVersion, version)) {
            this.addIssue('high', `Dependência vulnerável: ${dep}@${installedVersion}`);
            this.addRecommendation(`Atualize ${dep} para uma versão segura`);
          }
        }
      }
      
      // Verificar dependências desnecessárias
      const unnecessaryDeps = ['kilocode'];
      for (const dep of unnecessaryDeps) {
        if (packageJson.dependencies?.[dep]) {
          this.addIssue('medium', `Dependência desnecessária: ${dep}`);
          this.addRecommendation(`Remova a dependência ${dep} - não é mais necessária`);
        }
      }
      
    } catch (error) {
      this.addIssue('low', 'package.json não encontrado');
    }
  }

  async checkFilePermissions() {
    console.log('🔍 Verificando permissões de arquivos...');
    
    const sensitiveFiles = [
      '.env',
      'kilo.config.js',
      'src/config/security.js',
      'src/config/database.js'
    ];
    
    for (const file of sensitiveFiles) {
      try {
        const stats = await fs.stat(file);
        
        // Verificar se o arquivo é world-writable
        if ((stats.mode & parseInt('002', 8)) !== 0) {
          this.addIssue('high', `Arquivo sensível com permissões World-Writable: ${file}`);
          this.addRecommendation(`Execute: chmod o-w ${file}`);
        }
        
        // Verificar se o arquivo é world-readable para arquivos sensíveis
        if (file === '.env' && (stats.mode & parseInt('004', 8)) !== 0) {
          this.addIssue('medium', `Arquivo .env é world-readable`);
          this.addRecommendation('Considere restringir o acesso ao arquivo .env');
        }
        
      } catch (error) {
        // Arquivo não existe - ignorar
      }
    }
  }

  async checkNetworkSecurity() {
    console.log('🔍 Verificando configurações de rede...');
    
    try {
      const kiloConfig = require('./kilo.config');
      
      // Verificar URLs de serviços externos
      const services = [
        { name: 'Qdrant', url: kiloConfig.semanticSearch?.qdrantUrl },
        { name: 'Ollama', url: kiloConfig.semanticSearch?.ollamaUrl }
      ];
      
      for (const service of services) {
        if (service.url) {
          if (service.url.startsWith('http://') && !service.url.includes('localhost')) {
            this.addIssue('medium', `${service.name} usando HTTP inseguro: ${service.url}`);
            this.addRecommendation('Use HTTPS para conexões externas');
          }
          
          if (service.url.includes('localhost') && service.url.startsWith('http://')) {
            this.addIssue('low', `${service.name} usando HTTP para localhost`);
            this.addRecommendation('Considere usar HTTPS mesmo para localhost');
          }
        }
      }
      
    } catch (error) {
      // Configuração não encontrada - ignorar
    }
  }

  isDefaultValue(value) {
    const defaultValues = [
      'chave_super_secreta_12345',
      'chave_de_criptografia_67890',
      'senha_segura',
      'admin',
      'password',
      '123456',
      'default'
    ];
    
    return defaultValues.includes(value);
  }

  isWeakValue(value) {
    // Remover aspas
    value = value.replace(/["']/g, '');
    
    // Verificar comprimento
    if (value.length < 32) return true;
    
    // Verificar complexidade
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    
    const complexityScore = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChars].filter(Boolean).length;
    
    return complexityScore < 3;
  }

  isVersionVulnerable(installedVersion, vulnerableVersion) {
    // Lógica simplificada - em produção usar semver ou biblioteca específica
    return installedVersion.startsWith(vulnerableVersion.slice(1));
  }

  addIssue(severity, message) {
    this.issues.push({ severity, message, timestamp: new Date() });
  }

  addRecommendation(message) {
    this.recommendations.push(message);
  }

  async generateSecurityReport() {
    console.log('\n📋 Relatório de Segurança');
    console.log('=========================');
    
    // Agrupar issues por severidade
    const issuesBySeverity = {};
    for (const severity of Object.keys(this.severityLevels)) {
      issuesBySeverity[severity] = this.issues.filter(issue => issue.severity === severity);
    }
    
    let totalIssues = 0;
    
    // Mostrar issues por severidade
    for (const [severity, level] of Object.entries(this.severityLevels)) {
      const issues = issuesBySeverity[severity];
      if (issues.length > 0) {
        console.log(`\n${level} (${issues.length}):`);
        issues.forEach(issue => {
          console.log(`   • ${issue.message}`);
        });
        totalIssues += issues.length;
      }
    }
    
    if (totalIssues === 0) {
      console.log('\n✅ Nenhuma vulnerabilidade encontrada!');
    } else {
      console.log(`\n🚨 Total de problemas: ${totalIssues}`);
      
      console.log('\n💡 Recomendações:');
      this.recommendations.forEach((rec, index) => {
        console.log(`   ${index + 1}. ${rec}`);
      });
      
      // Gerar score de segurança
      const securityScore = this.calculateSecurityScore();
      console.log(`\n📊 Score de Segurança: ${securityScore}/100`);
      
      if (securityScore < 50) {
        console.log('🚨 RISCO CRÍTICO - Corrija os problemas imediatamente!');
      } else if (securityScore < 80) {
        console.log('⚠️  RISCO MÉDIO - Corrija os problemas em breve');
      } else {
        console.log('✅ RISCO BAIXO - Sistema relativamente seguro');
      }
    }
    
    // Salvar relatório detalhado
    await this.saveDetailedReport();
  }

  calculateSecurityScore() {
    if (this.issues.length === 0) return 100;
    
    const severityWeights = {
      critical: 20,
      high: 10,
      medium: 5,
      low: 1
    };
    
    let totalWeight = 0;
    for (const issue of this.issues) {
      totalWeight += severityWeights[issue.severity] || 1;
    }
    
    // Score máximo começa em 100, diminui conforme o peso dos issues
    const score = Math.max(0, 100 - totalWeight);
    return Math.round(score);
  }

  async saveDetailedReport() {
    const report = {
      timestamp: new Date().toISOString(),
      securityScore: this.calculateSecurityScore(),
      totalIssues: this.issues.length,
      issues: this.issues,
      recommendations: this.recommendations,
      systemInfo: {
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version
      }
    };
    
    const reportFilename = `security-report-${Date.now()}.json`;
    const reportPath = path.join('.killo-workspace', 'reports', reportFilename);
    
    try {
      await fs.mkdir(path.dirname(reportPath), { recursive: true });
      await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
      console.log(`\n📄 Relatório detalhado salvo em: ${reportPath}`);
    } catch (error) {
      console.warn('⚠️  Não foi possível salvar relatório detalhado');
    }
  }
}

// Executar verificação de segurança
if (require.main === module) {
  const securityCheck = new SecurityCheck();
  securityCheck.run().catch(console.error);
}

module.exports = SecurityCheck;