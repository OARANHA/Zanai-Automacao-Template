# 🚀 Zanai - Template de Automação com Agentes Inteligentes

<div align="center">

![Zanai Logo](https://img.shields.io/badge/Zanai-v2.0.0-blue?style=for-the-badge&logo=github&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-16%2B-brightgreen?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Support-blue?style=for-the-badge&logo=typescript&logoColor=white)
![ZAI SDK](https://img.shields.io/badge/ZAI%20SDK-Integrated-purple?style=for-the-badge&logo=ai&logoColor=white)

**Sistema Autônomo de Desenvolvimento com Agentes Inteligentes e Processamento de Linguagem Natural**

[📖 Documentação](#-documentação) • [🚀 Instalação](#-instalação) • [💻 Uso](#-uso) • [🤖 Agentes](#-agentes) • [🔧 Comandos](#-comandos) • [📚 Exemplos](#-exemplos)

</div>

---

## 📋 Sobre o Projeto

O **Zanai** é um template de automação revolucionário que combina a potência de agentes inteligentes com processamento de linguagem natural para criar um sistema autônomo de desenvolvimento. Inspirado em arquiteturas de IA modernas, o sistema utiliza uma abordagem única de **YAML + Markdown** para criar agentes capazes de aprender, recuperar-se de falhas e executar tarefas complexas de forma autônoma.

### 🎯 Visão Geral

- **🧠 Arquitetura Híbrida**: YAML como "cérebro" (lógica/decisão) + Markdown como "corpo" (conhecimento/expressão)
- **🤖 Agentes Inteligentes**: Sistema de agentes especializados com capacidades de auto-recuperação
- **🗣️ Processamento de Linguagem Natural**: Interface CLI que entende comandos em português e inglês
- **🔄 Auto-recuperação**: Múltiplos agentes de recuperação para diferentes tipos de falhas
- **🌐 Integração Total**: VSCode, GitHub, Docker, AWS, Kubernetes e mais
- **⚡ Alta Performance**: Otimizado para operação contínua 24/7

### ✨ Funcionalidades Principais

| Funcionalidade | Descrição |
|----------------|-----------|
| **🎯 CLI Interativa** | Interface de linha de comando com processamento de linguagem natural |
| **📚 Geração de Conteúdo** | Criação automática de e-books, APIs, dashboards e projetos |
| **🔍 Busca Semântica** | Sistema avançado de busca e indexação de arquivos |
| **🛡️ Recuperação Automática** | Agentes especializados em recuperação de falhas |
| **🌐 Servidor Web** | API REST para integração com outras ferramentas |
| **📊 Monitoramento** | Sistema de health checks e monitoramento contínuo |
| **🤝 Integrações** | Suporte para múltiplas plataformas e serviços |

---

## 🚀 Instalação

### Pré-requisitos

- **Node.js** 16.0 ou superior
- **npm** 8.0 ou superior
- **Git** para controle de versão
- **ZAI SDK** configurado (opcional, para funcionalidades de IA)

### Instalação Rápida

```bash
# 1. Clone o repositório
git clone https://github.com/OARANHA/Zanai-Automacao-Template.git
cd Zanai-Automacao-Template

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# 4. Execute a instalação automática
npm run setup:auto

# 5. Verifique a instalação
npm run health-check
```

### Configuração Inicial

```bash
# Configure o projeto
npm run setup:project

# Inicialize o workspace Zanai
npm run init

# Teste a instalação
npm run demo
```

---

## 💻 Uso

### Modo CLI Interativo (Principal)

```bash
# Inicie o CLI interativo
npm run cli

# Ou diretamente
node src/cli/zanai-cli.js
```

**Exemplos de Comandos:**

```bash
zanai> escrever um e-book sobre React Hooks
zanai> criar um projeto nextjs com dashboard
zanai> gerar uma API REST com autenticação
zanai> recuperar de erro no projeto
zanai> status
zanai> ajuda
```

### Modo Servidor Web

```bash
# Inicie o servidor web
npm start

# Ou em modo de desenvolvimento
npm run dev
```

**Endpoints da API:**

```bash
# Indexar arquivos para busca semântica
curl -X POST http://localhost:3000/semantic-search/index \
  -H "Content-Type: application/json" \
  -d '{"root": "./src"}'

# Buscar conteúdo
curl -X POST http://localhost:3000/semantic-search/search \
  -H "Content-Type: application/json" \
  -d '{"query": "componentes React", "options": {"limit": 10}}'

# Ler arquivo
curl -X POST http://localhost:3000/semantic-search/read-file \
  -H "Content-Type: application/json" \
  -d '{"filePath": "./src/app.js", "mode": "content"}'
```

---

## 🤖 Agentes

O sistema Zanai utiliza uma arquitetura de agentes especializados, cada um com sua própria configuração YAML e prompt Markdown.

### Arquitetura de Agentes

```
.zanai-workspace/agent/
├── agent.yaml              # Configuração central do agente
├── actions/               # Lógica de execução (YAML)
│   ├── bootstrap-project.yaml
│   ├── write-file.yaml
│   ├── read-directory.yaml
│   ├── audit-all.yaml
│   ├── recover-failure.yaml
│   ├── thought-recovery.yaml
│   ├── file-system-validator.yaml
│   ├── test-recovery.yaml
│   └── file-recovery.yaml
└── prompts/               # Conhecimento e personalidade (Markdown)
    ├── ebook-generator.md
    ├── api-generator.md
    ├── dashboard-generator.md
    ├── project-bootstrap.md
    ├── error-recovery.md
    ├── thought-recovery.md
    ├── file-system-validator.md
    ├── test-recovery.md
    └── file-recovery.md
```

### Agentes de Recuperação

| Agente | Função | YAML | Markdown |
|--------|--------|------|----------|
| **Thought Recovery** | Recuperação de falhas no processo de pensamento | `thought-recovery.yaml` | `thought-recovery.md` |
| **File System Validator** | Validação e correção de erros de sistema de arquivos | `file-system-validator.yaml` | `file-system-validator.md` |
| **Test Recovery** | Recuperação de falhas em testes | `test-recovery.yaml` | `test-recovery.md` |
| **File Recovery** | Recuperação geral de arquivos | `file-recovery.yaml` | `file-recovery.md` |

### Agente Principal

O `agent.yaml` é o cérebro central que orquestra todos os outros componentes:

```yaml
agent:
  name: "DeepSeek-FSA-Autonomous"
  description: "Agente Full-Stack autônomo com capacidade de operação contínua"
  version: "4.0"
  capabilities:
    - "Operação 24/7 sem supervisão"
    - "Tomada de decisão crítica"
    - "Auto-aprendizado contínuo"
    - "Recuperação automática de falhas"
```

---

## 🔧 Comandos

### Comandos CLI Principais

| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `escrever e-book sobre [tema]` | Gera um e-book sobre o tema especificado | `escrever e-book sobre React Hooks` |
| `criar projeto [tipo]` | Cria um novo projeto do tipo especificado | `criar projeto nextjs` |
| `gerar api [tipo]` | Gera uma API do tipo especificado | `gerar api REST com autenticação` |
| `criar dashboard` | Cria um dashboard completo | `criar dashboard analytics` |
| `recuperar erro` | Recupera o sistema de erros | `recuperar erro no projeto` |

### Comandos do Sistema

| Comando | Descrição |
|---------|-----------|
| `ajuda` ou `help` | Mostra todos os comandos disponíveis |
| `status` | Mostra o status do sistema |
| `limpar` ou `clear` | Limpa a tela |
| `sair` ou `exit` | Encerra o CLI |

### Scripts NPM

| Script | Descrição |
|--------|-----------|
| `npm start` | Inicia o servidor web |
| `npm run dev` | Inicia o servidor em modo de desenvolvimento |
| `npm run cli` | Inicia o CLI interativo |
| `npm run demo` | Executa uma demonstração do sistema |
| `npm run health-check` | Verifica a saúde do sistema |
| `npm run init` | Inicializa o workspace Zanai |
| `npm run recover` | Executa recuperação do sistema |
| `npm run bootstrap` | Executa bootstrap do projeto |

---

## 📚 Exemplos

### Exemplo 1: Gerar um E-book

```bash
# Inicie o CLI
npm run cli

# Digite o comando
zanai> escrever um e-book sobre React Hooks para desenvolvedores iniciantes

# Resultado esperado:
✅ E-book gerado com sucesso!
📁 Arquivos gerados:
   - output/ebooks/ebook_2025-08-13T04-53-27Z.md

📝 Preview:
---
# React Hooks: Guia Completo para Desenvolvedores Iniciantes

## Introdução
React Hooks revolucionaram a forma como escrevemos componentes React...
---
```

### Exemplo 2: Criar um Projeto

```bash
# Comando
zanai> criar um projeto nextjs com dashboard

# Resultado esperado:
✅ Projeto nextjs criado com template dashboard!
📁 Arquivos gerados:
   - projects/nextjs-dashboard/
   - projects/nextjs-dashboard/package.json
   - projects/nextjs-dashboard/src/
   - projects/nextjs-dashboard/README.md
```

### Exemplo 3: Recuperação de Erro

```bash
# Comando
zanai> recuperar de erro no projeto

# Resultado esperado:
✅ Sistema recuperado com sucesso!
📁 Ações executadas:
   - Validação do sistema de arquivos
   - Recuperação de processos
   - Verificação de integridade
```

### Exemplo 4: Usar a API REST

```javascript
// Exemplo de uso da API
const response = await fetch('http://localhost:3000/semantic-search/search', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: 'componentes React',
    options: {
      limit: 10,
      threshold: 0.7
    }
  })
});

const results = await response.json();
console.log(results);
```

---

## 📖 Documentação

### Documentação Detalhada

- [📖 Guia de Instalação](docs/INSTALLATION.md) - Guia completo de instalação e configuração
- [🤖 Documentação dos Agentes](docs/AGENTS.md) - Detalhes sobre todos os agentes e suas funcionalidades
- [🔧 Referência de Comandos](docs/COMMANDS.md) - Referência completa de todos os comandos
- 🏗️ [Arquitetura do Sistema](docs/ARCHITECTURE.md) - Documentação da arquitetura e design
- [🛠️ Guia de Desenvolvimento](docs/DEVELOPMENT.md) - Guia para desenvolvedores contribuírem
- [🐛 Troubleshooting](docs/TROUBLESHOOTING.md) - Solução de problemas comuns
- [📚 Exemplos Avançados](docs/EXAMPLES.md) - Exemplos avançados de uso

### Estrutura do Projeto

```
Zanai-Automacao-Template/
├── .zanai-workspace/          # Workspace do agente
│   ├── agent/                 # Configuração do agente
│   │   ├── agent.yaml         # Configuração central
│   │   ├── actions/           # Lógica de execução (YAML)
│   │   └── prompts/           # Conhecimento (Markdown)
│   ├── scripts/               # Scripts de automação
│   └── health-check/          # Sistema de verificação
├── src/                       # Código fonte
│   ├── app.js                 # Servidor web principal
│   ├── cli/                   # Interface CLI
│   ├── config/                # Configurações
│   ├── services/              # Serviços do sistema
│   └── utils/                 # Utilitários
├── docs/                      # Documentação
├── scripts/                   # Scripts externos
├── output/                    # Saída gerada
├── projects/                  # Projetos criados
├── package.json               # Dependências do projeto
├── zanai.config                # Configuração do Zanai
└── README.md                  # Este arquivo
```

---

## 🌟 Contribuição

Contribuições são bem-vindas! Por favor, leia nosso [Guia de Contribuição](docs/CONTRIBUTING.md) para detalhes.

### Como Contribuir

1. **Faça um Fork** do projeto
2. **Crie uma Branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit suas mudanças** (`git commit -m 'Add some AmazingFeature'`)
4. **Push para a Branch** (`git push origin feature/AmazingFeature`)
5. **Abra um Pull Request**

### Diretrizes de Contribuição

- Siga o padrão de código existente
- Adicione testes para novas funcionalidades
- Atualize a documentação conforme necessário
- Use mensagens de commit claras e descritivas

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🙏 Agradecimentos

- **Zanai Team** - Pela incrível API de IA que alimenta este sistema
- **VSCode Team** - Pela excelente plataforma de desenvolvimento
- **Node.js Community** - Pelo ecossistema fantástico
- **Todos os Contribuidores** - Que tornam este projeto melhor a cada dia

---

## 📞 Contato

- **Autor**: A.Aranha
- **Email**: aranha@ulbra.edu.br
- **GitHub**: [OARANHA](https://github.com/OARANHA)
- **Issues**: [GitHub Issues](https://github.com/OARANHA/Zanai-Automacao-Template/issues)

---

<div align="center">

**⭐ Se este projeto te ajudou, por favor considere dar uma estrela!**

![Star History](https://img.shields.io/github/stars/OARANHA/Zanai-Automacao-Template?style=social)

</div>