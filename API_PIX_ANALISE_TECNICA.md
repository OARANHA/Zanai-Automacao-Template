# Análise Técnica Detalhada da API Pix v2.8.2

## Guia de Implementação para Desenvolvedores

### 1. Estrutura Técnica da API

#### 1.1. Arquitetura REST
- **Formato**: OpenAPI 3.0.0
- **Protocolo**: HTTPS exclusivo
- **Content-Type**: application/json
- **Autenticação**: OAuth 2.0 Client Credentials
- **Respostas**: JSON com estrutura padronizada

#### 1.2. Formato de Dados

##### Estrutura Base de Respostas
```json
{
  "calendario": {
    "criacao": "2024-01-01T10:00:00.000Z",
    "expiracao": 3600,
    "apresentacao": "2024-01-01T10:00:00.000Z"
  },
  "txid": "abc123def456",
  "revisao": 0,
  "status": "ATIVA",
  "valor": {
    "original": "100.00",
    "modalidadeAlteracao": 0
  },
  "chave": "sua-chave-pix@example.com",
  "solicitacaoPagador": "Pagamento do pedido #123",
  "infoAdicionais": [
    {
      "nome": "Produto",
      "valor": "Camiseta Personalizada"
    }
  ]
}
```

##### Estrutura de Erros (RFC 7807)
```json
{
  "type": "https://pix.bcb.gov.br/api/v2/error/RequisicaoInvalida",
  "title": "Requisição Inválida",
  "detail": "O campo valor.original não respeita o schema",
  "status": 400
}
```

### 2. Autenticação e Autorização

#### 2.1. OAuth 2.0 Flow
```bash
# Request Token
curl -X POST https://pix.example.com/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id=SEU_CLIENT_ID&client_secret=SEU_CLIENT_SECRET"

# Response
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "cob.read cob.write"
}
```

#### 2.2. Uso do Token
```bash
curl -X GET https://api.example.com/v2/cob \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### 2.3. Escopos e Permissões

| Escopo | Descrição | Operações Permitidas |
|--------|-----------|---------------------|
| `cob.read` | Leitura de cobranças imediatas | GET /cob, GET /cob/{txid} |
| `cob.write` | Escrita de cobranças imediatas | PUT /cob/{txid}, PATCH /cob/{txid} |
| `cobv.read` | Leitura de cobranças com vencimento | GET /cobv, GET /cobv/{txid} |
| `cobv.write` | Escrita de cobranças com vencimento | PUT /cobv/{txid}, PATCH /cobv/{txid} |
| `cobr.read` | Leitura de cobranças recorrentes | GET /cobr, GET /cobr/{txid} |
| `cobr.write` | Escrita de cobranças recorrentes | PUT/POST/PATCH /cobr/{txid} |
| `pix.read` | Leitura de transações Pix | GET /pix, GET /pix/{e2eid} |
| `pix.write` | Escrita de transações Pix | PUT /pix/{e2eid}/devolucao/{id} |
| `webhook.read` | Leitura de webhooks | GET /webhook, GET /webhook/{chave} |
| `webhook.write` | Escrita de webhooks | PUT /webhook/{chave}, DELETE /webhook/{chave} |

### 3. Endpoints Detalhados

#### 3.1. Cobranças Imediatas

##### Criar Cobrança Imediata
```http
PUT /cob/{txid} HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
Content-Type: application/json

{
  "calendario": {
    "expiracao": 3600
  },
  "devedor": {
    "cpf": "12345678900",
    "nome": "Fulano de Tal"
  },
  "valor": {
    "original": "100.00"
  },
  "chave": "sua-chave-pix@example.com",
  "solicitacaoPagador": "Pagamento do pedido #123"
}
```

##### Resposta de Sucesso
```json
{
  "calendario": {
    "criacao": "2024-01-01T10:00:00.000Z",
    "expiracao": 3600,
    "apresentacao": "2024-01-01T10:00:00.000Z"
  },
  "txid": "abc123def456",
  "revisao": 0,
  "status": "ATIVA",
  "loc": {
    "id": 123,
    "location": "https://api.example.com/v2/loc/123",
    "tipoCob": "cob",
    "criacao": "2024-01-01T10:00:00.000Z"
  },
  "valor": {
    "original": "100.00",
    "modalidadeAlteracao": 0
  },
  "chave": "sua-chave-pix@example.com",
  "solicitacaoPagador": "Pagamento do pedido #123"
}
```

#### 3.2. Cobranças com Vencimento

##### Criar Cobrança com Vencimento
```http
PUT /cobv/{txid} HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
Content-Type: application/json

{
  "calendario": {
    "dataDeVencimento": "2024-12-31",
    "validadeAposVencimento": 30
  },
  "devedor": {
    "cnpj": "12345678900000",
    "nome": "Empresa ABC Ltda"
  },
  "valor": {
    "original": "1000.00",
    "multa": {
      "modalidade": 2,
      "valorPerc": "2.00"
    },
    "juros": {
      "modalidade": 2,
      "valorPerc": "1.00"
    },
    "desconto": {
      "modalidade": 1,
      "descontoDataFixa": [
        {
          "data": "2024-12-15",
          "valorPerc": "10.00"
        }
      ]
    }
  },
  "chave": "sua-chave-pix@example.com",
  "solicitacaoPagador": "Fatura de Dezembro/2024"
}
```

#### 3.3. Recorrências

##### Criar Recorrência
```http
POST /rec HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
Content-Type: application/json

{
  "calendario": {
    "dataInicial": "2024-01-01",
    "dataFinal": "2024-12-31",
    "periodicidade": "MENSAL"
  },
  "valor": {
    "valorRec": "50.00"
  },
  "recebedor": {
    "cnpj": "12345678900000"
  },
  "devedor": {
    "cpf": "12345678900",
    "nome": "Fulano de Tal"
  },
  "politicaRetentativa": "PERMITE_3R_7D"
}
```

### 4. Webhooks

#### 4.1. Configurar Webhook
```http
PUT /webhook/{chave} HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
Content-Type: application/json

{
  "webhookUrl": "https://seu-sistema.com/webhook/pix"
}
```

#### 4.2. Payload de Webhook (Cobrança Paga)
```json
{
  "pix": [
    {
      "endToEndId": "E12345678901234567890123456789012",
      "txid": "abc123def456",
      "valor": "100.00",
      "pagador": {
        "cpf": "12345678900",
        "nome": "Fulano de Tal"
      },
      "infoPagador": "Pagamento do pedido #123",
      "horario": "2024-01-01T10:30:00.000Z"
    }
  ]
}
```

### 5. Locations e Payloads

#### 5.1. Criar Location para QR Code Dinâmico
```http
POST /loc HTTP/1.1
Host: api.example.com
Authorization: Bearer {token}
Content-Type: application/json

{
  "tipoCob": "cob"
}
```

#### 5.2. Recuperar Payload JWS
```http
GET /{pixUrlAccessToken} HTTP/1.1
Host: api.example.com
```

Resposta (JWS - JSON Web Signature):
```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYWxlbmRh...
```

O payload contém:
- Header: Algoritmo de assinatura
- Payload: Dados da cobrança
- Signature: Assinatura digital

### 6. Validações e Regras de Negócio

#### 6.1. Valores Monetários
- **Formato**: String com 2 casas decimais
- **Separador**: Ponto decimal (.)
- **Mínimo**: 0.01 (um centavo)
- **Máximo**: Definido pelo PSP

#### 6.2. Formatos de Data
- **ISO 8601**: YYYY-MM-DDTHH:MM:SS.sssZ
- **Timezone**: UTC obrigatório
- **Exemplo**: "2024-01-01T10:00:00.000Z"

#### 6.3. Chaves Pix
- **E-mail**: fulano@example.com
- **CPF**: 12345678900 (11 dígitos)
- **CNPJ**: 12345678900000 (14 dígitos)
- **Telefone**: +5511912345678
- **Chave Aleatória**: 123e4567-e12b-12d1-a456-426655440000

#### 6.4. Status de Cobrança
- `ATIVA`: Aguardando pagamento
- `CONCLUIDA`: Paga com sucesso
- `REMOVIDA_PELO_USUARIO_RECEBEDOR`: Cancelada
- `REMOVIDA_PELO_PSP`: Removida pelo PSP

### 7. Tratamento de Erros Comuns

#### 7.1. Erros de Validação
```json
{
  "type": "https://pix.bcb.gov.br/api/v2/error/RequisicaoInvalida",
  "title": "Requisição Inválida",
  "detail": "O campo valor.original não respeita o schema",
  "status": 400
}
```

#### 7.2. Erros de Autenticação
```json
{
  "type": "https://pix.bcb.gov.br/api/v2/error/AcessoNegado",
  "title": "Acesso Negado",
  "detail": "Token inválido ou expirado",
  "status": 403
}
```

#### 7.3. Erros de Não Encontrado
```json
{
  "type": "https://pix.bcb.gov.br/api/v2/error/NaoEncontrado",
  "title": "Não Encontrado",
  "detail": "Cobrança não encontrada para o txid informado",
  "status": 404
}
```

### 8. Melhores Práticas de Implementação

#### 8.1. Segurança
- **HTTPS**: Sempre use conexões seguras
- **Tokens**: Armazene tokens de forma segura
- **Validação**: Valide todas as entradas de dados
- **Logs**: Registre todas as operações para auditoria

#### 8.2. Performance
- **Timeout**: Configure timeout adequado (recomendado: 30s)
- **Retry**: Implemente retry com exponential backoff
- **Cache**: Cacheie respostas quando possível
- **Paginação**: Use paginação para listas grandes

#### 8.3. Confiabilidade
- **Webhooks**: Implemente fila de processamento
- **Monitoramento**: Monitore status e performance
- **Alertas**: Configure alertas para erros críticos
- **Backup**: Mantenha backup dos dados importantes

#### 8.4. Testes
- **Homologação**: Teste sempre em ambiente de homologação
- **Casos de Teste**: Cubra todos os fluxos e erros
- **Carga**: Teste com volume de transações
- **Integração**: Teste integração com outros sistemas

### 9. Exemplos de Código

#### 9.1. Node.js - Criar Cobrança
```javascript
const axios = require('axios');

async function criarCobranca(txid, valor, chave) {
  try {
    const response = await axios.put(
      `https://api.example.com/v2/cob/${txid}`,
      {
        calendario: {
          expiracao: 3600
        },
        valor: {
          original: valor.toString()
        },
        chave: chave
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Erro ao criar cobrança:', error.response?.data || error.message);
    throw error;
  }
}
```

#### 9.2. Python - Processar Webhook
```python
from flask import Flask, request, jsonify
import hashlib

app = Flask(__name__)

@app.route('/webhook/pix', methods=['POST'])
def processar_webhook():
    try:
        payload = request.json
        
        # Validar assinatura se necessário
        # processar_pagamento(payload)
        
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
```

### 10. Monitoramento e Observabilidade

#### 10.1. Métricas Importantes
- **Taxa de sucesso**: % de transações concluídas
- **Tempo de resposta**: Latência das chamadas API
- **Taxa de erro**: % de requisições com erro
- **Volume de transações**: Número de operações por período

#### 10.2. Logs Estruturados
```json
{
  "timestamp": "2024-01-01T10:00:00.000Z",
  "level": "info",
  "service": "pix-integration",
  "operation": "criar_cobranca",
  "txid": "abc123def456",
  "valor": "100.00",
  "status": "success",
  "duration": 250
}
```

#### 10.3. Alertas Recomendados
- Alta taxa de erros (> 5%)
- Tempo de resposta elevado (> 5s)
- Falha em webhooks consecutivos
- Discrepância na conciliação

---

*Este guia técnico foi baseado na especificação OpenAPI v2.8.2 da API Pix do Banco Central do Brasil.*