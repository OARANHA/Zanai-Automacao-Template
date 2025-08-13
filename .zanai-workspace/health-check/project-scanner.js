#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

class ProjectScanner {
  constructor() {
    this.issues = [];
    this.recommendations = [];
  }

  async scan() {
    console.log('🔍 Escaneando projeto...');
    
    await this.checkPackageJson();
    await this.checkDependencies();
    await this.checkConfigFiles();
    await this.checkEnvironment();
    await this.checkKiloIntegration();
    await this.checkKiloScripts();
    await this.checkSemanticSearchConfig();
    this.generateReport();
  }

  async checkPackageJson() {
    try {
      const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
      
      if (!packageJson.scripts || !packageJson.scripts.dev) {
        this.issues.push('❌ Script "dev" não encontrado em package.json');
        this.recommendations.push('Adicione script dev: "next dev" ou "nodemon index.js"');
      }
      
      if (!packageJson.dependencies || !packageJson.dependencies.kilocode) {
        this.issues.push('❌ Kilo Code não instalado');
        this.recommendations.push('Execute: npm install kilocode');
      }
    } catch (error) {
      this.issues.push('❌ package.json não encontrado ou inválido');
      this.recommendations.push('Execute: npm init -y');
    }
  }
async checkSemanticSearchConfig() {
  try {
    const envContent = await fs.readFile('.env', 'utf8');
    
    if (!envContent.includes('QDRANT_COLLECTION=')) {
      this.issues.push('❌ QDRANT_COLLECTION não definida no .env');
      this.recommendations.push('Adicione QDRANT_COLLECTION=sua_collection ao .env');
    } else {
      // Verifica se está vazia ou com valor padrão
      const lines = envContent.split('\n');
      const collectionLine = lines.find(line => line.startsWith('QDRANT_COLLECTION='));
      
      if (collectionLine) {
        const value = collectionLine.split('=')[1].trim();
        if (!value || value === 'default' || value === 'flowise_all') {
          this.issues.push(`❌ QDRANT_COLLECTION está com valor inválido: "${value}"`);
          this.recommendations.push('Defina um nome específico para sua collection');
        }
      }
    }
  } catch (error) {
    this.recommendations.push('Crie um arquivo .env com QDRANT_COLLECTION definida');
  }
}
  async checkDependencies() {
    try {
      execSync('npm audit --audit-level moderate', { stdio: 'pipe' });
    } catch (error) {
      this.issues.push('❌ Vulnerabilidades de segurança encontradas');
      this.recommendations.push('Execute: npm audit fix');
    }
  }

  async checkConfigFiles() {
    const requiredFiles = ['.env.example', '.gitignore'];
    
    for (const file of requiredFiles) {
      try {
        await fs.access(file);
      } catch {
        this.issues.push(`❌ Arquivo ${file} não encontrado`);
        this.recommendations.push(`Crie um arquivo ${file} básico`);
      }
    }
  }

  async checkEnvironment() {
    try {
      await fs.access('.env');
    } catch {
      this.issues.push('❌ Arquivo .env não encontrado');
      this.recommendations.push('Copie .env.example para .env e configure as variáveis');
    }
  }

  async checkKiloIntegration() {
    const kiloFiles = ['.killo-workspace', 'scripts/kindex.sh', 'scripts/ksearch.sh'];
    
    for (const file of kiloFiles) {
      try {
        await fs.access(file);
      } catch {
        this.issues.push(`❌ Arquivo Kilo ${file} não encontrado`);
        this.recommendations.push('Execute o Kilo Init para configurar o workspace');
      }
    }
  }

  async checkKiloScripts() {
    const requiredScripts = [
      'scripts/kindex-fast.sh',
      'scripts/ksearch.sh',
      'scripts/kread.sh',
      'scripts/index_simple_fast.mjs',
      'scripts/search_repo.mjs'
    ];
    
    for (const script of requiredScripts) {
      try {
        await fs.access(script);
        // Verifica se é executável (para .sh)
        if (script.endsWith('.sh')) {
          execSync(`test -x ${script}`);
        }
      } catch {
        this.issues.push(`❌ Script Kilo ${script} não encontrado ou não executável`);
        this.recommendations.push('Execute: chmod +x scripts/*.sh');
      }
    }
  }

  generateReport() {
    console.log('\n📋 Relatório do Health Check');
    console.log('========================');
    
    if (this.issues.length === 0) {
      console.log('✅ Nenhum problema encontrado!');
    } else {
      console.log('❌ Problemas encontrados:');
      this.issues.forEach(issue => console.log(`  ${issue}`));
      
      console.log('\n💡 Recomendações:');
      this.recommendations.forEach(rec => console.log(`  ${rec}`));
    }
    
    console.log('\n🚀 Próximos passos:');
    console.log('  1. Execute: npm install');
    console.log('  2. Configure o .env');
    console.log('  3. Use Ctrl+Shift+P > "Kilo: Bootstrap Project"');
  }
}

const scanner = new ProjectScanner();
scanner.scan().catch(console.error);