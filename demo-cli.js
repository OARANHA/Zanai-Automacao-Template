#!/usr/bin/env node
/**
 * Demonstração do Kilo CLI
 * Mostra como funcionaria a interação em linguagem natural
 */

const CommandProcessor = require('./src/services/commandProcessor');

async function demo() {
  console.log('🚀 Kilo Code CLI - Demonstração');
  console.log('================================');
  console.log('');
  
  // Inicializar o processador
  const processor = new CommandProcessor();
  await processor.initialize();
  
  // Lista de comandos de demonstração
  const demoCommands = [
    'escrever um e-book sobre React Hooks para desenvolvedores iniciantes',
    'criar um projeto nextjs com dashboard',
    'gerar uma API REST com autenticação',
    'recuperar de erro no projeto'
  ];
  
  // Executar cada comando
  for (const command of demoCommands) {
    console.log(`🔍 Comando: "${command}"`);
    console.log('---');
    
    const result = await processor.processCommand(command);
    
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
    
    console.log('\n' + '='.repeat(50) + '\n');
  }
  
  console.log('🎉 Demonstração concluída!');
  console.log('');
  console.log('💡 Para usar o sistema completo, execute:');
  console.log('   node src/cli/killo-cli.js');
}

// Executar demonstração
if (require.main === module) {
  demo().catch(console.error);
}

module.exports = demo;