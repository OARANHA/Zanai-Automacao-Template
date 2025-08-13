# 🔧 Referência Completa de Comandos

<div align="center">

![Commands Reference](https://img.shields.io/badge/Commands-v2.0.0-green?style=for-the-badge&logo=github&logoColor=white)
![CLI](https://img.shields.io/badge/CLI-Interactive-blue?style=for-the-badge&logo=terminal&logoColor=white)
![API](https://img.shields.io/badge/API-REST-orange?style=for-the-badge&logo=api&logoColor=white)

**Referência completa de todos os comandos e funcionalidades do Kilo Code**

</div>

---

## 📋 Índice

- [Comandos CLI](#-comandos-cli)
  - [Comandos em Linguagem Natural](#-comandos-em-linguagem-natural)
  - [Comandos do Sistema](#-comandos-do-sistema)
  - [Comandos de Recuperação](#-comandos-de-recuperação)
- [Scripts NPM](#-scripts-npm)
- [API REST](#-api-rest)
- [Exemplos de Uso](#-exemplos-de-uso)
- [Parâmetros e Opções](#-parâmetros-e-opções)
- [Resposta do Sistema](#-resposta-do-sistema)

---

## 💻 Comandos CLI

### 🎯 Comandos em Linguagem Natural

Os comandos em linguagem natural são a principal forma de interação com o sistema. Eles são processados pelo CommandProcessor e executam as ações correspondentes.

#### Geração de Conteúdo

| Comando | Descrição | Parâmetros | Exemplo |
|---------|-----------|------------|---------|
| `escrever e-book sobre [tema]` | Gera um e-book completo sobre o tema especificado | tema, público_alvo, linguagem, extensão | `escrever e-book sobre React Hooks para desenvolvedores iniciantes` |
| `criar e-book sobre [tema]` | Sinônimo do comando acima | tema, público_alvo, linguagem, extensão | `criar e-book sobre JavaScript moderno` |
| `gerar e-book sobre [tema]` | Sinônimo do comando acima | tema, público_alvo, linguagem, extensão | `gerar e-book sobre Node.js` |
| `escrever livro sobre [tema]` | Sinônimo do comando acima | tema, público_alvo, linguagem, extensão | `escrever livro sobre Python` |

**Exemplos:**
```bash
killo> escrever um e-book sobre React Hooks para desenvolvedores iniciantes
killo> criar e-book sobre JavaScript moderno com 100 páginas
killo> gerar e-book sobre Node.js em linguagem técnica
killo> escrever livro sobre Python para iniciantes
```

#### Criação de Projetos

| Comando | Descrição | Parâmetros | Exemplo |
|---------|-----------|------------|---------|
| `criar projeto [tipo]` | Cria um novo projeto do tipo especificado | project_type, template | `criar projeto nextjs` |
| `iniciar projeto [tipo]` | Sinônimo do comando acima | project_type, template | `iniciar projeto react` |
| `bootstrap [tipo]` | Sinônimo do comando acima | project_type, template | `bootstrap vue` |

**Tipos de projetos suportados:**
- `nextjs` - Projeto Next.js
- `react` - Projeto React
- `vue` - Projeto Vue.js
- `angular` - Projeto Angular
- `node` - Projeto Node.js
- `express` - Projeto Express
- `universal` - Projeto genérico

**Templates disponíveis:**
- `starter` - Template básico
- `dashboard` - Template com dashboard
- `admin` - Template de admin
- `api` - Template de API

**Exemplos:**
```bash
killo> criar projeto nextjs com dashboard
killo> iniciar projeto react com template admin
killo> bootstrap vue com template starter
killo> criar projeto node com template api
```

#### Geração de APIs

| Comando | Descrição | Parâmetros | Exemplo |
|---------|-----------|------------|---------|
| `gerar api [tipo]` | Gera uma API do tipo especificado | api_type, features | `gerar api REST com autenticação` |
| `criar api [tipo]` | Sinônimo do comando acima | api_type, features | `criar api GraphQL` |

**Tipos de API suportados:**
- `rest` - API REST
- `graphql` - API GraphQL
- `grpc` - API gRPC

**Features disponíveis:**
- `autenticação` - Sistema de autenticação
- `banco de dados` - Integração com banco de dados
- `cache` - Sistema de cache
- `logging` - Sistema de logging

**Exemplos:**
```bash
killo> gerar api REST com autenticação e banco de dados
killo> criar api GraphQL com cache
killo> gerar api gRPC com logging
```

#### Criação de Dashboards

| Comando | Descrição | Parâmetros | Exemplo |
|---------|-----------|------------|---------|
| `criar dashboard` | Cria um dashboard completo | tipo, tema | `criar dashboard analytics` |
| `gerar dashboard` | Sinônimo do comando acima | tipo, tema | `gerar dashboard financeiro` |

**Exemplos:**
```bash
killo> criar dashboard analytics
killo> gerar dashboard financeiro
killo> criar dashboard de vendas
```

#### Recuperação de Erros

| Comando | Descrição | Parâmetros | Exemplo |
|---------|-----------|------------|---------|
| `recuperar erro` | Recupera o sistema de erros | tipo_erro, severidade | `recuperar erro no projeto` |
| `corrigir erro` | Sinônimo do comando acima | tipo_erro, severidade | `corrigir erro crítico` |

**Exemplos:**
```bash
killo> recuperar erro no projeto
killo> corrigir erro crítico no sistema
killo> recuperar de falha no arquivo
```

### 🛠️ Comandos do Sistema

Comandos internos do sistema para controle e informação.

#### Comandos de Informação

| Comando | Alias | Descrição | Exemplo |
|---------|-------|-----------|---------|
| `ajuda` | `help` | Mostra todos os comandos disponíveis | `killo> ajuda` |
| `status` | - | Mostra o status do sistema | `killo> status` |
| `versao` | `version` | Mostra a versão do sistema | `killo> versao` |
| `info` | - | Mostra informações detalhadas | `killo> info` |

**Exemplos:**
```bash
killo> ajuda
killo> status
killo> versao
killo> info
```

#### Comandos de Controle

| Comando | Alias | Descrição | Exemplo |
|---------|-------|-----------|---------|
| `limpar` | `clear` | Limpa a tela | `killo> limpar` |
| `sair` | `exit`, `quit` | Encerra o CLI | `killo> sair` |
| `reiniciar` | `restart` | Reinicia o sistema | `killo> reiniciar` |
| `pausar` | `pause` | Pausa operações | `killo> pausar` |
| `continuar` | `resume` | Continua operações pausadas | `killo> continuar` |

**Exemplos:**
```bash
killo> limpar
killo> sair
killo> reiniciar
killo> pausar
killo> continuar
```

#### Comandos de Configuração

| Comando | Alias | Descrição | Exemplo |
|---------|-------|-----------|---------|
| `configurar` | `config` | Mostra/altera configurações | `killo> configurar` |
| `preferencias` | `prefs` | Mostra preferências | `killo> preferencias` |
| `ambiente` | `env` | Mostra variáveis de ambiente | `killo> ambiente` |

**Exemplos:**
```bash
killo> configurar
killo> preferencias
killo> ambiente
```

### 🔄 Comandos de Recuperação

Comandos especializados para recuperação de diferentes tipos de falhas.

#### Recuperação de Pensamento

| Comando | Descrição | Ação |
|---------|-----------|------|
| `recuperar pensamento` | Recupera falhas no processo de pensamento | Reinicia o processo de decisão |
| `restaurar cognicao` | Sinônimo do comando acima | Restaura o estado cognitivo |
| `reparar raciocinio` | Sinônimo do comando acima | Corrige falhas de raciocínio |

**Exemplos:**
```bash
killo> recuperar pensamento
killo> restaurar cognicao
killo> reparar raciocinio
```

#### Validação de Sistema de Arquivos

| Comando | Descrição | Ação |
|---------|-----------|------|
| `validar arquivos` | Valida e corrige erros de sistema de arquivos | Verifica integridade dos arquivos |
| `verificar sistema` | Sinônimo do comando acima | Verifica o sistema de arquivos |
| `corrigir filesystem` | Sinônimo do comando acima | Corrige problemas no filesystem |

**Exemplos:**
```bash
killo> validar arquivos
killo> verificar sistema
killo> corrigir filesystem
```

#### Recuperação de Testes

| Comando | Descrição | Ação |
|---------|-----------|------|
| `recuperar testes` | Recupera falhas em testes | Reexecuta testes com falha |
| `reparar testes` | Sinônimo do comando acima | Corrige testes quebrados |
| `restaurar testes` | Sinônimo do comando acima | Restaura suíte de testes |

**Exemplos:**
```bash
killo> recuperar testes
killo> reparar testes
killo> restaurar testes
```

#### Recuperação de Arquivos

| Comando | Descrição | Ação |
|---------|-----------|------|
| `recuperar arquivo` | Recupera arquivos perdidos ou corrompidos | Restaura arquivos do backup |
| `restaurar arquivo` | Sinônimo do comando acima | Restaura arquivos específicos |
| `recuperar dados` | Sinônimo do comando acima | Recupera dados perdidos |

**Exemplos:**
```bash
killo> recuperar arquivo config.yaml
killo> restaurar arquivo package.json
killo> recuperar dados do projeto
```

---

## 📦 Scripts NPM

Scripts disponíveis no `package.json` para automação e gerenciamento do projeto.

### Scripts Principais

| Script | Comando | Descrição |
|--------|---------|-----------|
| `npm start` | `node src/app.js` | Inicia o servidor web |
| `npm run dev` | `nodemon src/app.js` | Inicia em modo de desenvolvimento |
| `npm run cli` | `node src/cli/killo-cli.js` | Inicia o CLI interativo |
| `npm run demo` | `node demo-cli.js` | Executa uma demonstração |

### Scripts de Configuração

| Script | Comando | Descrição |
|--------|---------|-----------|
| `npm run init` | `./.killo-workspace/scripts/kilo-init.sh` | Inicializa o workspace Killo |
| `npm run setup:auto` | `node .killo-workspace/scripts/auto-setup.js` | Configuração automática |
| `npm run setup:project` | `node .killo-workspace/scripts/project-setup.js` | Configuração do projeto |
| `npm run integrate` | `node .killo-workspace/scripts/integrate-smart.js` | Integração inteligente |

### Scripts de Busca Semântica

| Script | Comando | Descrição |
|--------|---------|-----------|
| `npm run kindex` | `bash scripts/kindex-fast.sh` | Indexa arquivos para busca |
| `npm run ksearch` | `bash scripts/ksearch.sh` | Executa busca semântica |
| `npm run kread` | `bash scripts/kread.sh` | Lê arquivo indexado |

### Scripts de Manutenção

| Script | Comando | Descrição |
|--------|---------|-----------|
| `npm run health-check` | `node .killo-workspace/health-check/project-scanner.js` | Verifica saúde do sistema |
| `npm run recover` | `./.killo-workspace/scripts/kilo-recover.sh` | Recuperação do sistema |
| `npm run bootstrap` | `./.killo-workspace/scripts/kilo-bootstrap.sh` | Bootstrap do projeto |
| `npm run security-check` | `node .killo-workspace/scripts/security-check.js` | Verificação de segurança |

### Scripts de Desenvolvimento

| Script | Comando | Descrição |
|--------|---------|-----------|
| `npm test` | `jest` | Executa testes |
| `npm run lint` | `eslint src/ scripts/` | Verifica código com ESLint |
| `npm run postinstall` | `chmod +x scripts/*.sh && chmod +x .killo-workspace/scripts/*.sh` | Pós-instalação |

### Exemplos de Uso

```bash
# Iniciar servidor web
npm start

# Iniciar CLI
npm run cli

# Verificar saúde do sistema
npm run health-check

# Indexar arquivos
npm run kindex

# Executar busca
npm run ksearch

# Recuperar sistema
npm run recover

# Executar testes
npm test

# Verificar código
npm run lint
```

---

## 🌐 API REST

A API REST fornece acesso programático às funcionalidades do sistema.

### Endpoints Disponíveis

#### Busca Semântica

##### POST `/semantic-search/index`
Indexa arquivos para busca semântica.

**Request:**
```json
{
  "root": "./src",
  "options": {
    "include": ["*.js", "*.ts", "*.md"],
    "exclude": ["node_modules/**"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Indexação concluída",
  "result": {
    "indexed_files": 150,
    "processing_time": 2.5,
    "status": "completed"
  }
}
```

**Exemplo:**
```bash
curl -X POST http://localhost:3000/semantic-search/index \
  -H "Content-Type: application/json" \
  -d '{"root": "./src"}'
```

##### POST `/semantic-search/search`
Executa busca semântica no conteúdo indexado.

**Request:**
```json
{
  "query": "componentes React",
  "options": {
    "limit": 10,
    "threshold": 0.7,
    "include_context": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "matches": [
      {
        "file": "./src/components/Button.js",
        "score": 0.85,
        "context": "export default function Button() { ... }",
        "line": 1
      }
    ],
    "total_matches": 1,
    "query": "componentes React"
  }
}
```

**Exemplo:**
```bash
curl -X POST http://localhost:3000/semantic-search/search \
  -H "Content-Type: application/json" \
  -d '{"query": "componentes React", "options": {"limit": 10}}'
```

##### POST `/semantic-search/read-file`
Lê o conteúdo de um arquivo específico.

**Request:**
```json
{
  "filePath": "./src/app.js",
  "mode": "content"
}
```

**Response:**
```json
{
  "success": true,
  "content": "// Conteúdo do arquivo\nconst express = require('express');\n..."
}
```

**Exemplo:**
```bash
curl -X POST http://localhost:3000/semantic-search/read-file \
  -H "Content-Type: application/json" \
  -d '{"filePath": "./src/app.js", "mode": "content"}'
```

##### GET `/semantic-search/status`
Verifica o status do sistema de busca semântica.

**Response:**
```json
{
  "success": true,
  "status": {
    "indexed": true,
    "ready": true,
    "indexed_files": 150,
    "last_index": "2025-08-13T04:53:27Z"
  }
}
```

**Exemplo:**
```bash
curl -X GET http://localhost:3000/semantic-search/status
```

#### Agentes Inteligentes

##### POST `/agent/execute`
Executa um comando do agente via API.

**Request:**
```json
{
  "command": "escrever um e-book sobre React Hooks",
  "options": {
    "async": true,
    "timeout": 30000
  }
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "command": "escrever um e-book sobre React Hooks",
    "output": "✅ E-book gerado com sucesso!",
    "files": ["output/ebooks/ebook_2025-08-13T04-53-27Z.md"],
    "execution_time": 5.2
  }
}
```

**Exemplo:**
```bash
curl -X POST http://localhost:3000/agent/execute \
  -H "Content-Type: application/json" \
  -d '{"command": "escrever um e-book sobre React Hooks"}'
```

##### POST `/agent/status`
Verifica o status dos agentes.

**Response:**
```json
{
  "success": true,
  "status": {
    "agents": {
      "main": "active",
      "thought_recovery": "ready",
      "file_system_validator": "ready",
      "test_recovery": "ready",
      "file_recovery": "ready"
    },
    "actions_loaded": 9,
    "prompts_loaded": 8,
    "zai_connected": true
  }
}
```

**Exemplo:**
```bash
curl -X GET http://localhost:3000/agent/status
```

#### Sistema

##### GET `/system/health`
Verifica a saúde geral do sistema.

**Response:**
```json
{
  "success": true,
  "health": {
    "status": "healthy",
    "components": {
      "server": "healthy",
      "database": "healthy",
      "cache": "healthy",
      "agents": "healthy"
    },
    "uptime": 3600,
    "memory_usage": "45MB",
    "cpu_usage": "2%"
  }
}
```

**Exemplo:**
```bash
curl -X GET http://localhost:3000/system/health
```

##### GET `/system/metrics`
Retorna métricas do sistema.

**Response:**
```json
{
  "success": true,
  "metrics": {
    "requests_total": 150,
    "requests_per_second": 0.5,
    "average_response_time": 120,
    "error_rate": 0.01,
    "active_connections": 3
  }
}
```

**Exemplo:**
```bash
curl -X GET http://localhost:3000/system/metrics
```

---

## 💡 Exemplos de Uso

### Exemplo 1: Fluxo Completo de Geração de E-book

```bash
# 1. Iniciar o CLI
npm run cli

# 2. Executar comando
killo> escrever um e-book sobre React Hooks para desenvolvedores iniciantes com 100 páginas

# 3. Resultado esperado
✅ E-book gerado com sucesso!
📁 Arquivos gerados:
   - output/ebooks/ebook_2025-08-13T04-53-27Z.md

📝 Preview:
---
# React Hooks: Guia Completo para Desenvolvedores Iniciantes

## Introdução
React Hooks revolucionaram a forma como escrevemos componentes React...
---

# 4. Verificar arquivo gerado
cat output/ebooks/ebook_2025-08-13T04-53-27Z.md
```

### Exemplo 2: Criação de Projeto Completo

```bash
# 1. Iniciar CLI
npm run cli

# 2. Criar projeto
killo> criar projeto nextjs com dashboard

# 3. Resultado esperado
✅ Projeto nextjs criado com template dashboard!
📁 Arquivos gerados:
   - projects/nextjs-dashboard/
   - projects/nextjs-dashboard/package.json
   - projects/nextjs-dashboard/src/
   - projects/nextjs-dashboard/README.md

# 4. Navegar para o projeto
cd projects/nextjs-dashboard

# 5. Instalar dependências
npm install

# 6. Iniciar projeto
npm run dev
```

### Exemplo 3: Recuperação de Erro

```bash
# 1. Simular erro (excluir arquivo importante)
rm .killo-workspace/agent/agent.yaml

# 2. Iniciar CLI
npm run cli

# 3. Executar recuperação
killo> recuperar erro no projeto

# 4. Resultado esperado
✅ Sistema recuperado com sucesso!
📁 Ações executadas:
   - Validação do sistema de arquivos
   - Recuperação de processos
   - Verificação de integridade
   - Restauração do arquivo agent.yaml

# 5. Verificar recuperação
ls -la .killo-workspace/agent/agent.yaml
```

### Exemplo 4: Uso da API REST

```javascript
// Exemplo de uso da API em Node.js
const fetch = require('node-fetch');

async function exemploAPI() {
  // 1. Indexar arquivos
  const indexResponse = await fetch('http://localhost:3000/semantic-search/index', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ root: './src' })
  });
  
  console.log('Indexação:', await indexResponse.json());
  
  // 2. Buscar conteúdo
  const searchResponse = await fetch('http://localhost:3000/semantic-search/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      query: 'componentes React',
      options: { limit: 5 }
    })
  });
  
  const searchResults = await searchResponse.json();
  console.log('Resultados da busca:', searchResults);
  
  // 3. Executar agente
  const agentResponse = await fetch('http://localhost:3000/agent/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      command: 'escrever um e-book sobre JavaScript'
    })
  });
  
  const agentResult = await agentResponse.json();
  console.log('Resultado do agente:', agentResult);
}

exemploAPI();
```

### Exemplo 5: Script de Automação

```bash
#!/bin/bash
# Script de automação do Kilo Code

echo "🚀 Iniciando automação do Kilo Code..."

# 1. Verificar saúde do sistema
echo "📊 Verificando saúde do sistema..."
npm run health-check

# 2. Indexar arquivos
echo "🔍 Indexando arquivos..."
npm run kindex

# 3. Iniciar CLI e executar comandos
echo "🤖 Executando comandos automáticos..."

# Comando 1: Gerar e-book
echo "📚 Gerando e-book..."
echo "escrever um e-book sobre Node.js" | npm run cli

# Comando 2: Criar projeto
echo "🚀 Criando projeto..."
echo "criar projeto express com template api" | npm run cli

# 4. Verificar resultados
echo "📋 Verificando resultados..."
ls -la output/
ls -la projects/

echo "✅ Automação concluída!"
```

---

## ⚙️ Parâmetros e Opções

### Parâmetros de Comandos CLI

#### Parâmetros de Geração de E-book

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `tema` | string | "Tema não especificado" | Tema do e-book |
| `publico_alvo` | string | "Desenvolvedores" | Público-alvo do e-book |
| `linguagem` | string | "didática" | Estilo da linguagem |
| `extensao` | string | "50 páginas" | Extensão do e-book |

#### Parâmetros de Criação de Projeto

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `project_type` | string | "universal" | Tipo do projeto |
| `template` | string | "starter" | Template do projeto |

#### Parâmetros de Geração de API

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `api_type` | string | "rest" | Tipo da API |
| `features` | array | [] | Features da API |

### Opções da API REST

#### Opções de Busca Semântica

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `limit` | number | 10 | Limite de resultados |
| `threshold` | number | 0.7 | Limiar de relevância |
| `include_context` | boolean | false | Incluir contexto |
| `include` | array | ["*"] | Padrões de inclusão |
| `exclude` | array | [] | Padrões de exclusão |

#### Opções de Execução de Agente

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `async` | boolean | false | Execução assíncrona |
| `timeout` | number | 30000 | Timeout em milissegundos |
| `dry_run` | boolean | false | Simulação apenas |

---

## 📤 Resposta do Sistema

### Formato de Resposta CLI

Todas as respostas do CLI seguem um formato consistente:

#### Resposta de Sucesso
```
✅ Mensagem de sucesso
📁 Arquivos gerados:
   - arquivo1.md
   - arquivo2.js
📝 Preview:
---
conteúdo do preview
---
```

#### Resposta de Erro
```
❌ Mensagem de erro
🔧 Sugestão: Sugestão para resolver o problema
📞 Ajuda: Comando de ajuda ou documentação
```

#### Resposta de Status
```
📊 Status do Sistema:
====================
✅ Actions carregadas: 9
✅ Prompts carregados: 8
✅ ZAI SDK: Conectado

🎯 Intenções disponíveis:
   "escrever e-book" → ebook-generator
   "criar projeto" → bootstrap-project
   "gerar api" → api-generator
   "criar dashboard" → dashboard-generator
   "recuperar erro" → error-recovery
```

### Formato de Resposta API

Todas as respostas da API seguem o formato JSON:

#### Resposta de Sucesso
```json
{
  "success": true,
  "message": "Operação concluída com sucesso",
  "result": {
    // Dados específicos da operação
  },
  "metadata": {
    "timestamp": "2025-08-13T04:53:27Z",
    "execution_time": 1.5,
    "request_id": "req_123456789"
  }
}
```

#### Resposta de Erro
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Descrição do erro",
    "details": {
      // Detalhes adicionais do erro
    }
  },
  "metadata": {
    "timestamp": "2025-08-13T04:53:27Z",
    "request_id": "req_123456789"
  }
}
```

### Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | OK - Requisição bem sucedida |
| 201 | Created - Recurso criado com sucesso |
| 400 | Bad Request - Requisição inválida |
| 401 | Unauthorized - Não autorizado |
| 403 | Forbidden - Acesso negado |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro interno do servidor |

---

<div align="center">

**🎉 Parabéns! Agora você conhece todos os comandos e funcionalidades do Kilo Code!**

Experimente os diferentes comandos e explore todo o potencial do sistema!

</div>