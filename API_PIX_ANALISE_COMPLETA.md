# Análise Completa da API Pix v2.8.2

## Documento de Referência Rápida

### 1. Visão Geral

**API Pix v2.8.2** - Banco Central do Brasil
- **Licença**: Apache 2.0
- **Suporte**: suporte.pix@bcb.gov.br
- **Controle de versão**: SemVer (Major.Minor.Patch-ReleaseCandidate)

#### Objetivo Principal
Padronizar serviços oferecidos pelo PSP recebedor no contexto do arranjo Pix, direcionando:
- Gerenciamento de cobranças (com e sem recorrências, em lotes ou não)
- Acompanhamento dos Pix e suas devoluções
- Consultas

#### Evolução da API
- **Major**: Alterações incompatíveis, com quebra de contrato (v1.0.0 → v2.0.0)
- **Minor**: Alterações compatíveis, sem quebra de contrato (v1.1.0 → v1.2.0)
- **Patch**: Bugfixes, esclarecimentos, sem alterações funcionais (v1.1.1 → v1.1.2)
- **Release Candidate**: Versões de pré-lançamento (v1.0.0-rc.1 → v1.0.0-rc.22)

### 2. Tratamento de Erros

#### Códigos HTTP
- **2xx**: Sucesso
- **4xx**: Falhas causadas pelo cliente ou estado das entidades
- **5xx**: Problemas no serviço

#### Padrão de Erros
- Formato: RFC 7807
- Campo `type`: `https://pix.bcb.gov.br/api/v2/error/<TipoErro>`

#### Principais Tipos de Erro

##### Gerais (aplicam a todos endpoints)
- `RequisicaoInvalida` (400): Requisição inválida
- `AcessoNegado` (403): Violação de regra de autorização
- `NaoEncontrado` (404): Entidade não encontrada
- `PermanentementeRemovido` (410): Entidade existia mas foi removida
- `ErroInternoDoServidor` (500): Condição inesperada
- `ServicoIndisponivel` (503): Serviço em manutenção ou fora de janela
- `IndisponibilidadePorTempoEsgotado` (504): Timeout

##### Por Tag/Funcionalidade
- `CobPayload*`: Erros em payloads de cobrança
- `RecPayload*`: Erros em payloads de recorrência
- `Rec*`: Erros em gerenciamento de recorrências
- `SolicRec*`: Erros em solicitações de recorrência
- `CobR*`: Erros em cobranças recorrentes
- `Cob*`: Erros em cobranças imediatas
- `CobV*`: Erros em cobranças com vencimento
- `LoteCobV*`: Erros em lotes de cobrança
- `PayloadLocation*`: Erros em gerenciamento de locations
- `Pix*`: Erros em gestão de Pix e devoluções
- `Webhook*`: Erros em gerenciamento de webhooks

### 3. Estrutura de Endpoints (29 endpoints)

#### A. Cobranças Imediatas (Cob)
```
GET    /cob                    - Listar cobranças imediatas
GET    /cob/{txid}             - Consultar cobrança imediata
PUT    /cob/{txid}             - Criar cobrança imediata
PATCH  /cob/{txid}             - Atualizar cobrança imediata
```

#### B. Cobranças com Vencimento (CobV)
```
GET    /cobv                   - Listar cobranças com vencimento
GET    /cobv/{txid}            - Consultar cobrança com vencimento
PUT    /cobv/{txid}            - Criar cobrança com vencimento
PATCH  /cobv/{txid}            - Atualizar cobrança com vencimento
GET    /cobv/{pixUrlAccessToken} - Recuperar payload de cobrança com vencimento
```

#### C. Cobranças Recorrentes (CobR)
```
GET    /cobr                   - Listar cobranças recorrentes
GET    /cobr/{txid}            - Consultar cobrança recorrente
PUT    /cobr/{txid}            - Criar cobrança recorrente
POST   /cobr/{txid}            - Criar cobrança recorrente
PATCH  /cobr/{txid}            - Atualizar cobrança recorrente
POST   /cobr/{txid}/retentativa/{data} - Solicitar retentativa
```

#### D. Lotes de Cobrança (LoteCobV)
```
GET    /lotecobv               - Listar lotes de cobrança
GET    /lotecobv/{id}          - Consultar lote de cobrança
PUT    /lotecobv/{id}          - Criar lote de cobrança
PATCH  /lotecobv/{id}          - Atualizar lote de cobrança
```

#### E. Recorrências (Rec)
```
GET    /rec                    - Listar recorrências
GET    /rec/{idRec}            - Consultar recorrência
POST   /rec                    - Criar recorrência
PATCH  /rec/{idRec}            - Atualizar recorrência
GET    /rec/{recUrlAccessToken} - Recuperar payload de recorrência
```

#### F. Solicitações de Recorrência (SolicRec)
```
GET    /solicrec               - Listar solicitações de recorrência
GET    /solicrec/{idSolicRec}  - Consultar solicitação de recorrência
POST   /solicrec               - Criar solicitação de recorrência
PATCH  /solicrec/{idSolicRec}  - Atualizar solicitação de recorrência
```

#### G. Gestão de Pix
```
GET    /pix                    - Listar Pix recebidos
GET    /pix/{e2eid}            - Consultar Pix
PUT    /pix/{e2eid}/devolucao/{id} - Solicitar devolução
GET    /pix/{e2eid}/devolucao/{id} - Consultar devolução
```

#### H. Locations (Payloads)
```
GET    /{pixUrlAccessToken}    - Recuperar payload de cobrança imediata
POST   /loc                    - Criar location
GET    /loc                    - Listar locations
GET    /loc/{id}               - Consultar location
PATCH  /loc/{id}               - Atualizar location
DELETE /loc/{id}/txid          - Remover txid de location
```

#### I. Locations de Recorrência
```
GET    /locrec                 - Listar locations de recorrência
GET    /locrec/{id}            - Consultar location de recorrência
DELETE /locrec/{id}/idRec      - Remover recorrência de location
```

#### J. Webhooks
```
PUT    /webhook/{chave}        - Configurar webhook
GET    /webhook/{chave}        - Consultar webhook
DELETE /webhook/{chave}        - Remover webhook
GET    /webhook                - Listar webhooks
PUT    /webhookrec             - Configurar webhook de recorrências
GET    /webhookrec             - Consultar webhook de recorrências
PUT    /webhookcobr            - Configurar webhook de cobranças recorrentes
GET    /webhookcobr            - Consultar webhook de cobranças recorrentes
```

### 4. Estrutura de Dados (129 Schemas)

#### Principais Grupos de Schemas

##### A. Identificação
- `CPF`: Cadastro de Pessoa Física
- `CNPJ`: Cadastro Nacional de Pessoa Jurídica

##### B. Cobranças Base
- `CobBase`: Base para cobranças
- `CobBaseCopiaCola`: Base para copia e cola
- `CobCompleta`: Cobrança completa
- `CobCriacao`: Dados para criação
- `CobGerada`: Cobrança gerada
- `CobPayload`: Payload da cobrança
- `CobPayloadValor`: Valor no payload

##### C. Cobranças com Vencimento
- `CobVCompleta`: Cobrança com vencimento completa
- `CobVCriacao`: Dados para criação
- `CobVGerada`: Cobrança com vencimento gerada
- `CobVAtualizacao`: Atualização de cobrança com vencimento

##### D. Cobranças Recorrentes
- `CobRBase`: Base para cobranças recorrentes
- `CobRCompleta`: Cobrança recorrente completa
- `CobRConfiguracao`: Configuração de cobrança recorrente
- `CobRGerada`: Cobrança recorrente gerada
- `CobRNotification`: Notificação de cobrança recorrente

##### E. Recorrências
- `Rec`: Recorrência
- `RecCriacao`: Criação de recorrência
- `RecAtualizacao`: Atualização de recorrência
- `RecCompleta`: Recorrência completa

##### F. Valores e Calculations
- `Valor`: Estrutura de valor
- `ValorModalidade`: Modalidade de valor
- `ValorOriginal`: Valor original
- `ValorFinal`: Valor final
- `Abatimento`: Abatimento
- `Desconto`: Desconto
- `Juros`: Juros
- `Multa`: Multa

##### G. Calendários
- `Calendario`: Calendário base
- `CalendarioCriacao`: Calendário de criação
- `CalendarioAtualizacao`: Calendário de atualização

##### H. Pessoas
- `Devedor`: Devedor
- `Recebedor`: Recebedor
- `Pagador`: Pagador

##### I. Locations e Payloads
- `Location`: Location básica
- `LocationCriacao`: Criação de location
- `LocationAtualizacao`: Atualização de location

##### J. Webhooks
- `Webhook`: Configuração de webhook
- `WebhookUrl`: URL de webhook

##### K. Paginação
- `Paginacao`: Estrutura de paginação
- `ParametrosPaginacao`: Parâmetros de paginação

##### L. Respostas e Listas
- `Cobs`: Lista de cobranças
- `CobsV`: Lista de cobranças com vencimento
- `CobsR`: Lista de cobranças recorrentes
- `Recs`: Lista de recorrências
- `Pixs`: Lista de Pix
- `Locations`: Lista de locations

### 5. Autenticação e Segurança

#### OAuth2
- **Flow**: clientCredentials
- **Token URL**: https://pix.example.com/oauth/token
- **Escopos disponíveis**:
  - `cob.write` - Alteração de cobranças imediatas
  - `cob.read` - Consulta de cobranças imediatas
  - `cobr.write` - Alteração de cobranças recorrentes
  - `cobr.read` - Consulta de cobranças recorrentes
  - `rec.write` - Alteração de recorrências
  - `rec.read` - Consulta de recorrências
  - `solicrec.write` - Alteração de solicitações de recorrências
  - `solicrec.read` - Consulta de solicitações de recorrências
  - `cobv.write` - Alteração de cobranças com vencimento
  - `cobv.read` - Consulta de cobranças com vencimento
  - `lotecobv.write` - Alteração de lotes de cobranças com vencimento
  - `lotecobv.read` - Consulta de lotes de cobranças com vencimento
  - `pix.write` - Alteração de Pix
  - `pix.read` - Consulta de Pix
  - `webhook.read` - Consulta do webhook
  - `webhook.write` - Alteração do webhook
  - `webhookrec.read` - Consulta do webhook de recorrências
  - `webhookrec.write` - Alteração do webhook de recorrências
  - `webhookcobr.read` - Consulta do webhook de cobranças recorrentes
  - `webhookcobr.write` - Alteração do webhook de cobranças recorrentes
  - `payloadlocation.write` - Alteração de payloads
  - `payloadlocation.read` - Consulta de payloads
  - `payloadlocationrec.write` - Alteração de payloads de recorrências
  - `payloadlocationrec.read` - Consulta de payloads de recorrências

### 6. Funcionalidades Principais

#### A. Geração de QR Codes
- QR Code estático (dados embutidos)
- QR Code dinâmico (via location/URL)
- QR Code composto (pagamento + recorrência)

#### B. Tipos de Cobrança
- **Imediata**: Pagamento no ato
- **Com Vencimento**: Data futura com validade
- **Recorrente**: Pagamentos periódicos
- **Em Lote**: Múltiplas cobranças

#### C. Webhooks
- Notificações em tempo real
- Webhooks para cobranças
- Webhooks para recorrências
- Webhooks para Pix recebidos

#### D. Conciliação
- txid para identificação
- Status detalhados
- Histórico de revisões

### 7. Fluxos de Negócio Típicos

#### A. E-commerce
1. Criar cobrança imediata
2. Gerar QR Code dinâmico
3. Monitorar pagamento via webhook
4. Confirmar pedido

#### B. Assinaturas
1. Criar recorrência
2. Gerar cobranças recorrentes
3. Gerenciar falhas e retentativas
4. Cancelar quando necessário

#### C. Boleto Digital
1. Criar cobrança com vencimento
2. Configurar descontos/juros/multa
3. Gerar QR Code para pagamento
4. Gerenciar validade após vencimento

### 8. Requisitos Técnicos Críticos

#### A. Segurança
- HTTPS obrigatório
- Certificados digitais para produção
- Validação de assinaturas JWS
- Proteção contra CSRF e XSS

#### B. Performance
- Rate limiting configurado
- Timeout padrão: 30 segundos
- Paginação obrigatória para listas

#### C. Conformidade
- LGPD (dados pessoais)
- Regulamentações do Bacen
- Log obrigatório de operações

### 9. Boas Práticas

#### A. Implementação
- Usar SDKs quando disponíveis
- Implementar retry com exponential backoff
- Validar todos os dados de entrada
- Monitorar webhooks ativamente

#### B. Monitoramento
- Taxa de sucesso/erro
- Tempo de resposta
- Status de webhooks
- Conciliação financeira

#### C. Testes
- Ambiente de homologação obrigatório
- Testar todos os fluxos de erro
- Validar schemas rigorosamente
- Testar carga e performance

### 10. Pontos de Atenção (Riscos)

#### A. Críticos
- **Dinheiro envolvido**: Erros podem causar perdas financeiras
- **Compliance**: Violações podem resultar em multas
- **Disponibilidade**: Indisponibilidade afeta receitas

#### B. Técnicos
- **Complexidade**: Muitos edge cases e regras de negócio
- **Atualizações**: API evolui constantemente
- **Integração**: Múltiplos sistemas envolvidos

#### C. Operacionais
- **Suporte**: Necessário conhecimento especializado
- **Monitoramento**: Requer vigilância constante
- **Documentação**: Manter sempre atualizada

---

*Esta análise foi baseada na especificação OpenAPI v2.8.2 da API Pix do Banco Central do Brasil.*