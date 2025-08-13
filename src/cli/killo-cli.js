#!/usr/bin/env node
/**
 * Killo Code CLI Interface
 * Interface de linha de comando para interação em linguagem natural
 */

const CommandProcessor = require('../services/commandProcessor');
const readline = require('readline');

class KilloCLI {
  constructor() {
    this.processor = new CommandProcessor();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'kilo> '
    });
  }

  async start() {
    console.log('🚀 Killo Code CLI - Sistema Autônomo de Desenvolvimento');
    console.log('====================================================');
    console.log('Digite "ajuda" para ver comandos disponíveis ou "sair" para encerrar');
    console.log('');
    
    // Inicializar o processador
    await this.processor.initialize();
    
    // Iniciar prompt interativo
    this.rl.prompt();
    
    // Configurar handlers
    this.rl.on('line', async (input) => {
      await this.handleCommand(input.trim());
      this.rl.prompt();
    });
    
    this.rl.on('close', () => {
      console.log('\n👋 Até logo!');
      process.exit(0);
    });
  }

  async handleCommand(command) {
    if (!command) return;
    
    // Comandos especiais
    switch (command.toLowerCase()) {
      case 'sair':
      case 'exit':
      case 'quit':
        this.rl.close();
        return;
        
      case 'ajuda':
      case 'help':
        this.showHelp();
        return;
        
      case 'limpar':
      case 'clear':
        console.clear();
        return;
        
      case 'status':
        this.showStatus();
        return;
    }
    
    // Processar comando com o processador
    const result = await this.processor.processCommand(command);
    
    if (result.success) {
      console.log('✅', result.message);
      
      if (result.files) {
        console.log('📁 Arquivos gerados:');
        result.files.forEach(file => {
          console.log(`   - ${file}`);
        });
      }
      
      if (result.preview) {
        console.log('\n📝 Preview:');
        console.log('---');
        console.log(result.preview);
        console.log('---');
      }
    } else {
      console.log('❌', result.message);
    }
    
    console.log(''); // Linha em branco para separação
  }

  showHelp() {
    console.log('📚 Comandos Disponíveis:');
    console.log('========================');
    console.log('');
    console.log('🎯 Comandos em Linguagem Natural:');
    console.log('  "escrever um e-book sobre [tema]"');
    console.log('  "criar um projeto [tipo]"');
    console.log('  "gerar uma API [tipo]"');
    console.log('  "criar um dashboard"');
    console.log('  "recuperar de erro"');
    console.log('');
    console.log('🔧 Comandos do Sistema:');
    console.log('  ajuda, help     - Mostra esta ajuda');
    console.log('  sair, exit      - Encerra o CLI');
    console.log('  limpar, clear   - Limpa a tela');
    console.log('  status          - Mostra status do sistema');
    console.log('');
    console.log('💡 Exemplos:');
    console.log('  kilo> escrever um e-book sobre React Hooks');
    console.log('  kilo> criar um projeto nextjs com dashboard');
    console.log('  kilo> gerar uma API REST com autenticação');
    console.log('  kilo> recuperar de erro no projeto');
  }

  showStatus() {
    console.log('📊 Status do Sistema:');
    console.log('====================');
    console.log(`✅ Actions carregadas: ${this.processor.actions.size}`);
    console.log(`✅ Prompts carregados: ${this.processor.prompts.size}`);
    console.log(`✅ ZAI SDK: ${this.processor.zai ? 'Conectado' : 'Desconectado'}`);
    console.log('');
    console.log('🎯 Intenções disponíveis:');
    Object.entries(this.processor.intents).forEach(([phrase, intent]) => {
      console.log(`   "${phrase}" → ${intent}`);
    });
  }
}

// Iniciar CLI se executado diretamente
if (require.main === module) {
  const cli = new KilloCLI();
  cli.start().catch(console.error);
}

module.exports = KilloCLI;