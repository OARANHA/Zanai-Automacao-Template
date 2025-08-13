# 🐛 Troubleshooting e FAQ

<div align="center">

![Troubleshooting Guide](https://img.shields.io/badge/Troubleshooting-v2.0.0-red?style=for-the-badge&logo=github&logoColor=white)
![FAQ](https://img.shields.io/badge/FAQ-Common%20Questions-orange?style=for-the-badge&logo=question&logoColor=white)
![Support](https://img.shields.io/badge/Support-Help%20Center-blue?style=for-the-badge&logo=support&logoColor=white)

**Guia completo de solução de problemas e perguntas frequentes**

</div>

---

## 📋 Índice

- [Problemas Comuns](#-problemas-comuns)
- [Soluções Rápidas](#-soluções-rápidas)
- [FAQ - Perguntas Frequentes](#-faq---perguntas-frequentes)
- [Diagnóstico Avançado](#-diagnóstico-avançado)
- [Recuperação de Desastres](#-recuperação-de-desastres)
- [Contato e Suporte](#-contato-e-suporte)
- [Melhores Práticas](#-melhores-práticas)

---

## ⚠️ Problemas Comuns

### 1. Problemas de Instalação

#### Problema: "npm install falha com erros de permissão"

**Sintomas:**
```
npm ERR! EACCES: permission denied
npm ERR! Please try running this command again as root/Administrator.
```

**Causa:** Permissões inadequadas no diretório do projeto ou do npm.

**Solução:**
```bash
# Opção 1: Corrigir permissões do npm
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Opção 2: Usar nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 16
nvm use 16

# Opção 3: Instalar localmente (sem sudo)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Reinstalar dependências
npm install
```

#### Problema: "Dependências não encontradas após instalação"

**Sintomas:**
```
Error: Cannot find module 'express'
Error: Cannot find module 'js-yaml'
```

**Causa:** Cache corrompido ou instalação incompleta.

**Solução:**
```bash
# Limpar cache completamente
npm cache clean --force

# Remover node_modules e package-lock.json
rm -rf node_modules
rm package-lock.json

# Reinstalar dependências
npm install

# Verificar instalação
npm list --depth=0
```

### 2. Problemas de Inicialização

#### Problema: "Servidor não inicia - Porta já em uso"

**Sintomas:**
```
Error: listen EADDRINUSE :::3000
```

**Causa:** Outro processo já está usando a porta 3000.

**Solução:**
```bash
# Encontrar processo usando a porta
lsof -ti:3000

# Matar o processo
kill -9 $(lsof -ti:3000)

# Ou usar outra porta
export KILO_PORT=3001
npm start

# Ou matar todos os processos Node.js
pkill -f "node.*killo"
pkill -f "node.*app.js"
```

#### Problema: "Arquivo agent.yaml não encontrado"

**Sintomas:**
```
Error: Cannot find module '.killo-workspace/agent/agent.yaml'
```

**Causa:** Estrutura de diretórios incompleta ou arquivos ausentes.

**Solução:**
```bash
# Verificar estrutura de diretórios
ls -la .killo-workspace/
ls -la .killo-workspace/agent/

# Se diretórios não existirem, criar estrutura
mkdir -p .killo-workspace/agent/actions
mkdir -p .killo-workspace/agent/prompts

# Recuperar arquivos críticos
npm run recover

# Ou clonar novamente o repositório
git clone https://github.com/OARANHA/Kilo-Code-Automacao-Template.git temp
cp -r temp/.killo-workspace/ .killo-workspace/
rm -rf temp
```

### 3. Problemas com CLI

#### Problema: "CLI não reconhece comandos"

**Sintomas:**
```
killo> escrever um e-book sobre React
❌ Não consegui entender o comando. Tente: "escrever um e-book sobre [tema]"
```

**Causa:** Actions ou prompts não carregados corretamente.

**Solução:**
```bash
# Verificar status do sistema
npm run cli
killo> status

# Verificar se actions e prompts existem
ls -la .killo-workspace/agent/actions/
ls -la .killo-workspace/agent/prompts/

# Reinicializar o sistema
npm run init

# Recarregar configuração
npm run recover

# Verificar logs
tail -f logs/kilo.log
```

#### Problema: "CLI fica sem resposta"

**Sintomas:**
- CLI não responde a comandos
- Processo parece travado
- Sem output após digitar comando

**Causa:** Processo travado, problema com ZAI SDK, ou timeout.

**Solução:**
```bash
# Matar processo CLI
pkill -f "killo-cli"
pkill -f "node.*cli"

# Verificar se há processos zombies
ps aux | grep kilo

# Reiniciar com timeout maior
export KILO_TIMEOUT=60000
npm run cli

# Verificar conectividade com ZAI SDK
curl -H "Authorization: Bearer $ZAI_API_KEY" $ZAI_BASE_URL/health
```

### 4. Problemas com Agentes

#### Problema: "Agentes não carregam"

**Sintomas:**
```
📊 Status do Sistema:
====================
✅ Actions carregadas: 0
✅ Prompts carregados: 0
✅ ZAI SDK: Desconectado
```

**Causa:** Arquivos de configuração corrompidos ou ausentes.

**Solução:**
```bash
# Verificar integridade dos arquivos
find .killo-workspace/agent -name "*.yaml" -exec file {} \;
find .killo-workspace/agent -name "*.md" -exec file {} \;

# Validar sintaxe YAML
npm install -g yaml-lint
yaml-lint .killo-workspace/agent/agent.yaml

# Recuperar arquivos de exemplo
cp .killo-workspace/agent/actions/example.yaml .killo-workspace/agent/actions/bootstrap-project.yaml
cp .killo-workspace/agent/prompts/example.md .killo-workspace/agent/prompts/ebook-generator.md

# Reiniciar sistema
npm run recover
```

#### Problema: "Recuperação automática falha"

**Sintomas:**
```
❌ Erro ao recuperar sistema: Recovery failed
🔧 Sugestão: Verifique os logs para mais detalhes
```

**Causa:** Sistema de recuperação corrompido ou backups indisponíveis.

**Solução:**
```bash
# Verificar logs de erro
tail -f logs/kilo.log
grep -i error logs/kilo.log

# Verificar se há backups disponíveis
ls -la backups/
ls -la .git/  # se usar versionamento

# Recuperação manual
git checkout HEAD -- .killo-workspace/agent/agent.yaml
git checkout HEAD -- package.json

# Reinstalar dependências
npm install

# Testar recuperação novamente
npm run cli
killo> recuperar erro no projeto
```

### 5. Problemas de Performance

#### Problema: "Sistema muito lento"

**Sintomas:**
- Respostas demoram vários minutos
- Alto uso de CPU
- Memória elevada

**Causa:** Configuração inadequada, falta de recursos, ou processos pesados.

**Solução:**
```bash
# Verificar uso de recursos
top
htop
free -h

# Limpar cache e temporários
npm cache clean --force
rm -rf temp/*
rm -rf logs/*

# Otimizar configuração
cat > killo.config << EOF
module.exports = {
  server: {
    port: 3000,
    timeout: 30000
  },
  cache: {
    type: 'memory',
    ttl: 1800,
    maxSize: 500
  }
};
EOF

# Reiniciar sistema
pkill -f kilo
npm start
```

#### Problema: "ZAI SDK timeout"

**Sintomas:**
```
❌ Erro ao gerar e-book: Error: Request timeout
```

**Causa:** Problemas de rede, API lenta, ou requisições muito grandes.

**Solução:**
```bash
# Testar conectividade
curl -H "Authorization: Bearer $ZAI_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"messages":[{"role":"user","content":"test"}]}' \
     $ZAI_BASE_URL/chat/completions

# Aumentar timeout
export ZAI_TIMEOUT=60000
export KILO_TIMEOUT=90000

# Reduzir complexidade das requisições
npm run cli
killo> escrever um e-book curto sobre JavaScript básico
```

### 6. Problemas de Integração

#### Problema: "VSCode Integration não funciona"

**Sintomas:**
- Extensão não carrega
- Comandos não respondem
- Erros de conexão

**Causa:** Servidor não iniciado, configuração incorreta, ou problemas de extensão.

**Solução:**
```bash
# Verificar se o servidor está rodando
curl http://localhost:3000/system/health

# Iniciar servidor se necessário
npm start &

# Verificar configuração da extensão
code --list-extensions
code --install-extension ms-vscode.vscode-json

# Recarregar VSCode
code --reload-window
```

#### Problema: "Docker container não inicia"

**Sintomas:**
```
docker: Error response from daemon: Container failed to start.
```

**Causa:** Problemas com Dockerfile, permissões, ou configuração.

**Solução:**
```bash
# Verificar Dockerfile
cat Dockerfile

# Construir imagem com debug
docker build --no-cache -t kilo-code .

# Rodar container com logs detalhados
docker run -p 3000:3000 --rm kilo-code

# Verificar logs do container
docker logs <container_id>

# Verificar permissões
docker run -u $(id -u):$(id -g) -p 3000:3000 --rm kilo-code
```

---

## 🚀 Soluções Rápidas

### Solução Rápida 1: Reset Completo do Sistema

```bash
#!/bin/bash
# quick-reset.sh - Reset rápido do sistema

echo "🔄 Reset completo do sistema..."
echo "============================="

# 1. Parar todos os processos
echo "🛑 Parando processos..."
pkill -f kilo
pkill -f node
sleep 2

# 2. Limpar caches
echo "🧹 Limpando caches..."
npm cache clean --force
rm -rf node_modules
rm -rf package-lock.json
rm -rf temp/*
rm -rf logs/*

# 3. Resetar configuração
echo "🔧 Resetando configuração..."
git checkout HEAD -- kilo.config
git checkout HEAD -- .killo-workspace/

# 4. Reinstalar dependências
echo "📦 Reinstalando dependências..."
npm install

# 5. Verificar sistema
echo "🔍 Verificando sistema..."
npm run health-check

# 6. Testar CLI
echo "🧪 Testando CLI..."
echo "status" | npm run cli

echo "✅ Reset completo!"
```

### Solução Rápida 2: Recuperação de Emergência

```bash
#!/bin/bash
# emergency-recovery.sh - Recuperação de emergência

echo "🚨 Recuperação de emergência..."
echo "==============================="

# 1. Backup do estado atual
echo "💾 Criando backup de emergência..."
tar -czf emergency-backup-$(date +%Y%m%d_%H%M%S).tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=temp \
    --exclude=logs \
    ./

# 2. Restaurar arquivos críticos do Git
echo "🔄 Restaurando arquivos críticos..."
git fetch origin
git reset --hard origin/main

# 3. Reinstalar dependências
echo "📦 Reinstalando dependências..."
npm install

# 4. Criar estrutura de diretórios
echo "📁 Criando estrutura de diretórios..."
mkdir -p output/{ebooks,apis,dashboards}
mkdir -p projects
mkdir -p logs
mkdir -p temp
mkdir -p data

# 5. Dar permissões
echo "🔐 Configurando permissões..."
chmod +x scripts/*.sh
chmod +x .killo-workspace/scripts/*.sh

# 6. Testar sistema
echo "🧪 Testando sistema..."
npm run health-check

echo "✅ Recuperação de emergência concluída!"
```

### Solução Rápida 3: Diagnóstico Rápido

```bash
#!/bin/bash
# quick-diagnosis.sh - Diagnóstico rápido do sistema

echo "🔍 Diagnóstico rápido do sistema..."
echo "================================="

# Função de status
status() {
    if [ $1 -eq 0 ]; then
        echo "✅ $2"
    else
        echo "❌ $2"
    fi
}

# 1. Verificar Node.js
echo "📋 Verificando Node.js..."
node --version > /dev/null 2>&1
status $? "Node.js instalado"

# 2. Verificar npm
echo "📋 Verificando npm..."
npm --version > /dev/null 2>&1
status $? "npm instalado"

# 3. Verificar estrutura de arquivos
echo "📋 Verificando estrutura de arquivos..."
test -f ".killo-workspace/agent/agent.yaml"
status $? "Arquivo agent.yaml existe"

test -f "package.json"
status $? "Arquivo package.json existe"

test -f "src/app.js"
status $? "Arquivo app.js existe"

# 4. Verificar dependências
echo "📋 Verificando dependências..."
test -d "node_modules"
status $? "Dependências instaladas"

# 5. Verificar permissões
echo "📋 Verificando permissões..."
test -x "scripts/kindex-fast.sh"
status $? "Scripts executáveis"

# 6. Verificar portas
echo "📋 Verificando portas..."
netstat -tuln 2>/dev/null | grep :3000 > /dev/null
if [ $? -eq 0 ]; then
    echo "❌ Porta 3000 já está em uso"
else
    echo "✅ Porta 3000 disponível"
fi

# 7. Verificar espaço em disco
echo "📋 Verificando espaço em disco..."
DISK_USAGE=$(df . | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 80 ]; then
    echo "❌ Espaço em disco crítico: ${DISK_USAGE}%"
else
    echo "✅ Espaço em disco OK: ${DISK_USAGE}%"
fi

# 8. Verificar memória
echo "📋 Verificando memória..."
MEMORY_USAGE=$(free | grep Mem | awk '{print ($3/$2) * 100.0}')
MEMORY_INT=${MEMORY_USAGE%.*}
if [ "$MEMORY_INT" -gt 80 ]; then
    echo "❌ Uso de memória crítico: ${MEMORY_INT}%"
else
    echo "✅ Uso de memória OK: ${MEMORY_INT}%"
fi

echo "🔍 Diagnóstico concluído!"
```

---

## ❓ FAQ - Perguntas Frequentes

### Instalação e Configuração

#### P: Quais são os requisitos mínimos para rodar o Kilo Code?

**R:** Os requisitos mínimos são:
- **Node.js**: 16.0 ou superior
- **npm**: 8.0 ou superior
- **Memória RAM**: 512MB (recomendado 1GB+)
- **Espaço em disco**: 100MB (recomendado 1GB+)
- **Sistema**: Windows 10+, Linux Ubuntu 18.04+, ou macOS 10.15+

#### P: Preciso ter uma chave da API ZAI?

**R:** Não é obrigatório, mas recomendado. Sem a chave ZAI, algumas funcionalidades de IA não estarão disponíveis, mas o sistema continuará funcionando com os agentes de recuperação e validação.

#### P: Como instalo em ambiente corporativo atrás de proxy?

**R:** Configure o proxy para npm e Node.js:
```bash
# Configurar proxy npm
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080

# Configurar proxy para Node.js
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080

# Instalar normalmente
npm install
```

### Uso e Funcionalidades

#### P: Como faço para criar meu próprio agente personalizado?

**R:** Siga estes passos:
1. Crie um arquivo YAML em `.killo-workspace/agent/actions/`
2. Crie um arquivo Markdown correspondente em `.killo-workspace/agent/prompts/`
3. Adicione a intenção ao `CommandProcessor`
4. Reinicie o sistema

**Exemplo:**
```yaml
# meu-agente.yaml
name: "meu-agente"
version: "1.0.0"
description: "Meu agente personalizado"
capabilities:
  - "Minha capacidade especial"
```

#### P: Posso usar o Kilo Code para gerar código em outras linguagens?

**R:** Sim! O Kilo Code pode gerar código em qualquer linguagem. Basta especificar no comando:
```bash
killo> escrever um e-book sobre Python
killo> criar projeto java com template api
killo> gerar api em C# com autenticação
```

#### P: Como integro o Kilo Code com meu fluxo de trabalho existente?

**R:** Você pode integrar de várias formas:
- **CLI**: Use `npm run cli` para comandos interativos
- **API REST**: Integre com suas aplicações via HTTP
- **Scripts**: Automatize tarefas com scripts shell
- **GitHub Actions**: Automatize em seu CI/CD
- **VSCode**: Use a extensão para integração direta

### Problemas Técnicos

#### P: Por que estou recebendo erros de permissão no Linux/macOS?

**R:** Isso geralmente acontece devido a permissões de arquivo. Resolva com:
```bash
# Corrigir permissões do projeto
sudo chown -R $USER:$USER .
chmod +x scripts/*.sh
chmod +x .killo-workspace/scripts/*.sh

# Ou use npm sem sudo (recomendado)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

#### P: O sistema fica muito lento quando gero e-books grandes. Como posso melhorar?

**R:** Para melhorar performance:
1. **Aumente o timeout**: `export KILO_TIMEOUT=120000`
2. **Reduza o tamanho**: Peça e-books menores ou divida em capítulos
3. **Use cache**: O sistema já tem cache integrado
4. **Verifique recursos**: Garanta que tenha memória e CPU suficientes
5. **Otimize prompts**: Use prompts mais específicos e diretos

#### P: Como faço backup do meu sistema Kilo Code?

**R:** Você pode fazer backup de várias formas:
```bash
# Backup completo
tar -czf kilo-backup-$(date +%Y%m%d).tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=temp \
    --exclude=logs \
    ./

# Backup Git (recomendado)
git add .
git commit -m "Backup automático"
git push origin main

# Backup específico
cp -r .killo-workspace/ backup-agent/
cp -r output/ backup-output/
```

### Desenvolvimento e Contribuição

#### P: Como contribuo para o projeto Kilo Code?

**R:** Para contribuir:
1. **Fork** o repositório
2. **Crie uma branch** para sua feature
3. **Faça suas alterações**
4. **Adicione testes** se necessário
5. **Abra um Pull Request** com descrição detalhada

#### P: Quais são as boas práticas para criar novos agentes?

**R:** Boas práticas para agentes:
- **Separação clara**: YAML para lógica, Markdown para conhecimento
- **Nomes descritivos**: Use nomes claros e consistentes
- **Documentação**: Documente todas as capacidades e limitações
- **Testes**: Teste cada agente individualmente
- **Recuperação**: Inclua estratégias de recuperação de falhas
- **Monitoramento**: Adicione métricas específicas do agente

#### P: Como testo meus agentes personalizados?

**R:** Você pode testar seus agentes com:
```bash
# Testar via CLI
npm run cli
killo> [seu-comando-personalizado]

# Testar via API
curl -X POST http://localhost:3000/agent/execute \
  -H "Content-Type: application/json" \
  -d '{"command": "[seu-comando-personalizado]"}'

# Testar com script
node -e "
const { CommandProcessor } = require('./src/services/commandProcessor');
const processor = new CommandProcessor();
processor.initialize().then(() => {
  processor.processCommand('[seu-comando-personalizado]').then(console.log);
});
"
```

### Performance e Escalabilidade

#### P: Quantos usuários simultâneos o Kilo Code suporta?

**R:** A capacidade depende da configuração:
- **Desenvolvimento**: 1-5 usuários simultâneos
- **Produção pequena**: 10-50 usuários simultâneos
- **Produção média**: 50-200 usuários simultâneos (com load balancing)
- **Produção grande**: 200+ usuários (com cluster e escalabilidade horizontal)

#### P: Como faço para escalar o Kilo Code para produção?

**R:** Para escalar em produção:
1. **Use PM2** para gerenciamento de processos
2. **Configure load balancing** com Nginx
3. **Use Redis** para cache distribuído
4. **Configure banco de dados** externo (PostgreSQL)
5. **Use Docker e Kubernetes** para orquestração
6. **Monitore com Prometheus/Grafana**

#### P: Qual o custo estimado para rodar em produção?

**R:** O custo varia conforme a infraestrutura:
- **Mínimo**: $5-20/mês (VPS básico)
- **Pequeno**: $20-100/mês (VPS com bom desempenho)
- **Médio**: $100-500/mês (múltiplos servidores)
- **Grande**: $500+/mês (infraestrutura completa com monitoramento)

---

## 🔍 Diagnóstico Avançado

### Ferramentas de Diagnóstico

#### 1. Verificação de Saúde Completa

```bash
#!/bin/bash
# health-check-advanced.sh - Verificação de saúde avançada

echo "🔍 Verificação de Saúde Avançada"
echo "================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função de status
check_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
        return 0
    else
        echo -e "${RED}❌ $2${NC}"
        return 1
    fi
}

# Função de aviso
check_warning() {
    if [ $1 -gt $2 ]; then
        echo -e "${YELLOW}⚠️ $3${NC}"
        return 1
    else
        echo -e "${GREEN}✅ $3${NC}"
        return 0
    fi
}

echo -e "\n📋 Verificando Sistema Operacional..."
uname -a
check_status $? "Sistema operacional identificado"

echo -e "\n📋 Verificando Node.js..."
node --version
check_status $? "Node.js instalado"

echo -e "\n📋 Verificando npm..."
npm --version
check_status $? "npm instalado"

echo -e "\n📋 Verificando Git..."
git --version
check_status $? "Git instalado"

echo -e "\n📋 Verificando estrutura de diretórios..."
test -d ".killo-workspace"
check_status $? "Diretório .killo-workspace existe"

test -d ".killo-workspace/agent"
check_status $? "Diretório agent existe"

test -d ".killo-workspace/agent/actions"
check_status $? "Diretório actions existe"

test -d ".killo-workspace/agent/prompts"
check_status $? "Diretório prompts existe"

echo -e "\n📋 Verificando arquivos críticos..."
test -f ".killo-workspace/agent/agent.yaml"
check_status $? "Arquivo agent.yaml existe"

test -f "package.json"
check_status $? "Arquivo package.json existe"

test -f "src/app.js"
check_status $? "Arquivo app.js existe"

test -f "src/cli/killo-cli.js"
check_status $? "Arquivo CLI existe"

echo -e "\n📋 Verificando dependências..."
test -d "node_modules"
check_status $? "Dependências instaladas"

npm list --depth=0 > /dev/null 2>&1
check_status $? "Dependências íntegras"

echo -e "\n📋 Verificando permissões..."
test -x "scripts/kindex-fast.sh"
check_status $? "Script kindex-fast.sh executável"

test -x ".killo-workspace/scripts/kilo-init.sh"
check_status $? "Script killo-init.sh executável"

echo -e "\n📋 Verificando portas..."
if netstat -tuln 2>/dev/null | grep -q :3000; then
    echo -e "${RED}❌ Porta 3000 já está em uso${NC}"
    echo "   Processos usando porta 3000:"
    lsof -ti:3000 | head -5
else
    echo -e "${GREEN}✅ Porta 3000 disponível${NC}"
fi

echo -e "\n📋 Verificando espaço em disco..."
DISK_USAGE=$(df . | awk 'NR==2 {print $5}' | sed 's/%//')
check_warning $DISK_USAGE 80 "Uso de disco: ${DISK_USAGE}%"

echo -e "\n📋 Verificando memória..."
MEMORY_USAGE=$(free | grep Mem | awk '{print ($3/$2) * 100.0}')
MEMORY_INT=${MEMORY_USAGE%.*}
check_warning $MEMORY_INT 80 "Uso de memória: ${MEMORY_INT}%"

echo -e "\n📋 Verificando CPU..."
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | sed 's/%us,//')
CPU_INT=${CPU_USAGE%.*}
check_warning $CPU_INT 80 "Uso de CPU: ${CPU_INT}%"

echo -e "\n📋 Verificando conectividade de rede..."
if ping -c 1 google.com > /dev/null 2>&1; then
    check_status 0 "Conectividade de rede OK"
else
    check_status 1 "Sem conectividade de rede"
fi

echo -e "\n📋 Verificando ZAI SDK (se configurado)..."
if [ -n "$ZAI_API_KEY" ]; then
    if curl -s -H "Authorization: Bearer $ZAI_API_KEY" "$ZAI_BASE_URL/health" > /dev/null; then
        check_status 0 "ZAI SDK conectado"
    else
        check_status 1 "ZAI SDK não conectado"
    fi
else
    echo -e "${YELLOW}⚠️ ZAI SDK não configurado${NC}"
fi

echo -e "\n📋 Verificando processos Kilo Code..."
KILO_PROCESSES=$(pgrep -f "killo" | wc -l)
if [ "$KILO_PROCESSES" -gt 0 ]; then
    echo -e "${GREEN}✅ $KILO_PROCESSES processos Kilo Code rodando${NC}"
    echo "   Processos:"
    pgrep -f "killo" | head -5
else
    echo -e "${YELLOW}⚠️ Nenhum processo Kilo Code rodando${NC}"
fi

echo -e "\n📋 Verificando logs recentes..."
if [ -f "logs/kilo.log" ]; then
    echo "   Últimas 5 linhas de log:"
    tail -5 logs/kilo.log
else
    echo -e "${YELLOW}⚠️ Arquivo de log não encontrado${NC}"
fi

echo -e "\n🔍 Verificação de saúde concluída!"
```

#### 2. Análise de Performance

```bash
#!/bin/bash
# performance-analysis.sh - Análise de performance

echo "📊 Análise de Performance"
echo "========================="

# Tempo de inicialização
echo "⏱️ Medindo tempo de inicialização..."
start_time=$(date +%s.%N)
npm start &
SERVER_PID=$!
sleep 5
end_time=$(date +%s.%N)
startup_time=$(echo "$end_time - $start_time" | bc)
echo "Tempo de inicialização: ${startup_time}s"

# Teste de carga
echo "📈 Teste de carga..."
ab -n 100 -c 10 http://localhost:3000/system/health

# Uso de recursos durante teste
echo "💾 Uso de recursos durante teste:"
ps aux | grep kilo | grep -v grep

# Limpar
kill $SERVER_PID 2>/dev/null
wait $SERVER_PID 2>/dev/null

echo "✅ Análise de performance concluída!"
```

#### 3. Diagnóstico de Rede

```bash
#!/bin/bash
# network-diagnosis.sh - Diagnóstico de rede

echo "🌐 Diagnóstico de Rede"
echo "===================="

# Testar conectividade básica
echo "🔗 Testando conectividade básica..."
ping -c 3 google.com
echo ""

# Testar resolução DNS
echo "🌍 Testando resolução DNS..."
nslookup google.com
echo ""

# Testar portas locais
echo "🔌 Testando portas locais..."
netstat -tuln | grep -E ":3000|:8080|:80"
echo ""

# Testar conectividade com APIs externas
echo "🌐 Testando conectividade com APIs externas..."
if [ -n "$ZAI_API_KEY" ]; then
    echo "Testando ZAI API..."
    curl -w "Status: %{http_code}\nTime: %{time_total}s\n" \
         -H "Authorization: Bearer $ZAI_API_KEY" \
         "$ZAI_BASE_URL/health" \
         --connect-timeout 10 \
         --max-time 30
    echo ""
fi

# Testar latência
echo "⏱️ Testando latência..."
for i in {1..5}; do
    latency=$(ping -c 1 google.com | grep 'time=' | cut -d'=' -f2 | cut -d' ' -f1)
    echo "Ping $i: ${latency}ms"
done

echo "✅ Diagnóstico de rede concluído!"
```

---

## 🚨 Recuperação de Desastres

### Cenário 1: Perda Completa do Sistema

#### Sintomas:
- Todos os arquivos foram perdidos
- Sem backup disponível
- Sistema não inicia

#### Solução:

```bash
#!/bin/bash
# disaster-recovery.sh - Recuperação de desastres completa

echo "🚨 RECUPERAÇÃO DE DESASTRES COMPLETA"
echo "==================================="

# 1. Clonar repositório fresco
echo "📥 Clonando repositório fresco..."
cd /tmp
git clone https://github.com/OARANHA/Kilo-Code-Automacao-Template.git kilo-recovery
cd kilo-recovery

# 2. Instalar dependências
echo "📦 Instalando dependências..."
npm install

# 3. Configurar variáveis de ambiente
echo "⚙️ Configurando ambiente..."
cp .env.example .env
# Editar .env com suas configurações
nano .env

# 4. Inicializar sistema
echo "🚀 Inicializando sistema..."
npm run init

# 5. Verificar saúde
echo "🔍 Verificando saúde..."
npm run health-check

# 6. Testar funcionalidades básicas
echo "🧪 Testando funcionalidades..."
echo "status" | npm run cli

echo "✅ Sistema recuperado com sucesso!"
echo "📁 Sistema recuperado em: /tmp/kilo-recovery"
echo "🔄 Copie seus arquivos personalizados de volta"
```

### Cenário 2: Corrupção de Banco de Dados

#### Sintomas:
- Erros de banco de dados
- Dados inconsistentes
- Sistema não consegue ler/escrever

#### Solução:

```bash
#!/bin/bash
# database-recovery.sh - Recuperação de banco de dados

echo "🗄️ RECUPERAÇÃO DE BANCO DE DADOS"
echo "================================"

# 1. Parar sistema
echo "🛑 Parando sistema..."
pkill -f kilo
pkill -f node

# 2. Fazer backup do banco corrompido
echo "💾 Backup do banco corrompido..."
cp data/kilo.db data/kilo.db.corrupted.$(date +%Y%m%d_%H%M%S)

# 3. Remover banco corrompido
echo "🗑️ Removendo banco corrompido..."
rm -f data/kilo.db

# 4. Recriar banco de dados
echo "🏗️ Recriando banco de dados..."
mkdir -p data

# 5. Iniciar sistema (vai recriar o banco)
echo "🚀 Iniciando sistema..."
npm start &
sleep 5

# 6. Verificar integridade
echo "🔍 Verificando integridade..."
curl -s http://localhost:3000/system/health | jq .

# 7. Testar operações básicas
echo "🧪 Testando operações..."
echo "escrever um e-book sobre teste" | npm run cli

echo "✅ Banco de dados recuperado!"
```

### Cenário 3: Perda de Configuração

#### Sintomas:
- Configurações perdidas
- Sistema não reconhece comandos
- Agentes não carregam

#### Solução:

```bash
#!/bin/bash
# config-recovery.sh - Recuperação de configuração

echo "⚙️ RECUPERAÇÃO DE CONFIGURAÇÃO"
echo "==============================="

# 1. Backup da configuração atual
echo "💾 Backup da configuração atual..."
if [ -f "killo.config" ]; then
    cp kilo.config killo.config.backup.$(date +%Y%m%d_%H%M%S)
fi

# 2. Restaurar configuração padrão
echo "🔄 Restaurando configuração padrão..."
cat > kilo.config << EOF
module.exports = {
  server: {
    port: process.env.KILO_PORT || 3000,
    host: process.env.KILO_HOST || 'localhost',
    env: process.env.KILO_ENV || 'development'
  },
  agent: {
    name: 'DeepSeek-FSA-Autonomous',
    version: '4.0',
    workspace: './.killo-workspace',
    autoRecovery: true,
    continuousOperation: true
  },
  cache: {
    type: process.env.CACHE_TYPE || 'memory',
    ttl: 3600,
    maxSize: 1000
  },
  database: {
    type: process.env.DB_TYPE || 'sqlite',
    file: process.env.DB_FILE || './data/kilo.db'
  },
  security: {
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization']
    },
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100
    }
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || './logs/kilo.log'
  }
};
EOF

# 3. Resetar workspace do agente
echo "🔄 Resetando workspace do agente..."
git checkout HEAD -- .killo-workspace/

# 4. Reinicializar sistema
echo "🚀 Reinicializando sistema..."
npm run init

# 5. Testar configuração
echo "🧪 Testando configuração..."
npm run health-check

echo "✅ Configuração recuperada!"
```

---

## 📞 Contato e Suporte

### Quando Procurar Ajuda

Procure ajuda quando:
- Você tentou todas as soluções deste guia e o problema persiste
- Você encontrou um bug não documentado
- Você precisa de ajuda com personalização avançada
- Você tem sugestões para melhorar o projeto

### Canais de Suporte

#### 1. GitHub Issues (Recomendado)
- **URL**: https://github.com/OARANHA/Kilo-Code-Automacao-Template/issues
- **Para**: Bugs, feature requests, problemas técnicos
- **Tempo de resposta**: 24-48 horas

#### 2. Email Direto
- **Email**: aranha@ulbra.edu.br
- **Para**: Suporte prioritário, questões comerciais
- **Tempo de resposta**: 12-24 horas

#### 3. Documentação
- **Wiki**: GitHub Wiki do projeto
- **Para**: Documentação detalhada, tutoriais
- **Disponibilidade**: 24/7

#### 4. Comunidade
- **Discussions**: GitHub Discussions
- **Para**: Discussões gerais, compartilhamento de experiências
- **Disponibilidade**: Comunitária

### Como Reportar um Problema

Ao reportar um problema, inclua:

#### Informações Essenciais
```markdown
## Ambiente
- **Sistema Operacional**: [Ubuntu 20.04, Windows 10, etc.]
- **Node.js Versão**: [v16.0.0, etc.]
- **Kilo Code Versão**: [v2.0.0, etc.]
- **NPM Versão**: [8.0.0, etc.]

## Problema
**Descrição**: [Descreva o problema em detalhes]

## Passos para Reproduzir
1. [Primeiro passo]
2. [Segundo passo]
3. [Terceiro passo]

## Comportamento Esperado
[O que você esperava que acontecesse]

## Comportamento Atual
[O que realmente aconteceu]

## Logs Relevantes
```
[Cole os logs relevantes aqui]
```

## Tentei
[Descreva o que você já tentou para resolver]
```

#### Exemplo de Issue Bem Formatada
```markdown
## Ambiente
- **Sistema Operacional**: Ubuntu 20.04
- **Node.js Versão**: v16.15.0
- **Kilo Code Versão**: v2.0.0
- **NPM Versão**: 8.5.0

## Problema
**Descrição**: O comando `escrever um e-book sobre React` falha com timeout após 30 segundos

## Passos para Reproduzir
1. Execute `npm run cli`
2. Digite `escrever um e-book sobre React`
3. Aguarde 30 segundos
4. Observe o erro de timeout

## Comportamento Esperado
O e-book deveria ser gerado com sucesso em menos de 30 segundos

## Comportamento Atual
O sistema exibe: `❌ Erro ao gerar e-book: Error: Request timeout`

## Logs Relevantes
```
[2025-08-13 04:53:27] 🔍 Processando comando: "escrever um e-book sobre React"
[2025-08-13 04:53:27] 🎯 Intenção identificada: ebook-generator
[2025-08-13 04:53:57] ❌ Erro ao gerar e-book: Error: Request timeout
```

## Tentei
- Aumentar o timeout para 60 segundos
- Verificar a conectividade com a API ZAI
- Reiniciar o sistema
- Reinstalar as dependências
```

### Níveis de Suporte

| Nível | Descrição | Tempo de Resposta | Canais |
|-------|-----------|------------------|---------|
| **Comunidade** | Suporte voluntário da comunidade | 24-72 horas | GitHub Discussions, Fóruns |
| **Básico** | Suporte a bugs e problemas básicos | 24-48 horas | GitHub Issues |
| **Prioritário** | Suporte a problemas críticos | 12-24 horas | Email Direto |
| **Empresarial** | Suporte premium com SLA | 1-4 horas | Email, Telefone, Video |

---

## 🎯 Melhores Práticas

### Prevenção de Problemas

#### 1. Backups Regulares
```bash
# Script de backup automático
#!/bin/bash
# automated-backup.sh

BACKUP_DIR="./backups"
DATE=$(date '+%Y-%m-%d_%H-%M-%S')

# Criar backup
tar -czf "$BACKUP_DIR/kilo-backup-$DATE.tar.gz" \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=temp \
    --exclude=logs \
    ./

# Manter apenas os últimos 7 dias
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +7 -delete

echo "✅ Backup automático concluído: kilo-backup-$DATE.tar.gz"
```

#### 2. Monitoramento Contínuo
```bash
# Script de monitoramento
#!/bin/bash
# monitoring.sh

# Verificar saúde do sistema
if ! npm run health-check > /dev/null 2>&1; then
    echo "🚨 Sistema não está saudável!"
    # Tentar recuperação automática
    npm run recover
fi

# Verificar uso de recursos
MEMORY_USAGE=$(free | grep Mem | awk '{print ($3/$2) * 100.0}')
MEMORY_INT=${MEMORY_USAGE%.*}

if [ "$MEMORY_INT" -gt 80 ]; then
    echo "⚠️ Uso de memória crítico: ${MEMORY_INT}%"
    # Limpar cache
    npm cache clean --force
fi
```

#### 3. Atualizações Seguras
```bash
# Script de atualização segura
#!/bin/bash
# safe-update.sh

# 1. Fazer backup
echo "💾 Fazendo backup antes da atualização..."
./automated-backup.sh

# 2. Verificar compatibilidade
echo "🔍 Verificando compatibilidade..."
npm outdated

# 3. Atualizar dependências
echo "📦 Atualizando dependências..."
npm update

# 4. Testar sistema
echo "🧪 Testando sistema..."
npm run health-check
npm test

# 5. Se tudo OK, continuar
if [ $? -eq 0 ]; then
    echo "✅ Atualização concluída com sucesso!"
else
    echo "❌ Falha na atualização, restaurando backup..."
    # Restaurar último backup
    tar -xzf backups/kilo-backup-$(ls -t backups/ | head -1)
fi
```

### Otimização de Performance

#### 1. Configuração Otimizada
```javascript
// killo.config.optimized.js
module.exports = {
  server: {
    port: 3000,
    timeout: 60000,
    keepAliveTimeout: 65000
  },
  cache: {
    type: 'memory',
    ttl: 7200, // 2 horas
    maxSize: 2000,
    checkPeriod: 600000 // 10 minutos
  },
  database: {
    type: 'sqlite',
    file: './data/kilo.db',
    pool: {
      min: 2,
      max: 10
    }
  },
  security: {
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 200 // aumentado para melhor performance
    }
  },
  logging: {
    level: 'warn', // reduz logs para melhor performance
    file: './logs/kilo.log',
    maxSize: '20MB',
    maxFiles: 3
  }
};
```

#### 2. Gerenciamento de Memória
```javascript
// memory-management.js
const memoryManagement = {
  // Limpar cache periodicamente
  startCacheCleanup() {
    setInterval(() => {
      if (global.cache) {
        const currentSize = global.cache.size;
        if (currentSize > 1500) {
          // Limpar 20% do cache
          const itemsToRemove = Math.floor(currentSize * 0.2);
          let removed = 0;
          for (const [key] of global.cache.entries()) {
            if (removed >= itemsToRemove) break;
            global.cache.delete(key);
            removed++;
          }
        }
      }
    }, 300000); // A cada 5 minutos
  },
  
  // Monitorar uso de memória
  startMemoryMonitoring() {
    setInterval(() => {
      const used = process.memoryUsage();
      const usedMB = Math.round(used.rss / 1024 / 1024);
      
      if (usedMB > 500) { // Se usar mais de 500MB
        global.gc && global.gc(); // Forçar garbage collection
      }
    }, 60000); // A cada minuto
  }
};

module.exports = memoryManagement;
```

### Segurança

#### 1. Configuração de Segurança
```javascript
// security-config.js
const securityConfig = {
  // Headers de segurança
  helmet: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"]
      }
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true
    }
  },
  
  // Rate limiting avançado
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
    keyGenerator: (req) => req.ip
  },
  
  // Validação de entrada
  inputValidation: {
    sanitize: true,
    xss: true,
    noSql: true,
    level: 'strict'
  },
  
  // Autenticação (se necessário)
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET || 'your-secret-key',
      expiresIn: '24h'
    },
    bcrypt: {
      saltRounds: 12
    }
  }
};

module.exports = securityConfig;
```

#### 2. Auditoria de Segurança
```bash
#!/bin/bash
# security-audit.sh

echo "🔒 Auditoria de Segurança"
echo "======================="

# Verificar permissões de arquivos
echo "📁 Verificando permissões de arquivos..."
find . -type f -name "*.js" -exec chmod 644 {} \;
find . -type f -name "*.sh" -exec chmod 755 {} \;
find . -type f -name "*.json" -exec chmod 644 {} \;

# Verificar arquivos sensíveis
echo "🔍 Verificando arquivos sensíveis..."
if [ -f ".env" ]; then
    chmod 600 .env
    echo "✅ Arquivo .env protegido"
fi

# Verificar dependências vulneráveis
echo "📦 Verificando dependências vulneráveis..."
npm audit --audit-level moderate

# Verificar portas abertas
echo "🌐 Verificando portas abertas..."
netstat -tuln | grep -E ":3000|:8080|:80"

echo "✅ Auditoria de segurança concluída!"
```

---

<div align="center">

**🎉 Parabéns! Agora você tem um guia completo de troubleshooting e soluções para o Kilo Code!**

Este guia cobre desde problemas básicos até recuperação de desastres, com soluções passo a passo.

</div>