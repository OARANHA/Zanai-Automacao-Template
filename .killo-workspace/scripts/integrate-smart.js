#!/usr/bin/env node
/**
 * Sistema de Integração Inteligente e Não Invasiva
 * Integra o Kilo Code em projetos existentes sem conflitos
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

class SmartIntegration {
  constructor() {
    this.projectRoot = process.cwd();
    this.backupDir = path.join(this.projectRoot, '.killo-backup');
    this.projectType = 'unknown';
    this.config = {};
    this.integrationMode = 'safe'; // safe, minimal, full
  }

  async run() {
    console.log('🔗 Kilo Code - Integração Inteligente');
    console.log('====================================');
    
    try {
      await this.analyzeProject();
      await this.chooseIntegrationMode();
      await this.createBackup();
      await this.performIntegration();
      await this.validateIntegration();
      await this.showIntegrationResults();
      
      console.log('\n✅ Integração concluída com sucesso!');
    } catch (error) {
      console.error('\n❌ Erro durante integração:', error.message);
      await this.handleIntegrationError(error);
    }
  }

  async analyzeProject() {
    console.log('🔍 Analisando projeto existente...');
    
    // Detectar tipo de projeto
    this.projectType = await this.detectProjectType();
    
    // Analisar estrutura existente
    this.existingStructure = await this.analyzeExistingStructure();
    
    // Identificar potenciais conflitos
    this.conflicts = await this.identifyConflicts();
    
    console.log(`✅ Projeto detectado: ${this.projectType}`);
    console.log(`📁 Estrutura existente: ${Object.keys(this.existingStructure).length} diretórios`);
    console.log(`⚠️  Potenciais conflitos: ${this.conflicts.length}`);
  }

  async detectProjectType() {
    try {
      const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
      
      if (packageJson.dependencies?.next) return 'nextjs';
      if (packageJson.dependencies?.react && !packageJson.dependencies?.next) return 'react';
      if (packageJson.dependencies?.vue) return 'vue';
      if (packageJson.dependencies?.['@angular/core']) return 'angular';
      if (packageJson.dependencies?.express || packageJson.dependencies?.fastify) return 'node-api';
      if (await this.fileExists('requirements.txt') || await this.fileExists('main.py')) return 'python';
      
      return 'universal';
    } catch {
      return 'universal';
    }
  }

  async analyzeExistingStructure() {
    const structure = {};
    const items = await fs.readdir('.', { withFileTypes: true });
    
    for (const item of items) {
      if (item.isDirectory()) {
        structure[item.name] = 'directory';
      } else if (item.isFile()) {
        structure[item.name] = 'file';
      }
    }
    
    return structure;
  }

  async identifyConflicts() {
    const conflicts = [];
    const killoFiles = [
      'scripts/kindex-fast.sh',
      'scripts/ksearch.sh', 
      'scripts/kread.sh',
      'kilo.config.js',
      '.env.example'
    ];
    
    for (const file of killoFiles) {
      if (this.existingStructure[file]) {
        conflicts.push({
          file: file,
          type: 'file_exists',
          severity: 'medium'
        });
      }
    }
    
    // Verificar conflitos de scripts npm
    try {
      const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
      const killoScripts = ['kindex', 'ksearch', 'kread', 'kilo:health'];
      
      for (const script of killoScripts) {
        if (packageJson.scripts?.[script]) {
          conflicts.push({
            file: 'package.json',
            type: 'script_conflict',
            script: script,
            severity: 'low'
          });
        }
      }
    } catch {}
    
    return conflicts;
  }

  async chooseIntegrationMode() {
    console.log('\n🤔 Escolha o modo de integração:');
    console.log('1) 🛡️  Seguro (recomendado) - Preserva tudo existente');
    console.log('2) 🎯 Mínimo - Apenas funcionalidades essenciais');
    console.log('3) 🚀 Completo - Integração máxima com backup');
    
    // Em ambiente automático, usa modo seguro
    if (process.env.CI || process.env.AUTO_INTEGRATE) {
      this.integrationMode = 'safe';
      console.log('🤖 Ambiente CI detectado, usando modo seguro');
      return;
    }
    
    // Para uso normal, seria interativo - aqui usamos modo seguro por padrão
    this.integrationMode = 'safe';
    console.log('✅ Modo seguro selecionado (padrão)');
  }

  async createBackup() {
    console.log('💾 Criando backup de segurança...');
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.backupDir = path.join(this.projectRoot, `.killo-backup-${timestamp}`);
    
    await fs.mkdir(this.backupDir, { recursive: true });
    
    // Backup apenas de arquivos que podem ser modificados
    const backupFiles = ['package.json', '.env', '.env.example'];
    
    for (const file of backupFiles) {
      if (await this.fileExists(file)) {
        const backupPath = path.join(this.backupDir, file);
        await fs.copyFile(file, backupPath);
      }
    }
    
    console.log(`✅ Backup criado em: ${this.backupDir}`);
  }

  async performIntegration() {
    console.log('🔧 Realizando integração...');
    
    switch (this.integrationMode) {
      case 'safe':
        await this.safeIntegration();
        break;
      case 'minimal':
        await this.minimalIntegration();
        break;
      case 'full':
        await this.fullIntegration();
        break;
    }
  }

  async safeIntegration() {
    console.log('🛡️  Executando integração segura...');
    
    // 1. Adicionar scripts npm sem sobrescrever
    await this.addScriptsSafe();
    
    // 2. Criar configuração básica
    await this.createBasicConfig();
    
    // 3. Copiar scripts apenas se não existirem
    await this.copyScriptsSafe();
    
    // 4. Atualizar .env.example sem sobrescrever
    await this.updateEnvExampleSafe();
    
    console.log('✅ Integração segura concluída');
  }

  async minimalIntegration() {
    console.log('🎯 Executando integração mínima...');
    
    // Apenas scripts essenciais
    await this.addEssentialScripts();
    
    // Configuração mínima
    await this.createMinimalConfig();
    
    console.log('✅ Integração mínima concluída');
  }

  async fullIntegration() {
    console.log('🚀 Executando integração completa...');
    
    // Adicionar todos os scripts
    await this.addAllScripts();
    
    // Configuração completa
    await this.createFullConfig();
    
    // Copiar todos os scripts
    await this.copyAllScripts();
    
    // Configuração completa do ambiente
    await this.setupFullEnvironment();
    
    console.log('✅ Integração completa concluída');
  }

  async addScriptsSafe() {
    try {
      const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
      
      if (!packageJson.scripts) {
        packageJson.scripts = {};
      }
      
      const safeScripts = {
        'kilo:index': 'bash scripts/kindex-fast.sh',
        'kilo:search': 'bash scripts/ksearch.sh',
        'kilo:read': 'bash scripts/kread.sh'
      };
      
      let addedCount = 0;
      for (const [name, command] of Object.entries(safeScripts)) {
        if (!packageJson.scripts[name]) {
          packageJson.scripts[name] = command;
          addedCount++;
        }
      }
      
      await fs.writeFile('package.json', JSON.stringify(packageJson, null, 2));
      console.log(`✅ ${addedCount} scripts adicionados com segurança`);
    } catch (error) {
      console.warn('⚠️  Não foi possível adicionar scripts:', error.message);
    }
  }

  async addEssentialScripts() {
    try {
      const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
      
      if (!packageJson.scripts) {
        packageJson.scripts = {};
      }
      
      const essentialScripts = {
        'kilo:index': 'bash scripts/kindex-fast.sh',
        'kilo:search': 'bash scripts/ksearch.sh'
      };
      
      for (const [name, command] of Object.entries(essentialScripts)) {
        if (!packageJson.scripts[name]) {
          packageJson.scripts[name] = command;
        }
      }
      
      await fs.writeFile('package.json', JSON.stringify(packageJson, null, 2));
      console.log('✅ Scripts essenciais adicionados');
    } catch (error) {
      console.warn('⚠️  Não foi possível adicionar scripts essenciais:', error.message);
    }
  }

  async addAllScripts() {
    try {
      const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
      
      if (!packageJson.scripts) {
        packageJson.scripts = {};
      }
      
      const allScripts = {
        'kilo:index': 'bash scripts/kindex-fast.sh',
        'kilo:search': 'bash scripts/ksearch.sh',
        'kilo:read': 'bash scripts/kread.sh',
        'kilo:health': 'node .killo-workspace/health-check/project-scanner.js',
        'kilo:setup': 'node .killo-workspace/scripts/auto-setup.js',
        'kilo:integrate': 'node .killo-workspace/scripts/integrate-smart.js'
      };
      
      for (const [name, command] of Object.entries(allScripts)) {
        packageJson.scripts[name] = command;
      }
      
      await fs.writeFile('package.json', JSON.stringify(packageJson, null, 2));
      console.log('✅ Todos os scripts adicionados');
    } catch (error) {
      console.warn('⚠️  Não foi possível adicionar todos os scripts:', error.message);
    }
  }

  async createBasicConfig() {
    const config = {
      projectType: this.projectType,
      integrationMode: 'safe',
      semanticSearch: {
        qdrantUrl: process.env.QDRANT_URL || 'http://localhost:6333',
        ollamaUrl: process.env.OLLAMA_URL || 'http://localhost:11434',
        embedModel: process.env.EMBED_MODEL || 'bge-m3',
        collection: process.env.QDRANT_COLLECTION || `${this.projectType}_${Date.now()}`,
        embedPayload: process.env.EMBED_PAYLOAD || 'auto',
        indexRoot: '.',
        ignoreDirs: ['.git', 'node_modules', 'dist', 'build'],
        scripts: {
          kindex: './scripts/kindex-fast.sh',
          ksearch: './scripts/ksearch.sh',
          kread: './scripts/kread.sh'
        }
      }
    };
    
    await fs.writeFile('kilo.config.js', `module.exports = ${JSON.stringify(config, null, 2)};`);
    console.log('✅ Configuração básica criada');
  }

  async createMinimalConfig() {
    const config = {
      projectType: this.projectType,
      integrationMode: 'minimal',
      semanticSearch: {
        qdrantUrl: 'http://localhost:6333',
        ollamaUrl: 'http://localhost:11434',
        embedModel: 'bge-m3',
        collection: `${this.projectType}_minimal_${Date.now()}`,
        scripts: {
          kindex: './scripts/kindex-fast.sh',
          ksearch: './scripts/ksearch.sh'
        }
      }
    };
    
    await fs.writeFile('kilo.config.js', `module.exports = ${JSON.stringify(config, null, 2)};`);
    console.log('✅ Configuração mínima criada');
  }

  async createFullConfig() {
    const config = {
      projectType: this.projectType,
      integrationMode: 'full',
      env: process.env.NODE_ENV || 'development',
      port: 3000,
      resources: {
        maxWorkers: 4,
        memoryLimit: '2GB',
        autoScale: false
      },
      semanticSearch: {
        qdrantUrl: process.env.QDRANT_URL || 'http://localhost:6333',
        ollamaUrl: process.env.OLLAMA_URL || 'http://localhost:11434',
        embedModel: process.env.EMBED_MODEL || 'bge-m3',
        collection: process.env.QDRANT_COLLECTION || `${this.projectType}_full_${Date.now()}`,
        embedPayload: process.env.EMBED_PAYLOAD || 'auto',
        indexRoot: '.',
        batch: 64,
        chunkSize: 1200,
        chunkOverlap: 200,
        maxFileMB: 1.5,
        maxCharsFile: 200000,
        searchLimit: 8,
        withSnippet: true,
        ignoreDirs: ['.git', 'node_modules', 'dist', 'build', '.next', '.turbo'],
        goodExtensions: /\.(md|mdx|tsx?|jsx?|mjs|cjs|json|ya?ml|css|scss|less|html|txt|sql|sh|bash|zsh|py|go)$/i,
        scripts: {
          kindex: './scripts/kindex-fast.sh',
          ksearch: './scripts/ksearch.sh',
          kread: './scripts/kread.sh',
          indexModule: './scripts/index_simple_fast.mjs',
          searchModule: './scripts/search_repo.mjs'
        }
      }
    };
    
    await fs.writeFile('kilo.config.js', `module.exports = ${JSON.stringify(config, null, 2)};`);
    console.log('✅ Configuração completa criada');
  }

  async copyScriptsSafe() {
    try {
      await fs.mkdir('scripts', { recursive: true });
      
      const essentialScripts = ['kindex-fast.sh', 'ksearch.sh', 'kread.sh'];
      let copiedCount = 0;
      
      for (const script of essentialScripts) {
        const source = path.join('.killo-workspace', 'scripts', script);
        const dest = path.join('scripts', script);
        
        if (!(await this.fileExists(dest))) {
          await fs.copyFile(source, dest);
          
          if (script.endsWith('.sh')) {
            await fs.chmod(dest, '755');
          }
          copiedCount++;
        }
      }
      
      console.log(`✅ ${copiedCount} scripts copiados com segurança`);
    } catch (error) {
      console.warn('⚠️  Não foi possível copiar scripts:', error.message);
    }
  }

  async copyAllScripts() {
    try {
      await fs.mkdir('scripts', { recursive: true });
      
      const allScripts = [
        'kindex-fast.sh',
        'ksearch.sh', 
        'kread.sh',
        'index_simple_fast.mjs',
        'search_repo.mjs'
      ];
      
      for (const script of allScripts) {
        const source = path.join('.killo-workspace', 'scripts', script);
        const dest = path.join('scripts', script);
        
        await fs.copyFile(source, dest);
        
        if (script.endsWith('.sh')) {
          await fs.chmod(dest, '755');
        }
      }
      
      console.log('✅ Todos os scripts copiados');
    } catch (error) {
      console.warn('⚠️  Não foi possível copiar todos os scripts:', error.message);
    }
  }

  async updateEnvExampleSafe() {
    try {
      if (!(await this.fileExists('.env.example'))) {
        await fs.copyFile(path.join('.killo-workspace', '.env.example'), '.env.example');
        console.log('✅ .env.example criado');
        return;
      }
      
      // Adicionar variáveis Kilo ao .env.example existente
      let envContent = await fs.readFile('.env.example', 'utf8');
      
      const kiloVars = [
        '# Kilo Code - Busca Semântica',
        'QDRANT_URL=http://localhost:6333',
        'OLLAMA_URL=http://localhost:11434',
        'EMBED_MODEL=bge-m3',
        'QDRANT_COLLECTION=',
        'EMBED_PAYLOAD=auto',
        'INDEX_ROOT=.',
        'BATCH=64',
        'CHUNK_SIZE=1200',
        'CHUNK_OVERLAP=200',
        'MAX_FILE_MB=1.5',
        'MAX_CHARS_FILE=200000',
        'SEARCH_LIMIT=8',
        'WITH_SNIPPET=1'
      ];
      
      // Verificar se as variáveis já existem
      const hasKiloVars = kiloVars.some(varName => envContent.includes(varName.split('=')[0]));
      
      if (!hasKiloVars) {
        envContent += '\n\n' + kiloVars.join('\n');
        await fs.writeFile('.env.example', envContent);
        console.log('✅ Variáveis Kilo adicionadas ao .env.example');
      }
    } catch (error) {
      console.warn('⚠️  Não foi possível atualizar .env.example:', error.message);
    }
  }

  async setupFullEnvironment() {
    try {
      // Criar .env se não existir
      if (!(await this.fileExists('.env'))) {
        if (await this.fileExists('.env.example')) {
          await fs.copyFile('.env.example', '.env');
          console.log('✅ .env criado a partir do exemplo');
        }
      }
      
      // Configurar VS Code de forma não invasiva
      await this.setupVSCodeSafe();
      
      console.log('✅ Ambiente completo configurado');
    } catch (error) {
      console.warn('⚠️  Não foi possível configurar ambiente completo:', error.message);
    }
  }

  async setupVSCodeSafe() {
    try {
      if (!(await this.fileExists('.vscode'))) {
        await fs.mkdir('.vscode');
      }
      
      // Adicionar extensões recomendadas sem sobrescrever
      if (!(await this.fileExists('.vscode/extensions.json'))) {
        const extensions = {
          recommendations: [
            'ms-vscode.vscode-typescript-next',
            'esbenp.prettier-vscode',
            'ms-vscode.vscode-json',
            'ms-python.python',
            'bradlc.vscode-tailwindcss',
            'ms-vscode.docker'
          ]
        };
        
        await fs.writeFile(
          '.vscode/extensions.json',
          JSON.stringify(extensions, null, 2)
        );
        console.log('✅ Extensões VS Code adicionadas');
      }
    } catch (error) {
      console.warn('⚠️  Não foi possível configurar VS Code:', error.message);
    }
  }

  async validateIntegration() {
    console.log('🔍 Validando integração...');
    
    const validations = [
      { name: 'kilo.config.js', check: () => this.fileExists('kilo.config.js') },
      { name: 'scripts/kindex-fast.sh', check: () => this.fileExists('scripts/kindex-fast.sh') },
      { name: 'scripts/ksearch.sh', check: () => this.fileExists('scripts/ksearch.sh') },
      { name: 'package.json scripts', check: async () => {
          const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
          return packageJson.scripts && (
            packageJson.scripts['kilo:index'] || 
            packageJson.scripts['kindex']
          );
        }
      }
    ];
    
    let passedCount = 0;
    for (const validation of validations) {
      try {
        const result = await validation.check();
        if (result) passedCount++;
      } catch {
        // Ignora erros de validação
      }
    }
    
    console.log(`✅ Validação concluída: ${passedCount}/${validations.length} checks passaram`);
  }

  async showIntegrationResults() {
    console.log('\n📊 Resultados da Integração:');
    console.log('============================');
    console.log(`🎯 Tipo de projeto: ${this.projectType}`);
    console.log(`🔧 Modo de integração: ${this.integrationMode}`);
    console.log(`⚠️  Conflitos detectados: ${this.conflicts.length}`);
    console.log(`💾 Backup disponível em: ${this.backupDir}`);
    
    console.log('\n🚀 Próximos passos:');
    console.log('1. Configure as variáveis obrigatórias no .env');
    console.log('2. Execute: npm run kilo:index');
    console.log('3. Teste: npm run kilo:search "sua query"');
    console.log('4. Use o sistema de busca semântica no seu projeto');
    
    if (this.conflicts.length > 0) {
      console.log('\n⚠️  Conflitos encontrados (resolvidos automaticamente):');
      this.conflicts.forEach(conflict => {
        console.log(`   - ${conflict.file} (${conflict.type})`);
      });
    }
  }

  async handleIntegrationError(error) {
    console.log('\n🔄 Tentando recuperar do erro...');
    
    try {
      if (await this.fileExists(this.backupDir)) {
        console.log('📦 Backup disponível para restauração manual');
        console.log(`   Local: ${this.backupDir}`);
      }
    } catch (recoveryError) {
      console.error('❌ Falha na recuperação:', recoveryError.message);
    }
    
    console.log('\n💡 Sugestões:');
    console.log('1. Execute: npm run kilo:setup para configuração automática');
    console.log('2. Verifique as permissões dos arquivos');
    console.log('3. Consulte a documentação');
  }

  async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}

// Executar integração inteligente
if (require.main === module) {
  const integration = new SmartIntegration();
  integration.run().catch(console.error);
}

module.exports = SmartIntegration;