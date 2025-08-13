/**
 * Kilo Code - Command Processor
 * Processa comandos em linguagem natural e executa actions correspondentes
 */

const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');
const ZAI = require('z-ai-web-dev-sdk');

class CommandProcessor {
  constructor() {
    this.actions = new Map();
    this.prompts = new Map();
    this.zai = null;
    this.intents = {
      'escrever e-book': 'ebook-generator',
      'criar e-book': 'ebook-generator',
      'gerar e-book': 'ebook-generator',
      'escrever livro': 'ebook-generator',
      'criar projeto': 'bootstrap-project',
      'iniciar projeto': 'bootstrap-project',
      'bootstrap': 'bootstrap-project',
      'gerar api': 'api-generator',
      'criar api': 'api-generator',
      'criar dashboard': 'dashboard-generator',
      'gerar dashboard': 'dashboard-generator',
      'recuperar erro': 'error-recovery',
      'corrigir erro': 'error-recovery'
    };
  }

  async initialize() {
    console.log('🚀 Inicializando Kilo Command Processor...');
    
    // Inicializar ZAI
    this.zai = await ZAI.create();
    
    // Carregar actions e prompts
    await this.loadActions();
    await this.loadPrompts();
    
    console.log('✅ Command Processor pronto!');
  }

  async loadActions() {
    const actionsPath = path.join('.killo-workspace', 'agent', 'actions');
    try {
      const files = await fs.readdir(actionsPath);
      
      for (const file of files) {
        if (file.endsWith('.yaml')) {
          const actionPath = path.join(actionsPath, file);
          const actionContent = await fs.readFile(actionPath, 'utf8');
          const actionConfig = yaml.load(actionContent);
          
          this.actions.set(actionConfig.name || file.replace('.yaml', ''), actionConfig);
          console.log(`📝 Action carregada: ${actionConfig.name || file}`);
        }
      }
    } catch (error) {
      console.warn('⚠️  Não foi possível carregar actions:', error.message);
    }
  }

  async loadPrompts() {
    const promptsPath = path.join('.killo-workspace', 'agent', 'prompts');
    try {
      const files = await fs.readdir(promptsPath);
      
      for (const file of files) {
        if (file.endsWith('.md')) {
          const promptPath = path.join(promptsPath, file);
          const promptContent = await fs.readFile(promptPath, 'utf8');
          const promptName = file.replace('.md', '');
          
          this.prompts.set(promptName, promptContent);
          console.log(`📄 Prompt carregado: ${promptName}`);
        }
      }
    } catch (error) {
      console.warn('⚠️  Não foi possível carregar prompts:', error.message);
    }
  }

  async processCommand(command) {
    console.log(`🔍 Processando comando: "${command}"`);
    
    try {
      // 1. Identificar intenção
      const intent = this.identifyIntent(command);
      console.log(`🎯 Intenção identificada: ${intent}`);
      
      if (!intent) {
        return {
          success: false,
          message: 'Não consegui entender o comando. Tente: "escrever um e-book sobre [tema]"'
        };
      }
      
      // 2. Extrair parâmetros
      const parameters = this.extractParameters(command, intent);
      console.log('📋 Parâmetros extraídos:', parameters);
      
      // 3. Executar ação correspondente
      const result = await this.executeIntent(intent, parameters);
      
      return result;
      
    } catch (error) {
      console.error('❌ Erro ao processar comando:', error);
      return {
        success: false,
        message: `Erro: ${error.message}`
      };
    }
  }

  identifyIntent(command) {
    const normalizedCommand = command.toLowerCase().trim();
    
    // Buscar por intenção exata
    for (const [phrase, intent] of Object.entries(this.intents)) {
      if (normalizedCommand.includes(phrase)) {
        return intent;
      }
    }
    
    // Se não encontrar, usar IA para identificar
    return this.identifyIntentWithAI(command);
  }

  async identifyIntentWithAI(command) {
    try {
      const prompt = `
        Analise o seguinte comando e identifique a intenção principal:
        
        Comando: "${command}"
        
        Possíveis intenções:
        - ebook-generator: para criar e-books ou livros
        - bootstrap-project: para criar ou iniciar projetos
        - api-generator: para gerar APIs
        - dashboard-generator: para criar dashboards
        - error-recovery: para recuperar de erros
        
        Responda apenas com o nome da intenção, sem explicações.
      `;
      
      const completion = await this.zai.chat.completions.create({
        messages: [
          { role: 'user', content: prompt }
        ],
        max_tokens: 50
      });
      
      const intent = completion.choices[0].message.content.trim();
      return this.intents[intent] || intent;
      
    } catch (error) {
      console.warn('⚠️  Não foi possível identificar intenção com IA:', error.message);
      return null;
    }
  }

  extractParameters(command, intent) {
    const parameters = { intent };
    
    switch (intent) {
      case 'ebook-generator':
        parameters.tema = this.extractTheme(command);
        parameters.publico_alvo = this.extractTargetAudience(command);
        parameters.linguagem = this.extractLanguage(command);
        parameters.extensao = this.extractExtension(command);
        break;
        
      case 'bootstrap-project':
        parameters.project_type = this.extractProjectType(command);
        parameters.template = this.extractTemplate(command);
        break;
        
      case 'api-generator':
        parameters.api_type = this.extractAPIType(command);
        parameters.features = this.extractFeatures(command);
        break;
    }
    
    return parameters;
  }

  extractTheme(command) {
    // Extrair tema usando expressões regulares
    const themePatterns = [
      /sobre\s+(.+?)(?:\s+para|\s+com|\s*\.|\s*$)/i,
      /(?:e-book|livro)\s+(.+?)(?:\s+para|\s+com|\s*\.|\s*$)/i
    ];
    
    for (const pattern of themePatterns) {
      const match = command.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
    
    return 'Tema não especificado';
  }

  extractTargetAudience(command) {
    const audiencePatterns = [
      /para\s+(.+?)(?:\s+com|\s*\.|\s*$)/i,
      /público\s+(.+?)(?:\s*\.|\s*$)/i
    ];
    
    for (const pattern of audiencePatterns) {
      const match = command.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
    
    return 'Desenvolvedores';
  }

  extractLanguage(command) {
    if (command.includes('formal')) return 'formal';
    if (command.includes('informal')) return 'informal';
    if (command.includes('técnico') || command.includes('tecnica')) return 'técnica';
    if (command.includes('didático') || command.includes('didatica')) return 'didática';
    return 'didática';
  }

  extractExtension(command) {
    if (command.includes('páginas')) {
      const match = command.match(/(\d+)\s*páginas/);
      return match ? `${match[1]} páginas` : '50 páginas';
    }
    return '50 páginas';
  }

  extractProjectType(command) {
    if (command.includes('nextjs') || command.includes('next')) return 'nextjs';
    if (command.includes('react')) return 'react';
    if (command.includes('vue')) return 'vue';
    if (command.includes('angular')) return 'angular';
    if (command.includes('node') || command.includes('api')) return 'node-api';
    return 'universal';
  }

  extractTemplate(command) {
    if (command.includes('dashboard')) return 'dashboard';
    if (command.includes('admin')) return 'admin';
    if (command.includes('api')) return 'api';
    return 'starter';
  }

  extractAPIType(command) {
    if (command.includes('rest')) return 'rest';
    if (command.includes('graphql')) return 'graphql';
    if (command.includes('grpc')) return 'grpc';
    return 'rest';
  }

  extractFeatures(command) {
    const features = [];
    if (command.includes('autenticação')) features.push('autenticação');
    if (command.includes('banco') || command.includes('database')) features.push('banco de dados');
    if (command.includes('cache')) features.push('cache');
    if (command.includes('logging')) features.push('logging');
    return features;
  }

  async executeIntent(intent, parameters) {
    console.log(`🚀 Executando intenção: ${intent}`);
    
    switch (intent) {
      case 'ebook-generator':
        return await this.generateEbook(parameters);
        
      case 'bootstrap-project':
        return await this.bootstrapProject(parameters);
        
      case 'api-generator':
        return await this.generateAPI(parameters);
        
      default:
        return {
          success: false,
          message: `Intenção não implementada: ${intent}`
        };
    }
  }

  async generateEbook(parameters) {
    console.log('📚 Gerando e-book...');
    
    try {
      // Carregar prompt do e-book generator
      const promptTemplate = this.prompts.get('ebook-generator');
      if (!promptTemplate) {
        throw new Error('Prompt ebook-generator não encontrado');
      }
      
      // Preparar contexto para o prompt
      const context = {
        tema: parameters.tema,
        publico_alvo: parameters.publico_alvo,
        linguagem: parameters.linguagem,
        extensao: parameters.extensao,
        capitulos: 10,
        formato_saida: ['pdf', 'epub'],
        incluir_midias: true
      };
      
      // Substituir variáveis no prompt
      let prompt = promptTemplate;
      for (const [key, value] of Object.entries(context)) {
        prompt = prompt.replace(new RegExp(`{{${key}}}`, 'g'), value);
      }
      
      // Enviar para ZAI
      const completion = await this.zai.chat.completions.create({
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: `Gere um e-book sobre ${context.tema} para ${context.publico_alvo}` }
        ],
        max_tokens: 4000
      });
      
      const ebookContent = completion.choices[0].message.content;
      
      // Criar diretório de saída
      const outputDir = path.join('output', 'ebooks');
      await fs.mkdir(outputDir, { recursive: true });
      
      // Salvar conteúdo do e-book
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const ebookPath = path.join(outputDir, `ebook_${timestamp}.md`);
      await fs.writeFile(ebookPath, ebookContent);
      
      // Executar action write-file
      await this.executeAction('write_to_file', {
        path: ebookPath,
        content: ebookContent,
        editor: true
      });
      
      return {
        success: true,
        message: `✅ E-book gerado com sucesso!`,
        files: [ebookPath],
        preview: ebookContent.substring(0, 500) + '...'
      };
      
    } catch (error) {
      console.error('❌ Erro ao gerar e-book:', error);
      return {
        success: false,
        message: `Erro ao gerar e-book: ${error.message}`
      };
    }
  }

  async bootstrapProject(parameters) {
    console.log('🚀 Bootstrap de projeto...');
    
    try {
      // Carregar action de bootstrap
      const bootstrapAction = this.actions.get('bootstrap-project');
      if (!bootstrapAction) {
        throw new Error('Action bootstrap-project não encontrada');
      }
      
      // Executar action
      await this.executeAction('bootstrap-project', {
        project_type: parameters.project_type,
        template: parameters.template
      });
      
      return {
        success: true,
        message: `✅ Projeto ${parameters.project_type} criado com template ${parameters.template}!`
      };
      
    } catch (error) {
      console.error('❌ Erro no bootstrap:', error);
      return {
        success: false,
        message: `Erro no bootstrap: ${error.message}`
      };
    }
  }

  async generateAPI(parameters) {
    console.log('🔧 Gerando API...');
    
    try {
      // Carregar prompt do API generator
      const promptTemplate = this.prompts.get('api-generator');
      if (!promptTemplate) {
        throw new Error('Prompt api-generator não encontrado');
      }
      
      // Enviar para ZAI
      const completion = await this.zai.chat.completions.create({
        messages: [
          { role: 'system', content: promptTemplate },
          { role: 'user', content: `Gere uma API ${parameters.api_type} com as seguintes features: ${parameters.features.join(', ')}` }
        ],
        max_tokens: 2000
      });
      
      const apiContent = completion.choices[0].message.content;
      
      // Salvar conteúdo da API
      const outputDir = path.join('output', 'apis');
      await fs.mkdir(outputDir, { recursive: true });
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const apiPath = path.join(outputDir, `api_${timestamp}.md`);
      await fs.writeFile(apiPath, apiContent);
      
      return {
        success: true,
        message: `✅ API ${parameters.api_type} gerada com sucesso!`,
        files: [apiPath],
        preview: apiContent.substring(0, 300) + '...'
      };
      
    } catch (error) {
      console.error('❌ Erro ao gerar API:', error);
      return {
        success: false,
        message: `Erro ao gerar API: ${error.message}`
      };
    }
  }

  async executeAction(actionName, parameters) {
    const action = this.actions.get(actionName);
    if (!action) {
      throw new Error(`Action não encontrada: ${actionName}`);
    }
    
    console.log(`🔧 Executando action: ${actionName}`);
    
    // Simular execução dos steps (implementação real seria mais complexa)
    if (action.steps) {
      for (const step of action.steps) {
        console.log(`  📋 Step: ${step.name}`);
        // Aqui executaria o step real
      }
    }
    
    console.log(`✅ Action ${actionName} concluída`);
  }
}

module.exports = CommandProcessor;