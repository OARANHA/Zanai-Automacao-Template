# Exemplo de Interação com Kilo Code CLI

## 🚀 Iniciando o Sistema

```bash
$ npm run cli

🚀 Kilo Code CLI - Sistema Autônomo de Desenvolvimento
====================================================
Digite "ajuda" para ver comandos disponíveis ou "sair" para encerrar

kilo> 
```

## 📚 Exemplo 1: Gerando E-book

```
kilo> escrever um e-book sobre React Hooks para desenvolvedores iniciantes

🔍 Processando comando: "escrever um e-book sobre React Hooks para desenvolvedores iniciantes"
🎯 Intenção identificada: ebook-generator
📋 Parâmetros extraídos: {
  intent: 'ebook-generator',
  tema: 'React Hooks',
  publico_alvo: 'desenvolvedores iniciantes',
  linguagem: 'didática',
  extensao: '50 páginas'
}
📚 Gerando e-book...
✅ E-book gerado com sucesso!
📁 Arquivos gerados:
   - output/ebooks/ebook_2024-06-20T14-30-15Z.md

📝 Preview:
---
# E-Book: React Hooks para Desenvolvedores Iniciantes

## Capítulo 1: Introdução aos React Hooks

React Hooks revolucionaram a forma como escrevemos componentes em React. 
Neste capítulo, você aprenderá os conceitos fundamentais e como começar a 
utilizar Hooks em seus projetos.

### O que são React Hooks?

React Hooks são funções que permitem que você "se conecte" aos recursos 
do estado e do ciclo de vida do React a partir de componentes funcionais...

---
```

## 🚀 Exemplo 2: Criando Projeto

```
kilo> criar um projeto nextjs com dashboard

🔍 Processando comando: "criar um projeto nextjs com dashboard"
🎯 Intenção identificada: bootstrap-project
📋 Parâmetros extraídos: {
  intent: 'bootstrap-project',
  project_type: 'nextjs',
  template: 'dashboard'
}
🚀 Bootstrap de projeto...
✅ Projeto nextjs criado com template dashboard!
```

## 🔧 Exemplo 3: Gerando API

```
kilo> gerar uma API REST com autenticação

🔍 Processando comando: "gerar uma API REST com autenticação"
🎯 Intenção identificada: api-generator
📋 Parâmetros extraídos: {
  intent: 'api-generator',
  api_type: 'rest',
  features: [ 'autenticação' ]
}
🔧 Gerando API...
✅ API REST gerada com sucesso!
📁 Arquivos gerados:
   - output/apis/api_2024-06-20T14-32-45Z.md

📝 Preview:
---
# API REST com Autenticação

## Estrutura do Projeto

```
api/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   └── utils/
├── tests/
├── docs/
└── package.json
```

## Endpoints Principais

### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de novo usuário
- `POST /api/auth/refresh` - Refresh token

### Usuários
- `GET /api/users` - Listar usuários
- `GET /api/users/:id` - Obter usuário por ID
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

## Segurança Implementada

- JWT tokens com expiração
- Rate limiting
- Validação de entrada
- Sanitização de dados
- Proteção contra SQL Injection
---
```

## 🆘 Exemplo 4: Recuperação de Erro

```
kilo> recuperar de erro no projeto

🔍 Processando comando: "recuperar de erro no projeto"
🎯 Intenção identificada: error-recovery
📋 Parâmetros extraídos: { intent: 'error-recovery' }
🔧 Executando ação de recuperação...
✅ Sistema de recuperação iniciado!
📋 Análise de erros concluída
🔧 Soluções aplicadas automaticamente
✅ Recuperação concluída com sucesso!
```

## 📊 Exemplo 5: Status do Sistema

```
kilo> status

📊 Status do Sistema:
====================
✅ Actions carregadas: 6
✅ Prompts carregados: 7
✅ ZAI SDK: Conectado

🎯 Intenções disponíveis:
   "escrever e-book" → ebook-generator
   "criar e-book" → ebook-generator
   "gerar e-book" → ebook-generator
   "escrever livro" → ebook-generator
   "criar projeto" → bootstrap-project
   "iniciar projeto" → bootstrap-project
   "bootstrap" → bootstrap-project
   "gerar api" → api-generator
   "criar api" → api-generator
   "criar dashboard" → dashboard-generator
   "gerar dashboard" → dashboard-generator
   "recuperar erro" → error-recovery
   "corrigir erro" → error-recovery
```

## 📚 Exemplo 6: Ajuda

```
kilo> ajuda

📚 Comandos Disponíveis:
========================

🎯 Comandos em Linguagem Natural:
  "escrever um e-book sobre [tema]"
  "criar um projeto [tipo]"
  "gerar uma API [tipo]"
  "criar um dashboard"
  "recuperar de erro"

🔧 Comandos do Sistema:
  ajuda, help     - Mostra esta ajuda
  sair, exit      - Encerra o CLI
  limpar, clear   - Limpa a tela
  status          - Mostra status do sistema

💡 Exemplos:
  kilo> escrever um e-book sobre React Hooks
  kilo> criar um projeto nextjs com dashboard
  kilo> gerar uma API REST com autenticação
  kilo> recuperar de erro no projeto
```

## 🎯 Como Funciona o Processamento

### 1. Análise do Comando
O sistema analisa o texto digitado e identifica a intenção do usuário usando um mapeamento pré-definido e IA quando necessário.

### 2. Extração de Parâmetros
Com base na intenção identificada, o sistema extrai parâmetros relevantes como:
- Tema do e-book
- Tipo de projeto
- Features da API
- Público-alvo

### 3. Carregamento de Templates
O sistema carrega o template YAML da action correspondente e o prompt Markdown para guiar a geração de conteúdo.

### 4. Integração com ZAI SDK
Envia o prompt e parâmetros para o ZAI SDK gerar o conteúdo específico.

### 5. Execução de Actions
Executa os steps definidos nos arquivos YAML para criar arquivos, configurar projetos, etc.

### 6. Retorno de Resultados
Apresenta os resultados para o usuário com preview dos arquivos gerados.

## 🔧 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução
- **z-ai-web-dev-sdk** - Integração com IA
- **js-yaml** - Parser de arquivos YAML
- **readline** - Interface de linha de comando
- **Prompts Markdown** - Templates para geração de conteúdo
- **Actions YAML** - Definições de ações automatizadas

## 🚀 Benefícios

- **Interface Natural** - Usuários podem digitar comandos em português
- **Extensível** - Fácil adicionar novas intenções e actions
- **Integração com IA** - Aproveita o poder do z-ai-web-dev-sdk
- **Automação Completa** - Desde a análise até a geração de arquivos
- **Modular** - Actions e prompts são separados e reutilizáveis