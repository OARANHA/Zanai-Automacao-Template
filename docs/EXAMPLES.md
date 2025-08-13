# 💡 Exemplos Práticos de Uso

<div align="center">

![Practical Examples](https://img.shields.io/badge/Examples-v2.0.0-yellow?style=for-the-badge&logo=github&logoColor=white)
![Use Cases](https://img.shields.io/badge/Use%20Cases-Real%20World-blue?style=for-the-badge&logo=examples&logoColor=white)
![Tutorials](https://img.shields.io/badge/Tutorials-Step%20by%20Step-green?style=for-the-badge&logo=tutorial&logoColor=white)

**Exemplos práticos e tutoriais passo a passo para usar o Kilo Code**

</div>

---

## 📋 Índice

- [Exemplos Básicos](#-exemplos-básicos)
- [Exemplos Intermediários](#-exemplos-intermediários)
- [Exemplos Avançados](#-exemplos-avançados)
- [Casos de Uso Reais](#-casos-de-uso-reais)
- [Integrações Práticas](#-integrações-práticas)
- [Scripts de Automação](#-scripts-de-automação)
- [Soluções de Problemas](#-soluções-de-problemas)
- [Dicas e Truques](#-dicas-e-truques)

---

## 🚀 Exemplos Básicos

### Exemplo 1: Primeiro E-book

Vamos criar seu primeiro e-book usando o Kilo Code.

#### Passo a Passo

```bash
# 1. Iniciar o CLI
npm run cli

# 2. Digitar o comando
killo> escrever um e-book sobre JavaScript para iniciantes

# 3. Resultado esperado
🚀 Kilo Code CLI - Sistema Autônomo de Desenvolvimento
====================================================
Digite "ajuda" para ver comandos disponíveis ou "sair" para encerrar

🔍 Processando comando: "escrever um e-book sobre JavaScript para iniciantes"
🎯 Intenção identificada: ebook-generator
📋 Parâmetros extraídos: { tema: "JavaScript", publico_alvo: "iniciantes", linguagem: "didática", extensao: "50 páginas" }
🚀 Executando intenção: ebook-generator
📚 Gerando e-book...
✅ E-book gerado com sucesso!
📁 Arquivos gerados:
   - output/ebooks/ebook_2025-08-13T04-53-27Z.md

📝 Preview:
---
# JavaScript: Guia Completo para Iniciantes

## Introdução
Bem-vindo ao mundo do JavaScript! Esta linguagem de programação revolucionou a web e se tornou uma das mais populares do mundo...

## Capítulo 1: O que é JavaScript?
JavaScript é uma linguagem de programação de alto nível, interpretada e multi-paradigma. Foi criada por Brendan Eich em 1995...

## Capítulo 2: Configurando seu Ambiente
Para começar a programar em JavaScript, você precisará de algumas ferramentas básicas...

---

# Índice Completo
1. O que é JavaScript?
2. Configurando seu Ambiente
3. Sintaxe Básica
4. Variáveis e Tipos de Dados
5. Operadores
6. Estruturas de Controle
7. Funções
8. Arrays e Objetos
9. DOM Manipulation
10. Eventos
11. Async/Await
12. ES6+ Features
13. Boas Práticas
14. Próximos Passos

---

## Sobre este E-book
Este e-book foi gerado automaticamente pelo Kilo Code, um sistema autônomo de desenvolvimento.

**Detalhes:**
- **Tema**: JavaScript
- **Público-alvo**: iniciantes
- **Linguagem**: didática
- **Extensão**: 50 páginas
- **Gerado em**: 2025-08-13T04:53:27Z
- **Versão**: 2.0.0

---

killo>
```

#### Verificar o Arquivo Gerado

```bash
# Verificar o arquivo completo
cat output/ebooks/ebook_2025-08-13T04-53-27Z.md

# Verificar o diretório de saída
ls -la output/ebooks/
```

### Exemplo 2: Criando um Projeto Next.js

Vamos criar um projeto Next.js completo com dashboard.

#### Passo a Passo

```bash
# 1. Iniciar o CLI
npm run cli

# 2. Digitar o comando
killo> criar um projeto nextjs com dashboard

# 3. Resultado esperado
🔍 Processando comando: "criar um projeto nextjs com dashboard"
🎯 Intenção identificada: bootstrap-project
📋 Parâmetros extraídos: { project_type: "nextjs", template: "dashboard" }
🚀 Executando intenção: bootstrap-project
🚀 Bootstrap de projeto...
✅ Projeto nextjs criado com template dashboard!
📁 Arquivos gerados:
   - projects/nextjs-dashboard/
   - projects/nextjs-dashboard/package.json
   - projects/nextjs-dashboard/src/
   - projects/nextjs-dashboard/README.md
```

#### Explorar o Projeto Criado

```bash
# Navegar para o projeto
cd projects/nextjs-dashboard

# Verificar estrutura
ls -la

# Verificar package.json
cat package.json

# Instalar dependências
npm install

# Iniciar o projeto
npm run dev
```

#### Estrutura do Projeto Criado

```
projects/nextjs-dashboard/
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── dashboard/
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   └── dashboard/
│   │       ├── sidebar.tsx
│   │       ├── header.tsx
│   │       └── stats.tsx
│   └── lib/
│       └── utils.ts
├── public/
│   ├── favicon.ico
│   └── vercel.svg
└── README.md
```

### Exemplo 3: Gerando uma API REST

Vamos gerar uma API REST completa com autenticação.

#### Passo a Passo

```bash
# 1. Iniciar o CLI
npm run cli

# 2. Digitar o comando
killo> gerar uma API REST com autenticação e banco de dados

# 3. Resultado esperado
🔍 Processando comando: "gerar uma API REST com autenticação e banco de dados"
🎯 Intenção identificada: api-generator
📋 Parâmetros extraídos: { api_type: "rest", features: ["autenticação", "banco de dados"] }
🚀 Executando intenção: api-generator
🔧 Gerando API...
✅ API REST gerada com sucesso!
📁 Arquivos gerados:
   - output/apis/api_2025-08-13T04-53-27Z.md
```

#### Verificar a API Gerada

```bash
# Verificar o arquivo da API
cat output/apis/api_2025-08-13T04-53-27Z.md

# Conteúdo esperado:
# API REST Completa com Autenticação e Banco de Dados

## Visão Geral
Esta API REST foi gerada automaticamente pelo Kilo Code e inclui:

- **Autenticação JWT**: Sistema completo de autenticação baseado em tokens
- **Banco de Dados**: Integração com PostgreSQL usando Prisma ORM
- **CRUD Operations**: Operações completas de Create, Read, Update, Delete
- **Validação**: Validação de entrada com Zod
- **Documentação**: Documentação automática com Swagger
- **Segurança**: Headers de segurança, rate limiting, CORS

## Estrutura do Projeto
```
api-rest/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   └── health.controller.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   └── health.routes.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── error.middleware.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── user.service.ts
│   ├── utils/
│   │   ├── jwt.utils.ts
│   │   └── validation.utils.ts
│   └── config/
│       └── database.ts
├── prisma/
│   └── schema.prisma
├── package.json
├── tsconfig.json
└── README.md
```

## Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout de usuário

### Usuários
- `GET /api/users` - Listar todos os usuários
- `GET /api/users/:id` - Obter usuário por ID
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

### Health Check
- `GET /api/health` - Verificar saúde da API
```

---

## 🔧 Exemplos Intermediários

### Exemplo 4: Recuperação de Sistema

Vamos simular uma falha e recuperar o sistema.

#### Simular Falha

```bash
# 1. Excluir arquivo crítico
rm .killo-workspace/agent/agent.yaml

# 2. Corromper arquivo de configuração
echo "corrupted" > package.json

# 3. Tentar iniciar o sistema (vai falhar)
npm run cli
# Erro: Cannot find module '.killo-workspace/agent/agent.yaml'
```

#### Recuperar o Sistema

```bash
# 1. Iniciar CLI mesmo com erro
npm run cli

# 2. Executar recuperação
killo> recuperar erro no projeto

# 3. Resultado esperado
🔍 Processando comando: "recuperar erro no projeto"
🎯 Intenção identificada: error-recovery
📋 Parâmetros extraídos: { tipo_erro: "sistema", severidade: "crítico" }
🚀 Executando intenção: error-recovery
🔍 Falha detectada: Arquivo crítico ausente
📁 Arquivo: .killo-workspace/agent/agent.yaml
📋 Estratégia: Restaurar do backup
✅ Backup encontrado: backups/daily_2025-08-13_agent.yaml
🔄 Arquivo restaurado: Validado com sucesso
🔍 Falha detectada: Arquivo corrompido
📁 Arquivo: package.json
📋 Estratégia: Reparar corrupção
🧹 Reparo aplicado: JSON corrigido e formatado
✅ Validação: Arquivo íntegro e funcional
✅ Sistema recuperado: Todos os componentes operacionais
```

#### Verificar Recuperação

```bash
# Verificar se os arquivos foram restaurados
ls -la .killo-workspace/agent/agent.yaml
cat package.json

# Testar o sistema novamente
npm run cli
killo> status
```

### Exemplo 5: Usando a API REST

Vamos usar a API REST para integração com outras aplicações.

#### Servidor Node.js com API

```javascript
// api-client.js
const fetch = require('node-fetch');

class KiloCodeAPIClient {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async indexFiles(rootPath) {
    const response = await fetch(`${this.baseUrl}/semantic-search/index`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        root: rootPath,
        options: {
          include: ['*.js', '*.ts', '*.md'],
          exclude: ['node_modules/**']
        }
      })
    });

    return await response.json();
  }

  async searchContent(query, options = {}) {
    const response = await fetch(`${this.baseUrl}/semantic-search/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        options: {
          limit: 10,
          threshold: 0.7,
          ...options
        }
      })
    });

    return await response.json();
  }

  async readFile(filePath) {
    const response = await fetch(`${this.baseUrl}/semantic-search/read-file`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filePath,
        mode: 'content'
      })
    });

    return await response.json();
  }

  async executeAgentCommand(command) {
    const response = await fetch(`${this.baseUrl}/agent/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        command,
        options: {
          async: true,
          timeout: 30000
        }
      })
    });

    return await response.json();
  }
}

// Exemplo de uso
async function exemploAPI() {
  const client = new KiloCodeAPIClient();

  try {
    // 1. Indexar arquivos
    console.log('Indexando arquivos...');
    const indexResult = await client.indexFiles('./src');
    console.log('Indexação:', indexResult);

    // 2. Buscar conteúdo
    console.log('\nBuscando conteúdo...');
    const searchResult = await client.searchContent('componentes React');
    console.log('Resultados da busca:', searchResult);

    // 3. Ler arquivo
    console.log('\nLendo arquivo...');
    const fileResult = await client.readFile('./src/app.js');
    console.log('Conteúdo do arquivo:', fileResult.content?.substring(0, 100) + '...');

    // 4. Executar comando do agente
    console.log('\nExecutando comando do agente...');
    const agentResult = await client.executeAgentCommand('escrever um e-book sobre Node.js');
    console.log('Resultado do agente:', agentResult);

  } catch (error) {
    console.error('Erro:', error.message);
  }
}

// Executar exemplo
exemploAPI();
```

#### Executar o Cliente

```bash
# 1. Iniciar o servidor Kilo Code
npm start &

# 2. Esperar o servidor iniciar
sleep 5

# 3. Executar o cliente API
node api-client.js

# 4. Resultado esperado
Indexando arquivos...
Indexação: {
  success: true,
  message: 'Indexação concluída',
  result: {
    indexed_files: 15,
    processing_time: 2.3,
    status: 'completed'
  }
}

Buscando conteúdo...
Resultados da busca: {
  success: true,
  result: {
    matches: [
      {
        file: './src/components/Button.js',
        score: 0.85,
        context: 'export default function Button() { return <button>Click</button>; }',
        line: 1
      }
    ],
    total_matches: 1,
    query: 'componentes React'
  }
}

Lendo arquivo...
Conteúdo do arquivo: const express = require('express');...

Executando comando do agente...
Resultado do agente: {
  success: true,
  result: {
    command: 'escrever um e-book sobre Node.js',
    output: '✅ E-book gerado com sucesso!',
    files: ['output/ebooks/ebook_2025-08-13T04-53-27Z.md'],
    execution_time: 5.2
  }
}
```

### Exemplo 6: Script de Automação

Vamos criar um script de automação completo.

#### Script de Automação

```bash
#!/bin/bash
# automation.sh - Script de automação do Kilo Code

echo "🚀 Iniciando automação do Kilo Code..."
echo "=================================="

# Configurações
PROJECT_NAME="kilo-automation"
OUTPUT_DIR="./output/automation"
LOG_FILE="./logs/automation.log"

# Criar diretórios
mkdir -p "$OUTPUT_DIR"
mkdir -p "./logs"

# Função de log
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# 1. Verificar saúde do sistema
log "🔍 Verificando saúde do sistema..."
npm run health-check
if [ $? -eq 0 ]; then
    log "✅ Sistema saudável"
else
    log "❌ Sistema com problemas, tentando recuperar..."
    echo "recuperar erro no projeto" | npm run cli
fi

# 2. Indexar arquivos
log "🔍 Indexando arquivos..."
npm run kindex
log "✅ Arquivos indexados"

# 3. Gerar e-book sobre React
log "📚 Gerando e-book sobre React..."
echo "escrever um e-book sobre React Hooks para desenvolvedores" | npm run cli
log "✅ E-book gerado"

# 4. Criar projeto Next.js
log "🚀 Criando projeto Next.js..."
echo "criar projeto nextjs com dashboard" | npm run cli
log "✅ Projeto Next.js criado"

# 5. Gerar API REST
log "🔧 Gerando API REST..."
echo "gerar api REST com autenticação" | npm run cli
log "✅ API REST gerada"

# 6. Verificar resultados
log "📋 Verificando resultados gerados..."

if [ -d "$OUTPUT_DIR" ]; then
    log "📁 Arquivos gerados:"
    find "$OUTPUT_DIR" -type f | head -10
fi

if [ -d "projects" ]; then
    log "📁 Projetos criados:"
    ls -la projects/
fi

# 7. Gerar relatório
log "📊 Gerando relatório de automação..."
cat > "$OUTPUT_DIR/automation-report.md" << EOF
# Relatório de Automação Kilo Code

**Data:** $(date '+%Y-%m-%d %H:%M:%S')
**Projeto:** $PROJECT_NAME
**Status:** Concluído

## Tarefas Executadas
- [x] Verificação de saúde do sistema
- [x] Indexação de arquivos
- [x] Geração de e-book sobre React Hooks
- [x] Criação de projeto Next.js com dashboard
- [x] Geração de API REST com autenticação

## Arquivos Gerados
$(find "$OUTPUT_DIR" -type f -exec echo "- {}" \;)

## Projetos Criados
$(find projects -maxdepth 1 -type d -exec echo "- {}" \;)

## Logs
Verifique o arquivo: $LOG_FILE

---
*Relatório gerado automaticamente pelo Kilo Code*
EOF

log "✅ Relatório gerado: $OUTPUT_DIR/automation-report.md"

# 8. Finalizar
log "🎉 Automação concluída com sucesso!"
echo "=================================="
echo "📊 Relatório: $OUTPUT_DIR/automation-report.md"
echo "📋 Logs: $LOG_FILE"
echo "🚀 Automação finalizada em $(date '+%Y-%m-%d %H:%M:%S')"
```

#### Executar o Script

```bash
# 1. Dar permissão de execução
chmod +x automation.sh

# 2. Executar o script
./automation.sh

# 3. Resultado esperado
🚀 Iniciando automação do Kilo Code...
==================================
[2025-08-13 04:53:27] 🔍 Verificando saúde do sistema...
🚀 Kilo Code Health Check
=======================
✅ Node.js: v16.0.0
✅ npm: 8.0.0
✅ Git: 2.20.0
✅ Configuração: OK
✅ Dependências: OK
✅ Scripts: OK
✅ Permissões: OK
✅ Sistema: Saudável
[2025-08-13 04:53:27] ✅ Sistema saudável
[2025-08-13 04:53:27] 🔍 Indexando arquivos...
Indexing files in: ./
Found: 150 files
Indexing completed in 2.3s
[2025-08-13 04:53:27] ✅ Arquivos indexados
[2025-08-13 04:53:27] 📚 Gerando e-book sobre React...
🚀 Kilo Code CLI - Sistema Autônomo de Desenvolvimento
====================================================
🔍 Processando comando: "escrever um e-book sobre React Hooks para desenvolvedores"
🎯 Intenção identificada: ebook-generator
📚 Gerando e-book...
✅ E-book gerado com sucesso!
[2025-08-13 04:53:27] ✅ E-book gerado
[2025-08-13 04:53:27] 🚀 Criando projeto Next.js...
🚀 Kilo Code CLI - Sistema Autônomo de Desenvolvimento
====================================================
🔍 Processando comando: "criar projeto nextjs com dashboard"
🎯 Intenção identificada: bootstrap-project
🚀 Bootstrap de projeto...
✅ Projeto nextjs criado com template dashboard!
[2025-08-13 04:53:27] ✅ Projeto Next.js criado
[2025-08-13 04:53:27] 🔧 Gerando API REST...
🚀 Kilo Code CLI - Sistema Autônomo de Desenvolvimento
====================================================
🔍 Processando comando: "gerar api REST com autenticação"
🎯 Intenção identificada: api-generator
🔧 Gerando API...
✅ API REST gerada com sucesso!
[2025-08-13 04:53:27] ✅ API REST gerada
[2025-08-13 04:53:27] 📋 Verificando resultados gerados...
📁 Arquivos gerados:
./output/automation/ebooks/ebook_2025-08-13T04-53-27Z.md
./output/automation/apis/api_2025-08-13T04-53-27Z.md
📁 Projetos criados:
projects
projects/nextjs-dashboard
[2025-08-13 04:53:27] 📊 Gerando relatório de automação...
[2025-08-13 04:53:27] ✅ Relatório gerado: ./output/automation/automation-report.md
[2025-08-13 04:53:27] 🎉 Automação concluída com sucesso!
==================================
📊 Relatório: ./output/automation/automation-report.md
📋 Logs: ./logs/automation.log
🚀 Automação finalizada em 2025-08-13 04:53:27
```

---

## 🎓 Exemplos Avançados

### Exemplo 7: Integração com VSCode

Vamos criar uma extensão VSCode que integra com o Kilo Code.

#### Extensão VSCode Básica

```typescript
// src/extension.ts
import * as vscode from 'vscode';
import { KiloCodeAPIClient } from './api-client';

export function activate(context: vscode.ExtensionContext) {
    console.log('Kilo Code Extension está ativa!');

    const client = new KiloCodeAPIClient();

    // Comando para gerar e-book
    let generateEbook = vscode.commands.registerCommand('kilo-code.generateEbook', async () => {
        const topic = await vscode.window.showInputBox({
            placeHolder: 'Digite o tema do e-book',
            prompt: 'Sobre qual tema você quer gerar um e-book?'
        });

        if (topic) {
            vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Gerando e-book...",
                cancellable: false
            }, async (progress) => {
                progress.report({ increment: 0 });
                
                try {
                    const result = await client.executeAgentCommand(`escrever um e-book sobre ${topic}`);
                    
                    if (result.success) {
                        progress.report({ increment: 100 });
                        vscode.window.showInformationMessage(`E-book sobre "${topic}" gerado com sucesso!`);
                        
                        // Abrir o arquivo gerado
                        const file = result.result.files[0];
                        const uri = vscode.Uri.file(file);
                        await vscode.window.showTextDocument(uri);
                    } else {
                        throw new Error(result.message);
                    }
                } catch (error) {
                    vscode.window.showErrorMessage(`Erro ao gerar e-book: ${error.message}`);
                }
            });
        }
    });

    // Comando para criar projeto
    let createProject = vscode.commands.registerCommand('kilo-code.createProject', async () => {
        const projectTypes = ['nextjs', 'react', 'vue', 'angular', 'node'];
        const templates = ['starter', 'dashboard', 'admin', 'api'];
        
        const projectType = await vscode.window.showQuickPick(projectTypes, {
            placeHolder: 'Selecione o tipo de projeto'
        });
        
        const template = await vscode.window.showQuickPick(templates, {
            placeHolder: 'Selecione o template'
        });

        if (projectType && template) {
            vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Criando projeto...",
                cancellable: false
            }, async (progress) => {
                progress.report({ increment: 0 });
                
                try {
                    const result = await client.executeAgentCommand(`criar projeto ${projectType} com ${template}`);
                    
                    if (result.success) {
                        progress.report({ increment: 100 });
                        vscode.window.showInformationMessage(`Projeto ${projectType} criado com sucesso!`);
                        
                        // Abrir a pasta do projeto
                        const projectPath = result.result.files[0];
                        const uri = vscode.Uri.file(projectPath);
                        await vscode.commands.executeCommand('vscode.openFolder', uri);
                    } else {
                        throw new Error(result.message);
                    }
                } catch (error) {
                    vscode.window.showErrorMessage(`Erro ao criar projeto: ${error.message}`);
                }
            });
        }
    });

    // Comando para buscar código
    let searchCode = vscode.commands.registerCommand('kilo-code.searchCode', async () => {
        const query = await vscode.window.showInputBox({
            placeHolder: 'Digite sua busca',
            prompt: 'O que você está procurando no código?'
        });

        if (query) {
            try {
                const result = await client.searchContent(query);
                
                if (result.success && result.result.matches.length > 0) {
                    // Mostrar resultados no QuickPick
                    const items = result.result.matches.map(match => ({
                        label: match.file,
                        description: `Score: ${match.score}`,
                        detail: match.context,
                        file: match.file,
                        line: match.line
                    }));
                    
                    const selected = await vscode.window.showQuickPick(items, {
                        placeHolder: 'Selecione um resultado'
                    });
                    
                    if (selected) {
                        const uri = vscode.Uri.file(selected.file);
                        const document = await vscode.workspace.openTextDocument(uri);
                        await vscode.window.showTextDocument(document);
                        
                        // Ir para a linha específica
                        const editor = vscode.window.activeTextEditor;
                        if (editor) {
                            const position = new vscode.Position(selected.line - 1, 0);
                            editor.selection = new vscode.Selection(position, position);
                            editor.revealRange(new vscode.Range(position, position));
                        }
                    }
                } else {
                    vscode.window.showInformationMessage('Nenhum resultado encontrado.');
                }
            } catch (error) {
                vscode.window.showErrorMessage(`Erro ao buscar: ${error.message}`);
            }
        }
    });

    // Comando para recuperar sistema
    let recoverSystem = vscode.commands.registerCommand('kilo-code.recoverSystem', async () => {
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Recuperando sistema...",
            cancellable: false
        }, async (progress) => {
            progress.report({ increment: 0 });
            
            try {
                const result = await client.executeAgentCommand('recuperar erro no projeto');
                
                if (result.success) {
                    progress.report({ increment: 100 });
                    vscode.window.showInformationMessage('Sistema recuperado com sucesso!');
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                vscode.window.showErrorMessage(`Erro ao recuperar sistema: ${error.message}`);
            }
        });
    });

    context.subscriptions.push(generateEbook);
    context.subscriptions.push(createProject);
    context.subscriptions.push(searchCode);
    context.subscriptions.push(recoverSystem);
}

export function deactivate() {
    console.log('Kilo Code Extension desativada!');
}
```

#### Cliente API para VSCode

```typescript
// src/api-client.ts
import * as vscode from 'vscode';

export class KiloCodeAPIClient {
    private baseUrl: string;

    constructor(baseUrl = 'http://localhost:3000') {
        this.baseUrl = baseUrl;
    }

    private async request(endpoint: string, options: any = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    }

    async executeAgentCommand(command: string) {
        return await this.request('/agent/execute', {
            method: 'POST',
            body: JSON.stringify({
                command,
                options: {
                    async: true,
                    timeout: 30000
                }
            })
        });
    }

    async searchContent(query: string, options: any = {}) {
        return await this.request('/semantic-search/search', {
            method: 'POST',
            body: JSON.stringify({
                query,
                options: {
                    limit: 10,
                    threshold: 0.7,
                    ...options
                }
            })
        });
    }

    async indexFiles(rootPath: string) {
        return await this.request('/semantic-search/index', {
            method: 'POST',
            body: JSON.stringify({
                root: rootPath,
                options: {
                    include: ['*.js', '*.ts', '*.jsx', '*.tsx', '*.md'],
                    exclude: ['node_modules/**', '.git/**']
                }
            })
        });
    }

    async readFile(filePath: string) {
        return await this.request('/semantic-search/read-file', {
            method: 'POST',
            body: JSON.stringify({
                filePath,
                mode: 'content'
            })
        });
    }

    async getSystemHealth() {
        return await this.request('/system/health');
    }
}
```

#### Package.json da Extensão

```json
{
  "name": "kilo-code-vscode",
  "displayName": "Kilo Code",
  "description": "Integração do Kilo Code com VSCode",
  "version": "1.0.0",
  "engines": {
    "vscode": "^1.60.0"
  },
  "categories": [
    "Other",
    "Programming Languages"
  ],
  "activationEvents": [
    "onCommand:kilo-code.generateEbook",
    "onCommand:kilo-code.createProject",
    "onCommand:kilo-code.searchCode",
    "onCommand:kilo-code.recoverSystem"
  ],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "kilo-code.generateEbook",
        "title": "Kilo Code: Gerar E-book"
      },
      {
        "command": "kilo-code.createProject",
        "title": "Kilo Code: Criar Projeto"
      },
      {
        "command": "kilo-code.searchCode",
        "title": "Kilo Code: Buscar Código"
      },
      {
        "command": "kilo-code.recoverSystem",
        "title": "Kilo Code: Recuperar Sistema"
      }
    ],
    "keybindings": [
      {
        "command": "kilo-code.searchCode",
        "key": "ctrl+shift+f",
        "mac": "cmd+shift+f"
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./"
  },
  "devDependencies": {
    "@types/vscode": "^1.60.0",
    "@types/node": "^16.0.0",
    "typescript": "^4.4.0"
  }
}
```

### Exemplo 8: Dashboard de Monitoramento

Vamos criar um dashboard de monitoramento para o Kilo Code.

#### Dashboard HTML

```html
<!-- dashboard.html -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kilo Code Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .dashboard {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        .header p {
            font-size: 1.2em;
            opacity: 0.9;
        }

        .content {
            padding: 30px;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .stat-card h3 {
            font-size: 2em;
            margin-bottom: 10px;
        }

        .stat-card p {
            font-size: 1.1em;
            opacity: 0.9;
        }

        .charts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .chart-card {
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .chart-card h3 {
            margin-bottom: 15px;
            color: #333;
        }

        .controls {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
            transition: all 0.3s ease;
        }

        .btn-primary {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
        }

        .btn-secondary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .logs {
            background: #f8f9fa;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            padding: 20px;
            max-height: 300px;
            overflow-y: auto;
        }

        .logs h3 {
            margin-bottom: 15px;
            color: #333;
        }

        .log-entry {
            padding: 8px;
            margin-bottom: 5px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 0.9em;
        }

        .log-info {
            background: #e3f2fd;
            color: #1976d2;
        }

        .log-success {
            background: #e8f5e8;
            color: #2e7d32;
        }

        .log-error {
            background: #ffebee;
            color: #c62828;
        }

        .status-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
        }

        .status-online {
            background: #4caf50;
            box-shadow: 0 0 10px #4caf50;
        }

        .status-offline {
            background: #f44336;
            box-shadow: 0 0 10px #f44336;
        }

        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-left: 10px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
            .stats-grid {
                grid-template-columns: 1fr;
            }
            
            .charts-grid {
                grid-template-columns: 1fr;
            }
            
            .controls {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="header">
            <h1>🚀 Kilo Code Dashboard</h1>
            <p>Monitoramento e Controle do Sistema Autônomo</p>
        </div>
        
        <div class="content">
            <div class="controls">
                <button class="btn btn-primary" onclick="refreshData()">
                    🔄 Atualizar Dados
                </button>
                <button class="btn btn-secondary" onclick="executeCommand()">
                    ⚡ Executar Comando
                </button>
                <button class="btn btn-secondary" onclick="recoverSystem()">
                    🛠️ Recuperar Sistema
                </button>
                <button class="btn btn-secondary" onclick="clearLogs()">
                    🗑️ Limpar Logs
                </button>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <h3 id="uptime">0</h3>
                    <p>Uptime (segundos)</p>
                </div>
                <div class="stat-card">
                    <h3 id="requests">0</h3>
                    <p>Total de Requisições</p>
                </div>
                <div class="stat-card">
                    <h3 id="success-rate">0%</h3>
                    <p>Taxa de Sucesso</p>
                </div>
                <div class="stat-card">
                    <h3 id="agents">0</h3>
                    <p>Agentes Ativos</p>
                </div>
            </div>

            <div class="charts-grid">
                <div class="chart-card">
                    <h3>📊 Desempenho do Sistema</h3>
                    <canvas id="performanceChart"></canvas>
                </div>
                <div class="chart-card">
                    <h3>🎯 Status dos Agentes</h3>
                    <canvas id="agentsChart"></canvas>
                </div>
            </div>

            <div class="logs">
                <h3>📋 Logs do Sistema</h3>
                <div id="logs-container">
                    <div class="log-entry log-info">
                        <span class="status-indicator status-online"></span>
                        Sistema iniciado e pronto para uso
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Configuração dos gráficos
        const performanceCtx = document.getElementById('performanceChart').getContext('2d');
        const agentsCtx = document.getElementById('agentsChart').getContext('2d');

        const performanceChart = new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Tempo de Resposta (ms)',
                    data: [],
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        const agentsChart = new Chart(agentsCtx, {
            type: 'doughnut',
            data: {
                labels: ['Ativos', 'Inativos', 'Em Recuperação'],
                datasets: [{
                    data: [0, 0, 0],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(255, 205, 86, 0.8)'
                    ]
                }]
            },
            options: {
                responsive: true
            }
        });

        // Funções de interação
        async function refreshData() {
            addLog('Atualizando dados do sistema...', 'info');
            
            try {
                // Simular atualização de dados
                const response = await fetch('/system/metrics');
                const data = await response.json();
                
                updateStats(data);
                updateCharts(data);
                addLog('Dados atualizados com sucesso', 'success');
            } catch (error) {
                addLog('Erro ao atualizar dados: ' + error.message, 'error');
            }
        }

        function updateStats(data) {
            document.getElementById('uptime').textContent = data.uptime || 0;
            document.getElementById('requests').textContent = data.requests_total || 0;
            document.getElementById('success-rate').textContent = 
                ((data.success_rate || 0) * 100).toFixed(1) + '%';
            document.getElementById('agents').textContent = data.agents?.active || 0;
        }

        function updateCharts(data) {
            // Atualizar gráfico de performance
            const now = new Date().toLocaleTimeString();
            performanceChart.data.labels.push(now);
            performanceChart.data.datasets[0].data.push(data.average_response_time || 0);
            
            if (performanceChart.data.labels.length > 10) {
                performanceChart.data.labels.shift();
                performanceChart.data.datasets[0].data.shift();
            }
            
            performanceChart.update();

            // Atualizar gráfico de agentes
            if (data.agents) {
                agentsChart.data.datasets[0].data = [
                    data.agents.active || 0,
                    data.agents.inactive || 0,
                    data.agents.recovering || 0
                ];
                agentsChart.update();
            }
        }

        async function executeCommand() {
            const command = prompt('Digite o comando para executar:');
            if (!command) return;

            addLog(`Executando comando: ${command}`, 'info');
            
            try {
                const response = await fetch('/agent/execute', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        command,
                        options: { async: true }
                    })
                });

                const result = await response.json();
                
                if (result.success) {
                    addLog('Comando executado com sucesso', 'success');
                } else {
                    addLog('Erro ao executar comando: ' + result.message, 'error');
                }
            } catch (error) {
                addLog('Erro ao executar comando: ' + error.message, 'error');
            }
        }

        async function recoverSystem() {
            if (!confirm('Tem certeza que deseja recuperar o sistema?')) return;

            addLog('Iniciando recuperação do sistema...', 'info');
            
            try {
                const response = await fetch('/agent/execute', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        command: 'recuperar erro no projeto',
                        options: { async: true }
                    })
                });

                const result = await response.json();
                
                if (result.success) {
                    addLog('Sistema recuperado com sucesso', 'success');
                } else {
                    addLog('Erro ao recuperar sistema: ' + result.message, 'error');
                }
            } catch (error) {
                addLog('Erro ao recuperar sistema: ' + error.message, 'error');
            }
        }

        function addLog(message, type = 'info') {
            const logsContainer = document.getElementById('logs-container');
            const logEntry = document.createElement('div');
            logEntry.className = `log-entry log-${type}`;
            
            const timestamp = new Date().toLocaleTimeString();
            const statusClass = type === 'success' ? 'status-online' : 'status-offline';
            
            logEntry.innerHTML = `
                <span class="status-indicator ${statusClass}"></span>
                [${timestamp}] ${message}
            `;
            
            logsContainer.appendChild(logEntry);
            logsContainer.scrollTop = logsContainer.scrollHeight;
        }

        function clearLogs() {
            document.getElementById('logs-container').innerHTML = '';
            addLog('Logs limpos', 'info');
        }

        // Inicialização
        document.addEventListener('DOMContentLoaded', function() {
            addLog('Dashboard carregado com sucesso', 'success');
            refreshData();
            
            // Atualizar dados a cada 30 segundos
            setInterval(refreshData, 30000);
        });
    </script>
</body>
</html>
```

#### Servidor para o Dashboard

```javascript
// dashboard-server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// Servir arquivos estáticos
app.use(express.static(__dirname));
app.use(express.json());

// Rota para métricas do sistema
app.get('/system/metrics', (req, res) => {
    // Simular métricas do sistema
    const metrics = {
        uptime: Math.floor(Math.random() * 86400), // até 24 horas
        requests_total: Math.floor(Math.random() * 1000),
        success_rate: 0.85 + Math.random() * 0.15, // 85-100%
        average_response_time: Math.floor(Math.random() * 500), // até 500ms
        agents: {
            active: Math.floor(Math.random() * 5) + 3, // 3-8 agentes
            inactive: Math.floor(Math.random() * 2),
            recovering: Math.floor(Math.random() * 2)
        }
    };

    res.json(metrics);
});

// Rota para executar comandos do agente
app.post('/agent/execute', (req, res) => {
    const { command } = req.body;
    
    // Simular execução do comando
    setTimeout(() => {
        const result = {
            success: Math.random() > 0.1, // 90% de sucesso
            message: `Comando "${command}" executado`,
            result: {
                command,
                execution_time: Math.floor(Math.random() * 5000) + 1000
            }
        };

        res.json(result);
    }, Math.random() * 2000 + 1000); // 1-3 segundos de delay
});

app.listen(port, () => {
    console.log(`Dashboard server running at http://localhost:${port}`);
});
```

#### Executar o Dashboard

```bash
# 1. Iniciar o servidor Kilo Code
npm start &

# 2. Iniciar o servidor do dashboard
node dashboard-server.js &

# 3. Abrir o dashboard no navegador
# Abra http://localhost:8080/dashboard.html
```

---

## 🌍 Casos de Uso Reais

### Caso 1: Empresa de Desenvolvimento

Uma empresa de desenvolvimento de software usa o Kilo Code para:

1. **Geração de Documentação**: Gerar documentação técnica automaticamente
2. **Criação de Protótipos**: Criar rapidamente protótipos de projetos
3. **Recuperação de Sistemas**: Recuperar automaticamente de falhas
4. **Treinamento de Equipe**: Gerar materiais de treinamento

#### Implementação

```bash
#!/bin/bash
# workflow-empresa.sh - Workflow para empresa de desenvolvimento

echo "🏢 Workflow para Empresa de Desenvolvimento"
echo "=========================================="

# 1. Gerar documentação do projeto atual
echo "📚 Gerando documentação..."
echo "escrever um e-book sobre a arquitetura do sistema atual" | npm run cli

# 2. Criar protótipo de novo projeto
echo "🚀 Criando protótipo..."
echo "criar projeto nextjs com dashboard" | npm run cli

# 3. Validar sistema
echo "🔍 Validando sistema..."
npm run health-check

# 4. Gerar API para novo serviço
echo "🔧 Gerando API..."
echo "gerar api REST com autenticação" | npm run cli

# 5. Gerar relatório de atividades
echo "📊 Gerando relatório..."
cat > output/relatorio-diario.md << EOF
# Relatório Diário de Atividades

**Data:** $(date '+%Y-%m-%d')
**Sistema:** Kilo Code

## Atividades Realizadas
- [x] Geração de documentação técnica
- [x] Criação de protótipo de projeto
- [x] Validação do sistema
- [x] Geração de API

## Próximos Passos
- Revisar documentação gerada
- Validar protótipo criado
- Testar API gerada
- Planejar novas implementações

---
*Relatório gerado automaticamente*
EOF

echo "✅ Workflow concluído!"
echo "📊 Relatório: output/relatorio-diario.md"
```

### Caso 2: Educador/Treinador

Um educador usa o Kilo Code para:

1. **Criar Material Didático**: Gerar e-books e tutoriais
2. **Exemplos Práticos**: Criar projetos de exemplo
3. **Exercícios**: Gerar exercícios para alunos
4. **Avaliação**: Criar sistemas de avaliação

#### Implementação

```bash
#!/bin/bash
# workflow-educador.sh - Workflow para educadores

echo "🎓 Workflow para Educadores"
echo "============================="

# 1. Gerar material didático
echo "📚 Gerando material didático..."
echo "escrever um e-book sobre JavaScript para iniciantes" | npm run cli
echo "escrever um e-book sobre React Hooks" | npm run cli

# 2. Criar projetos de exemplo
echo "🚀 Criando projetos de exemplo..."
echo "criar projeto react com template starter" | npm run cli
echo "criar projeto nextjs com template dashboard" | npm run cli

# 3. Gerar exercícios
echo "📝 Gerando exercícios..."
echo "gerar api REST com autenticação" | npm run cli

# 4. Criar sistema de avaliação
echo "📊 Criando sistema de avaliação..."
echo "criar dashboard analytics" | npm run cli

echo "✅ Material educacional gerado!"
echo "📁 Verifique os arquivos em output/ e projects/"
```

### Caso 3: Desenvolvedor Freelancer

Um desenvolvedor freelancer usa o Kilo Code para:

1. **Propostas Comerciais**: Gerar propostas para clientes
2. **Projetos Rápidos**: Criar projetos rapidamente
3. **Documentação**: Gerar documentação para clientes
4. **Manutenção**: Recuperar sistemas de problemas

#### Implementação

```bash
#!/bin/bash
# workflow-freelancer.sh - Workflow para freelancers

echo "💼 Workflow para Freelancers"
echo "============================"

# 1. Gerar proposta comercial
echo "📄 Gerando proposta comercial..."
echo "escrever um e-book sobre desenvolvimento web moderno" | npm run cli

# 2. Criar projeto para cliente
echo "🚀 Criando projeto para cliente..."
echo "criar projeto nextjs com dashboard" | npm run cli

# 3. Gerar API para o projeto
echo "🔧 Gerando API..."
echo "gerar api REST com autenticação e banco de dados" | npm run cli

# 4. Gerar documentação
echo "📚 Gerando documentação..."
echo "escrever um e-book sobre como usar o sistema" | npm run cli

echo "✅ Projeto pronto para entrega!"
echo "📁 Entregar: projects/, output/ebooks/, output/apis/"
```

---

## 🔗 Integrações Práticas

### Integração com GitHub Actions

```yaml
# .github/workflows/kilo-code.yml
name: Kilo Code Automation

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  killo-code-tasks:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run health check
      run: npm run health-check
      
    - name: Generate documentation
      run: |
        echo "escrever um e-book sobre o projeto atual" | npm run cli
      
    - name: Validate system
      run: npm run health-check
      
    - name: Upload artifacts
      uses: actions/upload-artifact@v3
      with:
        name: killo-code-output
        path: output/
```

### Integração com Docker

```dockerfile
# Dockerfile
FROM node:16-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create necessary directories
RUN mkdir -p output logs temp data

# Set permissions
RUN chmod +x scripts/*.sh .killo-workspace/scripts/*.sh

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/system/health || exit 1

# Start the application
CMD ["npm", "start"]
```

### Integração com Kubernetes

```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kilo-code
  labels:
    app: kilo-code
spec:
  replicas: 3
  selector:
    matchLabels:
      app: kilo-code
  template:
    metadata:
      labels:
        app: kilo-code
    spec:
      containers:
      - name: kilo-code
        image: kilo-code:latest
        ports:
        - containerPort: 3000
        env:
        - name: KILO_ENV
          value: "production"
        - name: KILO_PORT
          value: "3000"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /system/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /system/health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: kilo-code-service
spec:
  selector:
    app: kilo-code
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
```

---

## 🛠️ Scripts de Automação

### Script de Backup Automático

```bash
#!/bin/bash
# backup.sh - Script de backup automático

BACKUP_DIR="./backups"
DATE=$(date '+%Y-%m-%d_%H-%M-%S')
BACKUP_FILE="$BACKUP_DIR/kilo-backup-$DATE.tar.gz"

echo "💾 Iniciando backup..."
echo "===================="

# Criar diretório de backup
mkdir -p "$BACKUP_DIR"

# Criar backup
tar -czf "$BACKUP_FILE" \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=logs \
    --exclude=temp \
    --exclude=output \
    ./

if [ $? -eq 0 ]; then
    echo "✅ Backup criado com sucesso: $BACKUP_FILE"
    
    # Manter apenas os últimos 7 backups
    cd "$BACKUP_DIR"
    ls -t *.tar.gz | tail -n +8 | xargs rm -f
    
    echo "🧹 Backups antigos removidos"
else
    echo "❌ Erro ao criar backup"
    exit 1
fi

# Verificar tamanho do backup
BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
echo "📊 Tamanho do backup: $BACKUP_SIZE"

echo "✅ Backup concluído!"
```

### Script de Monitoramento

```bash
#!/bin/bash
# monitor.sh - Script de monitoramento do sistema

LOG_FILE="./logs/monitor.log"
ALERT_EMAIL="admin@example.com"

echo "🔍 Iniciando monitoramento..."
echo "============================"

# Função de log
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Função de alerta
alert() {
    local message="$1"
    log "🚨 ALERTA: $message"
    
    # Enviar email (simulado)
    echo "Email enviado para $ALERT_EMAIL: $message"
}

# Verificar se o servidor está rodando
check_server() {
    if curl -s http://localhost:3000/system/health > /dev/null; then
        log "✅ Servidor está online"
        return 0
    else
        alert "Servidor está offline"
        return 1
    fi
}

# Verificar uso de memória
check_memory() {
    local memory_usage=$(free | grep Mem | awk '{print ($3/$2) * 100.0}')
    local memory_int=${memory_usage%.*}
    
    log "💾 Uso de memória: ${memory_int}%"
    
    if [ "$memory_int" -gt 80 ]; then
        alert "Uso de memória crítico: ${memory_int}%"
    fi
}

# Verificar uso de disco
check_disk() {
    local disk_usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    log "💿 Uso de disco: ${disk_usage}%"
    
    if [ "$disk_usage" -gt 80 ]; then
        alert "Uso de disco crítico: ${disk_usage}%"
    fi
}

# Verificar processos do Kilo Code
check_processes() {
    local process_count=$(pgrep -f "node.*killo" | wc -l)
    log "⚙️ Processos Kilo Code: $process_count"
    
    if [ "$process_count" -eq 0 ]; then
        alert "Nenhum processo Kilo Code encontrado"
    fi
}

# Executar verificações
check_server
check_memory
check_disk
check_processes

# Verificar logs de erro
if [ -f "./logs/kilo.log" ]; then
    local error_count=$(grep -i "error\|failed\|exception" ./logs/kilo.log | wc -l)
    log "📋 Erros nos logs: $error_count"
    
    if [ "$error_count" -gt 10 ]; then
        alert "Muitos erros detectados nos logs: $error_count"
    fi
fi

echo "✅ Monitoramento concluído!"
```

### Script de Limpeza

```bash
#!/bin/bash
# cleanup.sh - Script de limpeza do sistema

echo "🧹 Iniciando limpeza do sistema..."
echo "================================="

# Função de log
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Limpar logs antigos
cleanup_logs() {
    log "📄 Limpando logs antigos..."
    find ./logs -name "*.log" -mtime +7 -delete
    log "✅ Logs antigos removidos"
}

# Limpar arquivos temporários
cleanup_temp() {
    log "🗑️ Limpando arquivos temporários..."
    rm -rf ./temp/*
    log "✅ Arquivos temporários removidos"
}

# Limpar saídas antigas
cleanup_output() {
    log "📁 Limpando saídas antigas..."
    find ./output -name "*.md" -mtime +30 -delete
    find ./output -name "*.json" -mtime +30 -delete
    log "✅ Saídas antigas removidas"
}

# Limpar projetos antigos
cleanup_projects() {
    log "🚀 Limpando projetos antigos..."
    find ./projects -maxdepth 1 -type d -mtime +60 -not -path "./projects" -exec rm -rf {} +
    log "✅ Projetos antigos removidos"
}

# Limpar cache do npm
cleanup_npm() {
    log "📦 Limpando cache do npm..."
    npm cache clean --force
    log "✅ Cache do npm limpo"
}

# Compactar backups antigos
compress_backups() {
    log "💾 Compactando backups antigos..."
    find ./backups -name "*.tar.gz" -mtime +30 -exec gzip {} \;
    log "✅ Backups antigos compactados"
}

# Executar limpeza
cleanup_logs
cleanup_temp
cleanup_output
cleanup_projects
cleanup_npm
compress_backups

# Mostrar espaço liberado
echo "📊 Espaço liberado:"
df -h /

echo "✅ Limpeza concluída!"
```

---

## 🔧 Soluções de Problemas

### Problema 1: Sistema Não Inicia

#### Sintomas
- Erro "Cannot find module" ao iniciar
- Servidor não sobe
- CLI não funciona

#### Solução

```bash
# 1. Verificar dependências
npm list

# 2. Reinstalar dependências
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# 3. Verificar arquivos críticos
ls -la .killo-workspace/agent/agent.yaml
ls -la src/app.js
ls -la package.json

# 4. Executar recuperação
npm run cli
killo> recuperar erro no projeto

# 5. Verificar permissões
chmod +x scripts/*.sh
chmod +x .killo-workspace/scripts/*.sh
```

### Problema 2: Comandos Não Funcionam

#### Sintomas
- CLI responde com "Não consegui entender o comando"
- Comandos não são reconhecidos
- Respostas vazias ou incorretas

#### Solução

```bash
# 1. Verificar status do sistema
npm run cli
killo> status

# 2. Verificar se actions e prompts estão carregados
ls -la .killo-workspace/agent/actions/
ls -la .killo-workspace/agent/prompts/

# 3. Recarregar configuração
npm run init

# 4. Testar com comandos simples
killo> ajuda
killo> status

# 5. Verificar logs
tail -f logs/kilo.log
```

### Problema 3: Performance Lenta

#### Sintomas
- Respostas lentas do CLI
- Timeout em operações
- Alto uso de CPU/memória

#### Solução

```bash
# 1. Verificar uso de recursos
top
htop

# 2. Limpar cache e temporários
npm cache clean --force
rm -rf temp/*

# 3. Reiniciar sistema
npm run recover

# 4. Otimizar configuração
# Editar killo.config para reduzir timeouts
nano killo.config

# 5. Verificar se há processos zombies
ps aux | grep kilo
pkill -f kilo
```

### Problema 4: Arquivos Não São Gerados

#### Sintomas
- Comandos executados mas nenhum arquivo criado
- Diretórios de saída vazios
- Erros de permissão

#### Solução

```bash
# 1. Verificar permissões dos diretórios
ls -la output/
ls -la projects/

# 2. Criar diretórios necessários
mkdir -p output/{ebooks,apis,dashboards}
mkdir -p projects
mkdir -p logs

# 3. Verificar espaço em disco
df -h

# 4. Testar com um comando simples
npm run cli
killo> escrever um e-book sobre teste

# 5. Verificar logs de erro
tail -f logs/kilo.log
```

---

## 💡 Dicas e Truques

### Dica 1: Comandos em Lote

Você pode executar vários comandos em sequência:

```bash
# Criar arquivo com comandos
cat > comandos.txt << EOF
escrever um e-book sobre JavaScript
criar projeto react
gerar api REST
EOF

# Executar comandos em lote
while read comando; do
    echo "$comando" | npm run cli
done < comandos.txt
```

### Dica 2: Agendamento de Tarefas

Use cron para agendar tarefas automáticas:

```bash
# Editar crontab
crontab -e

# Adicionar tarefas
# Executar backup diário às 2h da manhã
0 2 * * * /caminho/para/backup.sh

# Executar monitoramento a cada hora
0 * * * * /caminho/para/monitor.sh

# Executar limpeza semanal aos domingos
0 3 * * 0 /caminho/para/cleanup.sh
```

### Dica 3: Integração com Outras Ferramentas

```bash
# Integrar com Git hooks
# .git/hooks/pre-commit
#!/bin/bash
echo "🔍 Executando verificação pré-commit..."
npm run health-check
if [ $? -ne 0 ]; then
    echo "❌ Sistema não está saudável. Commit cancelado."
    exit 1
fi
echo "✅ Sistema saudável. Commit permitido."
```

### Dica 4: Personalização de Prompts

Você pode personalizar os prompts para obter melhores resultados:

```markdown
# Exemplo de prompt personalizado
# .killo-workspace/agent/prompts/custom-generator.md

# Custom Generator - Especialista em [Sua Especialidade]

## Contexto
Eu sou um agente especializado em [sua especialidade] com experiência em [áreas relacionadas].

## Personalidade
- **Tom**: [seu estilo preferido]
- **Estilo**: [sua abordagem]
- **Foco**: [seu foco principal]
- **Abordagem**: [sua metodologia]

## Conhecimento Especializado
### Área 1
- Conceito importante 1
- Conceito importante 2
- Melhores práticas

### Área 2
- Frameworks e ferramentas
- Padrões de design
- Casos de uso

## Diretrizes de Resposta
1. Sempre começar com análise do contexto
2. Fornecer exemplos práticos
3. Incluir considerações de performance
4. Sugerir próximos passos
```

### Dica 5: Uso Avançado da API

```javascript
// Exemplo de uso avançado da API
const KiloCodeAPI = require('kilo-code-api');

const api = new KiloCodeAPI({
    baseUrl: 'http://localhost:3000',
    timeout: 30000,
    retries: 3
});

// Pipeline de processamento
async function processPipeline(tasks) {
    const results = [];
    
    for (const task of tasks) {
        try {
            const result = await api.executeAgentCommand(task.command);
            results.push({
                task: task.name,
                success: result.success,
                output: result.result,
                duration: result.result.execution_time
            });
            
            // Esperar entre comandos
            await new Promise(resolve => setTimeout(resolve, 1000));
            
        } catch (error) {
            results.push({
                task: task.name,
                success: false,
                error: error.message
            });
        }
    }
    
    return results;
}

// Exemplo de pipeline
const pipeline = [
    { name: 'gerar_ebook', command: 'escrever um e-book sobre React' },
    { name: 'criar_projeto', command: 'criar projeto nextjs com dashboard' },
    { name: 'gerar_api', command: 'gerar api REST com autenticação' }
];

processPipeline(pipeline)
    .then(results => {
        console.log('Resultados do pipeline:', results);
    })
    .catch(error => {
        console.error('Erro no pipeline:', error);
    });
```

---

<div align="center">

**🎉 Parabéns! Agora você tem exemplos práticos para usar o Kilo Code em diversas situações!**

Estes exemplos cobrem desde o uso básico até integrações complexas e casos de uso reais.

</div>