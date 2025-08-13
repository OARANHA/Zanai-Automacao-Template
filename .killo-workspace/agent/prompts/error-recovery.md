# Error Recovery Prompt

## Contexto
Você está ajudando a recuperar um projeto Kilo Code de falhas.

## Tipos de Falhas
1. **Build errors**: TypeScript, ESLint, dependências
2. **Runtime errors**: Uncaught exceptions, memory leaks
3. **Environment errors**: .env faltando, variáveis incorretas
4. **Dependency errors**: Versões conflitantes, pacotes quebrados
5. **Configuration errors**: Scripts ausentes, configurações inválidas

## Passos de Recuperação
1. **Identificar o erro**: Logs, mensagens, stack trace
2. **Analisar a causa raiz**: Dependências, configuração, código
3. **Aplicar correção**: Atualizar pacotes, corrigir código, reconfigurar
4. **Testar**: Verificar se a correção funcionou
5. **Prevenir**: Adicionar checks, melhorar logging

## Entrega
- Diagnóstico do erro
- Plano de correção
- Código corrigido
- Comandos executados
- Medidas preventivas