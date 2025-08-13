# 📖 Guia de Instalação e Configuração

<div align="center">

![Installation Guide](https://img.shields.io/badge/Installation-v2.0.0-blue?style=for-the-badge&logo=github&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-16%2B-brightgreen?style=for-the-badge&logo=node.js&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20Linux%20%7C%20macOS-lightgrey?style=for-the-badge)

**Guia completo para instalar e configurar o Kilo Code**

</div>

---

## 📋 Índice

- [Pré-requisitos](#-pré-requisitos)
- [Instalação Rápida](#-instalação-rápida)
- [Instalação Detalhada](#-instalação-detalhada)
- [Configuração](#-configuração)
- [Verificação](#-verificação)
- [Solução de Problemas](#-solução-de-problemas)
- [Próximos Passos](#-próximos-passos)

---

## ✅ Pré-requisitos

### Sistema Operacional

- **Windows** 10 ou superior
- **Linux** Ubuntu 18.04+ ou distribuições equivalentes
- **macOS** 10.15 Catalina ou superior

### Software Necessário

| Software | Versão Mínima | Descrição |
|----------|---------------|-----------|
| **Node.js** | 16.0.0 | Ambiente de execução JavaScript |
| **npm** | 8.0.0 | Gerenciador de pacotes do Node.js |
| **Git** | 2.20.0 | Controle de versão |
| **VSCode** | 1.60.0 | Editor de código (recomendado) |

### Verificação dos Pré-requisitos

```bash
# Verificar Node.js
node --version
# Saída esperada: v16.0.0 ou superior

# Verificar npm
npm --version
# Saída esperada: 8.0.0 ou superior

# Verificar Git
git --version
# Saída esperada: 2.20.0 ou superior
```

### Opcionais (Recomendados)

- **ZAI SDK**: Para funcionalidades avançadas de IA
- **Docker**: Para containerização e deploy
- **Python 3.8+**: Para alguns scripts de automação
- **Redis**: Para cache avançado (opcional)

---

## 🚀 Instalação Rápida

### Passo 1: Clonar o Repositório

```bash
# Clonar o repositório
git clone https://github.com/OARANHA/Kilo-Code-Automacao-Template.git
cd Kilo-Code-Automacao-Template

# Verificar o conteúdo
ls -la
```

### Passo 2: Instalar Dependências

```bash
# Instalar dependências do projeto
npm install

# Verificar instalação
npm list --depth=0
```

### Passo 3: Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar o arquivo .env
nano .env  # ou use seu editor preferido
```

**Conteúdo mínimo do `.env`:**
```env
# Configurações básicas
KILO_PORT=3000
KILO_ENV=development
KILO_DEBUG=true

# Configurações do ZAI SDK (opcional)
ZAI_API_KEY=sua_chave_aqui
ZAI_BASE_URL=https://api.z.ai/v1

# Configurações de banco de dados (opcional)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kilo_db
DB_USER=kilo_user
DB_PASSWORD=sua_senha_aqui

# Configurações de Redis (opcional)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=sua_senha_aqui
```

### Passo 4: Instalação Automática

```bash
# Executar instalação automática
npm run setup:auto
```

### Passo 5: Verificação

```bash
# Verificar saúde do sistema
npm run health-check

# Testar instalação
npm run demo
```

---

## 🔧 Instalação Detalhada

### Passo 1: Preparação do Ambiente

#### Windows

```bash
# Abrir PowerShell como Administrador
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# Clonar repositório
git clone https://github.com/OARANHA/Kilo-Code-Automacao-Template.git
cd Kilo-Code-Automacao-Template

# Instalar dependências
npm install
```

#### Linux/macOS

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y  # Ubuntu/Debian
# ou
brew update && brew upgrade             # macOS

# Clonar repositório
git clone https://github.com/OARANHA/Kilo-Code-Automacao-Template.git
cd Kilo-Code-Automacao-Template

# Instalar dependências
npm install
```

### Passo 2: Configuração do Workspace

```bash
# Criar diretórios necessários
mkdir -p output/{ebooks,apis,dashboards,projects}
mkdir -p logs
mkdir -p temp

# Dar permissões de execução
chmod +x scripts/*.sh
chmod +x .killo-workspace/scripts/*.sh
```

### Passo 3: Configuração do Banco de Dados (Opcional)

#### PostgreSQL

```bash
# Instalar PostgreSQL
sudo apt install postgresql postgresql-contrib  # Ubuntu/Debian
# ou
brew install postgresql                        # macOS

# Iniciar serviço
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Criar banco de dados
sudo -u postgres createdb kilo_db
sudo -u postgres createuser kilo_user
sudo -u postgres psql -c "ALTER USER kilo_user PASSWORD 'sua_senha_aqui';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE kilo_db TO kilo_user;"
```

#### SQLite (Padrão)

```bash
# O sistema usa SQLite por padrão, nenhuma instalação adicional necessária
# O arquivo de banco será criado automaticamente em ./data/kilo.db
```

### Passo 4: Configuração do Redis (Opcional)

```bash
# Instalar Redis
sudo apt install redis-server  # Ubuntu/Debian
# ou
brew install redis              # macOS

# Iniciar serviço
sudo systemctl start redis
sudo systemctl enable redis

# Testar conexão
redis-cli ping
# Saída esperada: PONG
```

### Passo 5: Configuração do ZAI SDK (Opcional)

```bash
# Obter sua chave API em https://z.ai
# Adicionar ao arquivo .env
echo "ZAI_API_KEY=sua_chave_aqui" >> .env
echo "ZAI_BASE_URL=https://api.z.ai/v1" >> .env
```

---

## ⚙️ Configuração

### Configuração Básica

#### Arquivo `kilo.config`

```javascript
module.exports = {
  // Configurações do servidor
  server: {
    port: process.env.KILO_PORT || 3000,
    host: process.env.KILO_HOST || 'localhost',
    env: process.env.KILO_ENV || 'development'
  },
  
  // Configurações do agente
  agent: {
    name: 'DeepSeek-FSA-Autonomous',
    version: '4.0',
    workspace: './.killo-workspace',
    autoRecovery: true,
    continuousOperation: true
  },
  
  // Configurações de cache
  cache: {
    type: process.env.CACHE_TYPE || 'memory',
    ttl: 3600,
    maxSize: 1000
  },
  
  // Configurações de banco de dados
  database: {
    type: process.env.DB_TYPE || 'sqlite',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'kilo_db',
    user: process.env.DB_USER || 'kilo_user',
    password: process.env.DB_PASSWORD || '',
    file: process.env.DB_FILE || './data/kilo.db'
  },
  
  // Configurações de segurança
  security: {
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization']
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100
    },
    helmet: true
  },
  
  // Configurações de logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || './logs/kilo.log',
    maxSize: '10m',
    maxFiles: 5
  }
};
```

#### Configuração do Agente

Editar `.killo-workspace/agent/agent.yaml`:

```yaml
agent:
  name: "DeepSeek-FSA-Autonomous"
  description: "Agente Full-Stack autônomo com capacidade de operação contínua"
  version: "4.0"
  author: "A.Aranha + z.ai API"
  capabilities:
    - "Operação 24/7 sem supervisão"
    - "Tomada de decisão crítica"
    - "Auto-aprendizado contínuo"
    - "Recuperação automática de falhas"
  
vscode_integration:
  workspace_vars:
    - "${workspaceFolder}"
    - "${file}"
    - "${lineNumber}"
    - "${selectedText}"
    - "${gitBranch}"
    - "${env}"
```

### Configuração Avançada

#### Integração com VSCode

```bash
# Instalar extensões recomendadas
code --install-extension ms-vscode.vscode-json
code --install-extension ms-vscode.vscode-yaml
code --install-extension ms-python.python
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
```

#### Configuração de Docker

```bash
# Criar Dockerfile
cat > Dockerfile << EOF
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
EOF

# Criar docker-compose.yml
cat > docker-compose.yml << EOF
version: '3.8'

services:
  kilo:
    build: .
    ports:
      - "3000:3000"
    environment:
      - KILO_ENV=production
      - KILO_PORT=3000
    volumes:
      - ./output:/app/output
      - ./logs:/app/logs
    depends_on:
      - redis
      - postgres

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=kilo_db
      - POSTGRES_USER=kilo_user
      - POSTGRES_PASSWORD=sua_senha_aqui
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
EOF
```

---

## ✅ Verificação

### Verificação Básica

```bash
# Verificar estrutura de arquivos
ls -la

# Verificar dependências
npm list --depth=0

# Verificar scripts
npm run
```

### Verificação do Sistema

```bash
# Executar health check
npm run health-check

# Saída esperada:
# 🚀 Kilo Code Health Check
# ========================
# ✅ Node.js: v16.0.0
# ✅ npm: 8.0.0
# ✅ Git: 2.20.0
# ✅ Configuração: OK
# ✅ Dependências: OK
# ✅ Scripts: OK
# ✅ Permissões: OK
# ✅ Sistema: Saudável
```

### Verificação do CLI

```bash
# Testar CLI
npm run cli

# Dentro do CLI, digitar:
killo> status

# Saída esperada:
# 📊 Status do Sistema:
# ====================
# ✅ Actions carregadas: 9
# ✅ Prompts carregados: 8
# ✅ ZAI SDK: Conectado
# 
# 🎯 Intenções disponíveis:
#    "escrever e-book" → ebook-generator
#    "criar projeto" → bootstrap-project
#    "gerar api" → api-generator
#    "criar dashboard" → dashboard-generator
#    "recuperar erro" → error-recovery
```

### Verificação do Servidor Web

```bash
# Iniciar servidor
npm start &

# Testar endpoint
curl -X GET http://localhost:3000/semantic-search/status

# Saída esperada:
# {"success":true,"status":{"indexed":false,"ready":true}}
```

### Verificação dos Agentes

```bash
# Verificar agentes carregados
ls -la .killo-workspace/agent/actions/
ls -la .killo-workspace/agent/prompts/

# Verificar configuração do agente
cat .killo-workspace/agent/agent.yaml
```

---

## 🐛 Solução de Problemas

### Problemas Comuns

#### 1. Erro: "Command not found: npm"

**Solução:**
```bash
# Reinstalar Node.js
# Ubuntu/Debian
sudo apt install nodejs npm

# macOS
brew install node

# Windows
# Baixar do site oficial: https://nodejs.org
```

#### 2. Erro: "Permission denied"

**Solução:**
```bash
# Dar permissões
chmod +x scripts/*.sh
chmod +x .killo-workspace/scripts/*.sh

# Ou usar sudo (não recomendado)
sudo npm install
```

#### 3. Erro: "Cannot find module"

**Solução:**
```bash
# Limpar cache e reinstalar
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### 4. Erro: "Port already in use"

**Solução:**
```bash
# Matar processo na porta
lsof -ti:3000 | xargs kill -9

# Ou usar outra porta
export KILO_PORT=3001
npm start
```

#### 5. Erro: "ZAI SDK connection failed"

**Solução:**
```bash
# Verificar configuração
cat .env | grep ZAI

# Testar conexão
curl -H "Authorization: Bearer $ZAI_API_KEY" $ZAI_BASE_URL/health

# Se não tiver chave, remover do .env
sed -i '/ZAI_/d' .env
```

### Debug Avançado

```bash
# Habilitar modo debug
export KILO_DEBUG=true
npm run dev

# Verificar logs
tail -f logs/kilo.log

# Verificar processos
ps aux | grep kilo

# Verificar portas
netstat -tulpn | grep :3000
```

---

## 🎯 Próximos Passos

### 1. Primeiros Comandos

```bash
# Iniciar o CLI
npm run cli

# Experimentar comandos
killo> ajuda
killo> escrever um e-book sobre JavaScript
killo> criar um projeto react
```

### 2. Explorar a Documentação

```bash
# Ler a documentação
cat README.md
cat docs/ARCHITECTURE.md
cat docs/COMMANDS.md
```

### 3. Personalizar o Sistema

```bash
# Editar configuração do agente
nano .killo-workspace/agent/agent.yaml

# Adicionar novos actions/prompts
# Ver documentação de desenvolvimento
cat docs/DEVELOPMENT.md
```

### 4. Integração com VSCode

```bash
# Abrir no VSCode
code .

# Instalar extensões recomendadas
# Ver workspace settings
```

### 5. Deploy em Produção

```bash
# Configurar ambiente de produção
export KILO_ENV=production
export KILO_DEBUG=false

# Usar Docker
docker-compose up -d

# Ou PM2
npm install -g pm2
pm2 start src/app.js --name kilo-code
pm2 save
pm2 startup
```

---

## 📞 Suporte

Se você encontrar problemas durante a instalação:

1. **Verifique o troubleshooting** acima
2. **Leia os logs** em `logs/kilo.log`
3. **Abra uma issue** no GitHub: [Issues](https://github.com/OARANHA/Kilo-Code-Automacao-Template/issues)
4. **Contate o autor**: aranha@ulbra.edu.br

---

<div align="center">

**🎉 Parabéns! Você instalou o Kilo Code com sucesso!**

Agora você está pronto para explorar o poder dos agentes inteligentes e automação!

</div>