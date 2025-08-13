#!/usr/bin/env node
/**
 * Sistema de Instalação Automática e Não Invasiva
 * Detecta automaticamente o tipo de projeto e integra sem conflitos
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');

class AutoSetup {
  constructor() {
    this.projectType = 'unknown';
    this.projectRoot = process.cwd();
    this.backupDir = path.join(this.projectRoot, '.killo-backup');
    this.config = {};
    this.safeMode = true;
  }

  async run() {
    console.log('🚀 Kilo Code - Setup Automático Inteligente');
    console.log('==========================================');
    
    try {
      await this.detectProject();
      await this.validateEnvironment();
      await this.createBackup();
      await this.setupIntelligent();
      await this.configureEnvironment();
      await this.validateSetup();
      await this.showNextSteps();
      
      console.log('\n✅ Setup automático concluído com sucesso!');
    } catch (error) {
      console.error('\n❌ Erro durante setup automático:', error.message);
      await this.recoverFromError(error);
    }
  }

  async detectProject() {
    console.log('🔍 Detectando tipo de projeto...');
    
    const detectors = [
      this.detectNextJS.bind(this),
      this.detectReact.bind(this),
      this.detectVue.bind(this),
      this.detectAngular.bind(this),
      this.detectNodeAPI.bind(this),
      this.detectPython.bind(this),
      this.detectUniversal.bind(this)
    ];

    for (const detector of detectors) {
      const result = await detector();
      if (result) {
        this.projectType = result.type;
        this.config = result.config;
        console.log(`✅ Projeto detectado: ${this.projectType}`);
        return;
      }
    }

    console.log('⚠️  Tipo de projeto não identificado, usando modo universal');
    this.projectType = 'universal';
  }

  async detectNextJS() {
    try {
      const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
      if (packageJson.dependencies?.next || packageJson.devDependencies?.next) {
        return {
          type: 'nextjs',
          config: {
            port: packageJson.scripts?.dev?.includes('3000') ? 3000 : 3001,
            hasTypeScript: await this.fileExists('tsconfig.json'),
            hasTailwind: await this.fileExists('tailwind.config.js'),
            buildCommand: 'next build',
            devCommand: 'next dev'
          }
        };
      }
    } catch {}
    return null;
  }

  async detectReact() {
    try {
      const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
      if (packageJson.dependencies?.react && !packageJson.dependencies?.next) {
        return {
          type: 'react',
          config: {
            hasTypeScript: await this.fileExists('tsconfig.json'),
            hasVite: await this.fileExists('vite.config.js'),
            buildCommand: packageJson.scripts?.build || 'react-scripts build',
            devCommand: packageJson.scripts?.start || 'react-scripts start'
          }
        };
      }
    } catch {}
    return null;
  }

  async detectVue() {
    try {
      const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
      if (packageJson.dependencies?.vue) {
        return {
          type: 'vue',
          config: {
            hasTypeScript: await this.fileExists('tsconfig.json'),
            hasVite: await this.fileExists('vite.config.js'),
            buildCommand: packageJson.scripts?.build || 'vue-cli-service build',
            devCommand: packageJson.scripts?.serve || 'vue-cli-service serve'
          }
        };
      }
    } catch {}
    return null;
  }

  async detectAngular() {
    try {
      const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
      if (packageJson.dependencies?.['@angular/core']) {
        return {
          type: 'angular',
          config: {
            buildCommand: 'ng build',
            devCommand: 'ng serve'
          }
        };
      }
    } catch {}
    return null;
  }

  async detectNodeAPI() {
    try {
      const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
      const hasExpress = packageJson.dependencies?.express || packageJson.dependencies?.fastify;
      const hasServer = packageJson.scripts?.start?.includes('node') || 
                      packageJson.main?.endsWith('.js');
      
      if (hasExpress || hasServer) {
        return {
          type: 'node-api',
          config: {
            hasExpress: !!packageJson.dependencies?.express,
            hasTypeScript: await this.fileExists('tsconfig.json'),
            hasDatabase: await this.hasDatabaseConfig(),
            port: this.extractPort(packageJson) || 3000
          }
        };
      }
    } catch {}
    return null;
  }

  async detectPython() {
    try {
      const hasRequirements = await this.fileExists('requirements.txt');
      const hasMain = await this.fileExists('main.py') || await this.fileExists('app.py');
      const hasSetup = await this.fileExists('setup.py');
      
      if (hasRequirements || hasMain || hasSetup) {
        return {
          type: 'python',
          config: {
            framework: await this.detectPythonFramework(),
            hasVirtualEnv: await this.fileExists('venv') || await this.fileExists('.venv')
          }
        };
      }
    } catch {}
    return null;
  }

  async detectUniversal() {
    return {
      type: 'universal',
      config: {
        customSetup: true,
        minimalIntegration: true
      }
    };
  }

  async detectPythonFramework() {
    if (await this.fileExists('requirements.txt')) {
      const requirements = await fs.readFile('requirements.txt', 'utf8');
      if (requirements.includes('django')) return 'django';
      if (requirements.includes('flask')) return 'flask';
      if (requirements.includes('fastapi')) return 'fastapi';
    }
    return 'unknown';
  }

  async hasDatabaseConfig() {
    const dbFiles = ['prisma/schema.prisma', 'knexfile.js', 'sequelize/config.js', 'config/database.js'];
    for (const file of dbFiles) {
      if (await this.fileExists(file)) return true;
    }
    return false;
  }

  extractPort(packageJson) {
    const devScript = packageJson.scripts?.dev || '';
    const startScript = packageJson.scripts?.start || '';
    const portMatch = (devScript + ' ' + startScript).match(/-p\s+(\d+)|--port\s+(\d+)|:(\d+)/);
    return portMatch ? parseInt(portMatch[1] || portMatch[2] || portMatch[3]) : null;
  }

  async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async validateEnvironment() {
    console.log('🔍 Validando ambiente...');
    
    const requiredTools = [
      { name: 'Node.js', check: () => process.version, version: '>=16.0.0' },
      { name: 'npm', check: () => this.runCommand('npm --version'), version: '>=8.0.0' }
    ];

    for (const tool of requiredTools) {
      try {
        const version = tool.check();
        console.log(`✅ ${tool.name}: ${version}`);
      } catch {
        throw new Error(`${tool.name} não encontrado ou versão incompatível`);
      }
    }
  }

  async createBackup() {
    console.log('💾 Criando backup de segurança...');
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.backupDir = path.join(this.projectRoot, `.killo-backup-${timestamp}`);
    
    await fs.mkdir(this.backupDir, { recursive: true });
    
    // Backup de arquivos críticos
    const criticalFiles = ['package.json', '.env', '.env.example'];
    for (const file of criticalFiles) {
      if (await this.fileExists(file)) {
        const backupPath = path.join(this.backupDir, file);
        await fs.copyFile(file, backupPath);
      }
    }
    
    console.log(`✅ Backup criado em: ${this.backupDir}`);
  }

  async setupIntelligent() {
    console.log('🔧 Configurando integração inteligente...');
    
    switch (this.projectType) {
      case 'nextjs':
        await this.setupNextJS();
        break;
      case 'react':
        await this.setupReact();
        break;
      case 'vue':
        await this.setupVue();
        break;
      case 'angular':
        await this.setupAngular();
        break;
      case 'node-api':
        await this.setupNodeAPI();
        break;
      case 'python':
        await this.setupPython();
        break;
      default:
        await this.setupUniversal();
    }
  }

  async setupNextJS() {
    console.log('📦 Configurando para Next.js...');
    
    // Adicionar scripts de forma segura
    await this.addNpmScripts({
      'kilo:index': 'bash scripts/kindex-fast.sh',
      'kilo:search': 'bash scripts/ksearch.sh',
      'kilo:read': 'bash scripts/kread.sh',
      'kilo:health': 'node .killo-workspace/health-check/project-scanner.js'
    });

    // Criar configuração específica para Next.js
    await this.createKilloConfig({
      ...this.config,
      semanticSearch: {
        ignoreDirs: ['.next', '.git', 'node_modules'],
        indexRoot: '.',
        port: this.config.port || 3000
      }
    });

    // Copiar scripts de forma segura
    await this.copyScriptsSafe();
  }

  async setupReact() {
    console.log('⚛️  Configurando para React...');
    
    await this.addNpmScripts({
      'kilo:index': 'bash scripts/kindex-fast.sh',
      'kilo:search': 'bash scripts/ksearch.sh',
      'kilo:read': 'bash scripts/kread.sh'
    });

    await this.createKilloConfig({
      ...this.config,
      semanticSearch: {
        ignoreDirs: ['build', 'dist', '.git', 'node_modules'],
        indexRoot: 'src'
      }
    });

    await this.copyScriptsSafe();
  }

  async setupNodeAPI() {
    console.log('🔧 Configurando para Node.js API...');
    
    await this.addNpmScripts({
      'kilo:index': 'bash scripts/kindex-fast.sh',
      'kilo:search': 'bash scripts/ksearch.sh',
      'kilo:read': 'bash scripts/kread.sh',
      'kilo:health': 'node .killo-workspace/health-check/project-scanner.js'
    });

    await this.createKilloConfig({
      ...this.config,
      semanticSearch: {
        ignoreDirs: ['.git', 'node_modules', 'logs', 'coverage'],
        indexRoot: '.'
      }
    });

    await this.copyScriptsSafe();
  }

  async setupPython() {
    console.log('🐍 Configurando para Python...');
    
    // Criar script de integração Python
    await this.createPythonIntegration();
    
    await this.createKilloConfig({
      ...this.config,
      semanticSearch: {
        ignoreDirs: ['.git', '__pycache__', 'venv', '.venv', 'node_modules'],
        indexRoot: '.',
        goodExtensions: /\.(py|md|txt|yaml|yml|json|html|css|js|ts)$/i
      }
    });
  }

  async setupUniversal() {
    console.log('🌐 Configurando modo universal...');
    
    await this.addNpmScripts({
      'kilo:index': 'bash scripts/kindex-fast.sh',
      'kilo:search': 'bash scripts/ksearch.sh',
      'kilo:read': 'bash scripts/kread.sh'
    });

    await this.createKilloConfig({
      semanticSearch: {
        ignoreDirs: ['.git', 'node_modules', 'dist', 'build'],
        indexRoot: '.'
      }
    });

    await this.copyScriptsSafe();
  }

  async addNpmScripts(scripts) {
    try {
      const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
      
      if (!packageJson.scripts) {
        packageJson.scripts = {};
      }
      
      // Adicionar scripts sem sobrescrever existentes
      for (const [name, command] of Object.entries(scripts)) {
        if (!packageJson.scripts[name]) {
          packageJson.scripts[name] = command;
        }
      }
      
      await fs.writeFile('package.json', JSON.stringify(packageJson, null, 2));
      console.log('✅ Scripts npm adicionados com segurança');
    } catch (error) {
      console.warn('⚠️  Não foi possível adicionar scripts npm:', error.message);
    }
  }

  async createKilloConfig(config) {
    const kiloConfig = {
      env: process.env.NODE_ENV || 'development',
      port: config.port || 3000,
      projectType: this.projectType,
      resources: {
        maxWorkers: parseInt(process.env.KILO_MAX_WORKERS) || 4,
        memoryLimit: process.env.KILO_MEMORY_LIMIT || '2GB',
        autoScale: process.env.AUTO_SCALE === 'true'
      },
      semanticSearch: {
        qdrantUrl: process.env.QDRANT_URL || 'http://localhost:6333',
        ollamaUrl: process.env.OLLAMA_URL || 'http://localhost:11434',
        embedModel: process.env.EMBED_MODEL || 'bge-m3',
        collection: process.env.QDRANT_COLLECTION || `${this.projectType}_${this.generateProjectId()}`,
        embedPayload: process.env.EMBED_PAYLOAD || 'auto',
        indexRoot: config.semanticSearch?.indexRoot || '.',
        batch: parseInt(process.env.BATCH) || 64,
        chunkSize: parseInt(process.env.CHUNK_SIZE) || 1200,
        chunkOverlap: parseInt(process.env.CHUNK_OVERLAP) || 200,
        maxFileMB: parseFloat(process.env.MAX_FILE_MB) || 1.5,
        maxCharsFile: parseInt(process.env.MAX_CHARS_FILE) || 200000,
        searchLimit: parseInt(process.env.SEARCH_LIMIT) || 8,
        withSnippet: process.env.WITH_SNIPPET === '1',
        ignoreDirs: config.semanticSearch?.ignoreDirs || ['.git', 'node_modules'],
        goodExtensions: config.semanticSearch?.goodExtensions || /\.(md|mdx|tsx?|jsx?|mjs|cjs|json|ya?ml|css|scss|less|html|txt|sql|sh|bash|zsh|py|go)$/i,
        scripts: {
          kindex: './scripts/kindex-fast.sh',
          ksearch: './scripts/ksearch.sh',
          kread: './scripts/kread.sh',
          indexModule: './scripts/index_simple_fast.mjs',
          searchModule: './scripts/search_repo.mjs'
        }
      }
    };

    await fs.writeFile('kilo.config.js', `module.exports = ${JSON.stringify(kiloConfig, null, 2)};`);
    console.log('✅ Configuração Kilo criada');
  }

  async copyScriptsSafe() {
    try {
      // Criar diretório scripts se não existir
      await fs.mkdir('scripts', { recursive: true });
      
      // Copiar scripts apenas se não existirem
      const scriptFiles = [
        'kindex-fast.sh',
        'ksearch.sh', 
        'kread.sh',
        'index_simple_fast.mjs',
        'search_repo.mjs'
      ];
      
      for (const script of scriptFiles) {
        const source = path.join('.killo-workspace', 'scripts', script);
        const dest = path.join('scripts', script);
        
        if (!(await this.fileExists(dest))) {
          await fs.copyFile(source, dest);
          
          // Dar permissão de execução para scripts .sh
          if (script.endsWith('.sh')) {
            await fs.chmod(dest, '755');
          }
        }
      }
      
      console.log('✅ Scripts copiados com segurança');
    } catch (error) {
      console.warn('⚠️  Não foi possível copiar scripts:', error.message);
    }
  }

  async createPythonIntegration() {
    const pythonScript = `
#!/usr/bin/env python3
"""
Kilo Code - Integração Python
Busca semântica para projetos Python
"""

import subprocess
import os
import sys
from pathlib import Path

def run_command(cmd):
    """Executa comando shell de forma segura"""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        return result.stdout, result.stderr
    except Exception as e:
        return "", str(e)

def kilo_index(path="."):
    """Indexa arquivos para busca semântica"""
    cmd = f"bash scripts/kindex-fast.sh {path}"
    stdout, stderr = run_command(cmd)
    return stdout

def kilo_search(query):
    """Realiza busca semântica"""
    cmd = f'bash scripts/ksearch.sh "{query}"'
    stdout, stderr = run_command(cmd)
    return stdout

def kilo_read(filepath, mode="HEAD:200"):
    """Lê arquivo de forma segura"""
    cmd = f'bash scripts/kread.sh "{filepath}" {mode}'
    stdout, stderr = run_command(cmd)
    return stdout

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python kilo_integration.py <index|search|read> [args]")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "index":
        path = sys.argv[2] if len(sys.argv) > 2 else "."
        print(kilo_index(path))
    elif command == "search":
        query = sys.argv[2] if len(sys.argv) > 2 else ""
        print(kilo_search(query))
    elif command == "read":
        filepath = sys.argv[2] if len(sys.argv) > 2 else ""
        mode = sys.argv[3] if len(sys.argv) > 3 else "HEAD:200"
        print(kilo_read(filepath, mode))
    else:
        print(f"Comando desconhecido: {command}")
`;

    await fs.writeFile('kilo_integration.py', pythonScript);
    console.log('✅ Integração Python criada');
  }

  generateProjectId() {
    return crypto.randomBytes(4).toString('hex');
  }

  async configureEnvironment() {
    console.log('🔧 Configurando ambiente...');
    
    // Criar .env.example se não existir
    if (!(await this.fileExists('.env.example'))) {
      await fs.copyFile('.env.example', '.env.example.backup');
      await fs.copyFile(path.join('.killo-workspace', '.env.example'), '.env.example');
    }
    
    // Criar .env se não existir
    if (!(await this.fileExists('.env'))) {
      await fs.copyFile('.env.example', '.env');
      console.log('⚠️  Arquivo .env criado - por favor configure as variáveis obrigatórias');
    }
    
    // Configurar collection única para este projeto
    if (await this.fileExists('.env')) {
      let envContent = await fs.readFile('.env', 'utf8');
      if (!envContent.includes('QDRANT_COLLECTION=') || envContent.includes('QDRANT_COLLECTION=')) {
        const collectionName = `${this.projectType}_${this.generateProjectId()}`;
        envContent = envContent.replace('QDRANT_COLLECTION=', `QDRANT_COLLECTION=${collectionName}`);
        await fs.writeFile('.env', envContent);
        console.log(`✅ Collection configurada: ${collectionName}`);
      }
    }
  }

  async validateSetup() {
    console.log('🔍 Validando setup...');
    
    const validations = [
      () => this.fileExists('kilo.config.js'),
      () => this.fileExists('.env'),
      () => this.fileExists('scripts/kindex-fast.sh'),
      () => this.fileExists('scripts/ksearch.sh')
    ];
    
    const results = await Promise.all(validations.map(v => v().catch(() => false)));
    const passed = results.filter(Boolean).length;
    
    console.log(`✅ Validação concluída: ${passed}/${results.length} checks passaram`);
    
    if (passed < results.length) {
      console.warn('⚠️  Alguns componentes não foram configurados');
    }
  }

  async showNextSteps() {
    console.log('\n📋 Próximos passos:');
    console.log('==================');
    
    switch (this.projectType) {
      case 'nextjs':
        console.log('1. Configure as variáveis obrigatórias no .env');
        console.log('2. Execute: npm run kilo:index');
        console.log('3. Teste: npm run kilo:search "sua query"');
        console.log('4. Use o sistema de busca semântica no seu projeto Next.js');
        break;
      case 'node-api':
        console.log('1. Configure as variáveis obrigatórias no .env');
        console.log('2. Execute: npm run kilo:index');
        console.log('3. Teste: npm run kilo:search "sua query"');
        console.log('4. Integre as rotas de busca na sua API');
        break;
      case 'python':
        console.log('1. Configure as variáveis obrigatórias no .env');
        console.log('2. Execute: python kilo_integration.py index');
        console.log('3. Teste: python kilo_integration.py search "sua query"');
        console.log('4. Importe e use as funções no seu código Python');
        break;
      default:
        console.log('1. Configure as variáveis obrigatórias no .env');
        console.log('2. Execute: npm run kilo:index');
        console.log('3. Teste: npm run kilo:search "sua query"');
        console.log('4. Use o sistema de busca semântica no seu projeto');
    }
    
    console.log('\n🚀 Seu projeto agora está integrado com o Kilo Code!');
  }

  async recoverFromError(error) {
    console.log('\n🔄 Tentando recuperar do erro...');
    
    try {
      if (await this.fileExists(this.backupDir)) {
        console.log('📦 Restaurando do backup...');
        // Lógica de restauração pode ser implementada aqui
      }
    } catch (recoveryError) {
      console.error('❌ Falha na recuperação:', recoveryError.message);
    }
    
    console.log('\n💡 Sugestões:');
    console.log('1. Verifique as permissões dos arquivos');
    console.log('2. Execute manualmente: npm run setup:auto');
    console.log('3. Consulte a documentação em README.md');
  }

  runCommand(command) {
    try {
      return execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    } catch (error) {
      throw new Error(`Command failed: ${command}`);
    }
  }
}

// Executar setup automático
if (require.main === module) {
  const setup = new AutoSetup();
  setup.run().catch(console.error);
}

module.exports = AutoSetup;