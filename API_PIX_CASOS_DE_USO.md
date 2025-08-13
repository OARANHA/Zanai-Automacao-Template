# API Pix v2.8.2 - Casos de Uso e Implementação Prática

## Guias Práticos para Diferentes Cenários

### 1. E-commerce

#### 1.1. Fluxo Completo de Checkout

##### Passo 1: Criar Cobrança Imediata
```javascript
// checkout-service.js
class CheckoutService {
  async gerarPagamentoPix(carrinho, cliente) {
    const txid = `pedido_${carrinho.id}_${Date.now()}`;
    const valor = carrinho.total.toFixed(2);
    
    const cobranca = {
      calendario: {
        expiracao: 3600 // 1 hora
      },
      devedor: {
        cpf: cliente.cpf,
        nome: cliente.nome
      },
      valor: {
        original: valor
      },
      chave: process.env.PIX_KEY,
      solicitacaoPagador: `Pagamento do pedido #${carrinho.id}`,
      infoAdicionais: [
        {
          nome: "Pedido",
          valor: carrinho.id.toString()
        },
        {
          nome: "Itens",
          valor: `${carrinho.itens.length} itens`
        }
      ]
    };
    
    try {
      const response = await pixApi.put(`/cob/${txid}`, cobranca);
      return {
        txid,
        location: response.data.loc.location,
        valor,
        expiracao: new Date(Date.now() + 3600 * 1000)
      };
    } catch (error) {
      console.error('Erro ao gerar cobrança:', error);
      throw new Error('Não foi possível gerar o pagamento PIX');
    }
  }
}
```

##### Passo 2: Gerar QR Code
```javascript
// qr-code-service.js
class QRCodeService {
  async gerarQRCode(location) {
    try {
      // Buscar payload da location
      const response = await fetch(location);
      const jws = await response.text();
      
      // Gerar QR Code a partir do payload
      const qrCode = await QRCode.toDataURL(jws);
      
      return {
        qrCode,
        copiaECola: jws,
        location
      };
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
      throw new Error('Não foi possível gerar o QR Code');
    }
  }
}
```

##### Passo 3: Processar Webhook de Pagamento
```javascript
// webhook-handler.js
class WebhookHandler {
  async processarPagamento(payload) {
    try {
      for (const pix of payload.pix) {
        const txid = pix.txid;
        const valor = parseFloat(pix.valor);
        const endToEndId = pix.endToEndId;
        
        // Atualizar status do pedido
        const pedido = await PedidoRepository.buscarPorTxid(txid);
        if (pedido) {
          await PedidoRepository.atualizarStatus(pedido.id, 'PAGO');
          await PedidoRepository.registrarPagamento(pedido.id, {
            endToEndId,
            valor,
            dataPagamento: new Date(pix.horario),
            pagador: pix.pagador
          });
          
          // Enviar confirmação para o cliente
          await EmailService.enviarConfirmacaoPagamento(pedido);
          
          // Liberar pedido para envio
          await EstoqueService.reservarItens(pedido.itens);
          await EnvioService.criarEnvio(pedido);
        }
      }
    } catch (error) {
      console.error('Erro ao processar webhook:', error);
      throw error;
    }
  }
}
```

#### 1.2. Monitoramento e Retentativas

```javascript
// payment-monitor.js
class PaymentMonitor {
  constructor() {
    this.interval = setInterval(() => this.verificarPagamentosPendentes(), 300000); // 5 minutos
  }
  
  async verificarPagamentosPendentes() {
    try {
      const pendentes = await PedidoRepository.buscarPendentes();
      
      for (const pedido of pendentes) {
        const expirado = new Date() > pedido.dataExpiracao;
        
        if (expirado) {
          await PedidoRepository.atualizarStatus(pedido.id, 'EXPIRADO');
          await EmailService.notificarPagamentoExpirado(pedido);
        } else {
          // Verificar status via API (opcional)
          await this.verificarStatusPagamento(pedido);
        }
      }
    } catch (error) {
      console.error('Erro ao verificar pagamentos pendentes:', error);
    }
  }
  
  async verificarStatusPagamento(pedido) {
    try {
      const response = await pixApi.get(`/cob/${pedido.txid}`);
      const cobranca = response.data;
      
      if (cobranca.status === 'CONCLUIDA') {
        await PedidoRepository.atualizarStatus(pedido.id, 'PAGO');
      }
    } catch (error) {
      console.error(`Erro ao verificar status do pedido ${pedido.id}:`, error);
    }
  }
}
```

### 2. Assinaturas e Recorrências

#### 2.1. Sistema de Assinaturas

##### Passo 1: Criar Recorrência
```javascript
// subscription-service.js
class SubscriptionService {
  async criarAssinatura(plano, cliente) {
    const idRec = `assinatura_${plano.id}_${cliente.id}_${Date.now()}`;
    
    const recorrência = {
      calendario: {
        dataInicial: this.proximaDataRecorrencia(),
        dataFinal: this.dataFinalRecorrencia(plano.duracao),
        periodicidade: "MENSAL"
      },
      valor: {
        valorRec: plano.valor.toFixed(2)
      },
      recebedor: {
        cnpj: process.env.COMPANY_CNPJ
      },
      devedor: {
        cpf: cliente.cpf,
        nome: cliente.nome
      },
      vinculo: {
        contrato: cliente.contratoId,
        devedor: {
          cpf: cliente.cpf,
          nome: cliente.nome
        },
        objeto: `Assinatura ${plano.nome}`
      },
      politicaRetentativa: "PERMITE_3R_7D"
    };
    
    try {
      const response = await pixApi.post('/rec', recorrência);
      
      // Salvar assinatura no banco
      const assinatura = await AssinaturaRepository.criar({
        idRec: response.data.idRec,
        clienteId: cliente.id,
        planoId: plano.id,
        status: 'ATIVA',
        proximaCobranca: this.proximaDataRecorrencia()
      });
      
      return assinatura;
    } catch (error) {
      console.error('Erro ao criar assinatura:', error);
      throw new Error('Não foi possível criar a assinatura');
    }
  }
  
  proximaDataRecorrencia() {
    const data = new Date();
    data.setMonth(data.getMonth() + 1);
    return data.toISOString().split('T')[0];
  }
  
  dataFinalRecorrencia(duracaoMeses) {
    const data = new Date();
    data.setMonth(data.getMonth() + duracaoMeses);
    return data.toISOString().split('T')[0];
  }
}
```

##### Passo 2: Processar Webhooks de Recorrência
```javascript
// subscription-webhook.js
class SubscriptionWebhookHandler {
  async processarWebhook(payload) {
    try {
      for (const cobranca of payload.cobr) {
        await this.processarCobrancaRecorrente(cobranca);
      }
    } catch (error) {
      console.error('Erro ao processar webhook de recorrência:', error);
    }
  }
  
  async processarCobrancaRecorrente(cobranca) {
    const { txid, idRec, status, valor } = cobranca;
    
    // Buscar assinatura
    const assinatura = await AssinaturaRepository.buscarPorIdRec(idRec);
    if (!assinatura) return;
    
    switch (status) {
      case 'CONCLUIDA':
        await this.processarPagamentoSucesso(assinatura, txid, valor);
        break;
      case 'REMOVIDA_PELO_USUARIO_RECEBEDOR':
        await this.processarCancelamento(assinatura);
        break;
      case 'NAO_PAGO':
        await this.processarFalhaPagamento(assinatura);
        break;
    }
  }
  
  async processarPagamentoSucesso(assinatura, txid, valor) {
    // Atualizar status da assinatura
    await AssinaturaRepository.atualizarStatus(assinatura.id, 'ATIVA');
    
    // Registrar pagamento
    await PagamentoRepository.criar({
      assinaturaId: assinatura.id,
      txid,
      valor: parseFloat(valor.original),
      dataPagamento: new Date(),
      status: 'PAGO'
    });
    
    // Próxima cobrança
    const proximaData = this.calcularProximaCobranca(assinatura);
    await AssinaturaRepository.atualizarProximaCobranca(assinatura.id, proximaData);
    
    // Enviar confirmação
    await EmailService.enviarConfirmacaoPagamento(assinatura.cliente, valor);
  }
  
  async processarFalhaPagamento(assinatura) {
    // Atualizar status
    await AssinaturaRepository.atualizarStatus(assinatura.id, 'INADIMPLENTE');
    
    // Registrar tentativa falha
    await TentativaRepository.registrarFalha(assinatura.id);
    
    // Notificar cliente
    await EmailService.notificarFalhaPagamento(assinatura.cliente);
    
    // Verificar se precisa cancelar
    const tentativas = await TentativaRepository.contarFalhas(assinatura.id);
    if (tentativas >= 3) {
      await this.cancelarAssinatura(assinatura);
    }
  }
}
```

#### 2.2. Gerenciamento de Retentativas

```javascript
// retry-service.js
class RetryService {
  async solicitarRetentativa(assinatura, data) {
    try {
      const txid = `${assinatura.idRec}_${data}`;
      
      await pixApi.post(`/cobr/${txid}/retentativa/${data}`, {
        idRec: assinatura.idRec
      });
      
      await TentativaRepository.registrarRetentativa(assinatura.id, data);
      
      return true;
    } catch (error) {
      console.error('Erro ao solicitar retentativa:', error);
      return false;
    }
  }
  
  async processarRetentativasAutomaticas() {
    try {
      const assinaturasInadimplentes = await AssinaturaRepository.buscarInadimplentes();
      
      for (const assinatura of assinaturasInadimplentes) {
        const tentativas = await TentativaRepository.contarRetentativas(assinatura.id);
        
        if (tentativas < 3) {
          const data = new Date().toISOString().split('T')[0];
          await this.solicitarRetentativa(assinatura, data);
        }
      }
    } catch (error) {
      console.error('Erro ao processar retentativas automáticas:', error);
    }
  }
}
```

### 3. Faturas e Boletos Digitais

#### 3.1. Sistema de Faturamento

##### Passo 1: Gerar Fatura com Vencimento
```javascript
// invoice-service.js
class InvoiceService {
  async gerarFatura(cliente, itens, dataVencimento) {
    const txid = `fatura_${cliente.id}_${Date.now()}`;
    const valor = this.calcularTotal(itens);
    
    const fatura = {
      calendario: {
        dataDeVencimento: dataVencimento,
        validadeAposVencimento: 30 // 30 dias após vencimento
      },
      devedor: {
        cnpj: cliente.cnpj,
        nome: cliente.razaoSocial
      },
      valor: {
        original: valor.toFixed(2),
        multa: {
          modalidade: 2, // Percentual
          valorPerc: "2.00" // 2% de multa
        },
        juros: {
          modalidade: 2, // Percentual
          valorPerc: "1.00" // 1% de juros ao mês
        },
        desconto: {
          modalidade: 1, // Valor fixo por data
          descontoDataFixa: [
            {
              data: this.calcularDataDesconto(dataVencimento, 10),
              valorPerc: "5.00" // 5% de desconto para pagamento até 10 dias antes
            }
          ]
        }
      },
      chave: process.env.PIX_KEY_EMPRESARIAL,
      solicitacaoPagador: `Fatura ${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
      infoAdicionais: [
        {
          nome: "Cliente",
          valor: cliente.razaoSocial
        },
        {
          nome: "Referência",
          valor: `Fatura mensal - ${new Date().toLocaleDateString('pt-BR')}`
        }
      ]
    };
    
    try {
      const response = await pixApi.put(`/cobv/${txid}`, fatura);
      
      // Salvar fatura no banco
      const invoice = await FaturaRepository.criar({
        txid,
        clienteId: cliente.id,
        valor,
        dataVencimento,
        status: 'PENDENTE',
        location: response.data.loc.location
      });
      
      return invoice;
    } catch (error) {
      console.error('Erro ao gerar fatura:', error);
      throw new Error('Não foi possível gerar a fatura');
    }
  }
  
  calcularDataDesconto(dataVencimento, diasAntes) {
    const data = new Date(dataVencimento);
    data.setDate(data.getDate() - diasAntes);
    return data.toISOString().split('T')[0];
  }
  
  calcularTotal(itens) {
    return itens.reduce((total, item) => total + (item.valor * item.quantidade), 0);
  }
}
```

##### Passo 2: Calcular Valor com Juros/Descontos
```javascript
// calculator-service.js
class CalculatorService {
  calcularValorPresente(fatura, dataPagamento) {
    const { valor, desconto, juros, multa } = fatura;
    const dataVencimento = new Date(fatura.dataVencimento);
    const dataPag = new Date(dataPagamento);
    
    let valorFinal = parseFloat(valor.original);
    
    // Aplicar descontos
    if (dataPag < dataVencimento && desconto) {
      valorFinal = this.aplicarDesconto(valorFinal, desconto, dataPag);
    }
    
    // Aplicar juros e multa se pago após vencimento
    if (dataPag > dataVencimento) {
      const diasAtraso = Math.ceil((dataPag - dataVencimento) / (1000 * 60 * 60 * 24));
      
      if (juros) {
        valorFinal = this.aplicarJuros(valorFinal, juros, diasAtraso);
      }
      
      if (multa) {
        valorFinal = this.aplicarMulta(valorFinal, multa);
      }
    }
    
    return valorFinal;
  }
  
  aplicarDesconto(valor, desconto, dataPagamento) {
    if (desconto.modalidade === 1 && desconto.descontoDataFixa) {
      // Desconto fixo por data
      for (const descontoData of desconto.descontoDataFixa) {
        const dataDesconto = new Date(descontoData.data);
        if (dataPagamento <= dataDesconto) {
          const percentual = parseFloat(descontoData.valorPerc) / 100;
          return valor * (1 - percentual);
        }
      }
    } else if (desconto.modalidade >= 2 && desconto.modalidade <= 6) {
      // Desconto percentual
      const percentual = parseFloat(desconto.valorPerc) / 100;
      return valor * (1 - percentual);
    }
    
    return valor;
  }
  
  aplicarJuros(valor, juros, diasAtraso) {
    if (juros.modalidade === 1) {
      // Valor fixo por dia
      return valor + (parseFloat(juros.valor) * diasAtraso);
    } else if (juros.modalidade === 2) {
      // Percentual ao mês (proporcional aos dias)
      const percentualMes = parseFloat(juros.valorPerc) / 100;
      const percentualDia = percentualMes / 30;
      return valor * (1 + (percentualDia * diasAtraso));
    }
    
    return valor;
  }
  
  aplicarMulta(valor, multa) {
    if (multa.modalidade === 1) {
      // Valor fixo
      return valor + parseFloat(multa.valor);
    } else if (multa.modalidade === 2) {
      // Percentual
      const percentual = parseFloat(multa.valorPerc) / 100;
      return valor * (1 + percentual);
    }
    
    return valor;
  }
}
```

### 4. Conciliação Financeira

#### 4.1. Sistema de Conciliação

```javascript
// reconciliation-service.js
class ReconciliationService {
  async conciliarTransacoes(dataInicio, dataFim) {
    try {
      // Buscar transações Pix
      const transacoesPix = await this.buscarTransacoesPix(dataInicio, dataFim);
      
      // Buscar registros internos
      const registrosInternos = await RegistroRepository.buscarPorPeriodo(dataInicio, dataFim);
      
      // Conciliar
      const conciliacao = await this.processarConciliacao(transacoesPix, registrosInternos);
      
      // Gerar relatório
      await this.gerarRelatorioConciliacao(conciliacao);
      
      return conciliacao;
    } catch (error) {
      console.error('Erro na conciliação:', error);
      throw error;
    }
  }
  
  async buscarTransacoesPix(dataInicio, dataFim) {
    const transacoes = [];
    let pagina = 0;
    const itensPorPagina = 100;
    
    while (true) {
      const response = await pixApi.get('/pix', {
        params: {
          inicio: dataInicio,
          fim: dataFim,
          paginacao: {
            paginaAtual: pagina,
            itensPorPagina: itensPorPagina
          }
        }
      });
      
      transacoes.push(...response.data.pix);
      
      if (response.data.pix.length < itensPorPagina) {
        break;
      }
      
      pagina++;
    }
    
    return transacoes;
  }
  
  async processarConciliacao(transacoesPix, registrosInternos) {
    const conciliacao = {
      periodo: { inicio: dataInicio, fim: dataFim },
      totalPix: transacoesPix.length,
      totalInternos: registrosInternos.length,
      conciliados: 0,
      divergencias: [],
      faltantes: []
    };
    
    // Criar mapa de transações por txid/endToEndId
    const mapaPix = new Map();
    for (const transacao of transacoesPix) {
      const chave = transacao.txid || transacao.endToEndId;
      mapaPix.set(chave, transacao);
    }
    
    // Processar cada registro interno
    for (const registro of registrosInternos) {
      const chave = registro.txid || registro.endToEndId;
      const transacaoPix = mapaPix.get(chave);
      
      if (transacaoPix) {
        // Verificar valores
        if (parseFloat(transacaoPix.valor) !== registro.valor) {
          conciliacao.divergencias.push({
            tipo: 'VALOR',
            txid: chave,
            valorPix: parseFloat(transacaoPix.valor),
            valorInterno: registro.valor,
            diferenca: Math.abs(parseFloat(transacaoPix.valor) - registro.valor)
          });
        } else {
          conciliacao.conciliados++;
        }
        
        mapaPix.delete(chave);
      } else {
        conciliacao.faltantes.push({
          tipo: 'INTERNO_SEM_PIX',
          txid: chave,
          valor: registro.valor
        });
      }
    }
    
    // Transações Pix sem registro interno
    for (const [chave, transacao] of mapaPix) {
      conciliacao.faltantes.push({
        tipo: 'PIX_SEM_INTERNO',
        txid: chave,
        valor: parseFloat(transacao.valor)
      });
    }
    
    return conciliacao;
  }
  
  async gerarRelatorioConciliacao(conciliacao) {
    const relatorio = {
      dataGeracao: new Date().toISOString(),
      resumo: {
        periodo: conciliacao.periodo,
        totalTransacoesPix: conciliacao.totalPix,
        totalRegistrosInternos: conciliacao.totalInternos,
        taxaConciliacao: (conciliacao.conciliados / Math.max(conciliacao.totalPix, conciliacao.totalInternos) * 100).toFixed(2) + '%',
        totalDivergencias: conciliacao.divergencias.length,
        totalFaltantes: conciliacao.faltantes.length
      },
      divergencias: conciliacao.divergencias,
      faltantes: conciliacao.faltantes
    };
    
    await RelatorioRepository.salvar(relatorio);
    
    // Enviar notificação se houver divergências significativas
    if (conciliacao.divergencias.length > 0 || conciliacao.faltantes.length > 0) {
      await EmailService.notificarDivergencias(relatorio);
    }
    
    return relatorio;
  }
}
```

### 5. Tratamento de Erros e Recuperação

#### 5.1. Serviço de Tratamento de Erros

```javascript
// error-handler.js
class PixErrorHandler {
  static tratarErro(erro, contexto) {
    console.error(`Erro em ${contexto}:`, erro);
    
    if (erro.response) {
      // Erro da API Pix
      const { status, data } = erro.response;
      
      switch (status) {
        case 400:
          return this.tratarErroValidacao(data, contexto);
        case 401:
        case 403:
          return this.tratarErroAutenticacao(data, contexto);
        case 404:
          return this.tratarErroNaoEncontrado(data, contexto);
        case 429:
          return this.tratarErroRateLimit(data, contexto);
        case 500:
        case 502:
        case 503:
        case 504:
          return this.tratarErroServidor(data, contexto);
        default:
          return this.tratarErroDesconhecido(data, contexto);
      }
    } else if (erro.request) {
      // Erro de rede
      return this.tratarErroRede(erro, contexto);
    } else {
      // Erro inesperado
      return this.tratarErroInesperado(erro, contexto);
    }
  }
  
  static tratarErroValidacao(data, contexto) {
    const erro = {
      tipo: 'VALIDACAO',
      codigo: data.type?.split('/').pop() || 'RequisicaoInvalida',
      mensagem: data.title || 'Erro de validação',
      detalhes: data.detail || 'Dados inválidos',
      contexto,
      severidade: 'ALTA',
      acao: 'Verificar os dados enviados'
    };
    
    // Registrar para análise
    ErrorRepository.registrar(erro);
    
    // Enviar alerta se for recorrente
    this.verificarErroRecorrente(erro);
    
    return erro;
  }
  
  static tratarErroAutenticacao(data, contexto) {
    const erro = {
      tipo: 'AUTENTICACAO',
      codigo: data.type?.split('/').pop() || 'AcessoNegado',
      mensagem: data.title || 'Erro de autenticação',
      detalhes: data.detail || 'Token inválido ou expirado',
      contexto,
      severidade: 'CRITICA',
      acao: 'Verificar credenciais e renovar token'
    };
    
    // Alerta imediato
    AlertaService.enviar(erro);
    
    return erro;
  }
  
  static async verificarErroRecorrente(erro) {
    const chave = `${erro.tipo}_${erro.codigo}_${erro.contexto}`;
    const contagem = await ErrorRepository.contarUltimasHoras(chave, 1);
    
    if (contagem > 10) {
      await AlertaService.enviar({
        tipo: 'ERRO_RECORRENTE',
        mensagem: `Erro ${erro.codigo} ocorreu ${contagem} vezes na última hora`,
        contexto: erro.contexto,
        severidade: 'ALTA'
      });
    }
  }
}
```

#### 5.2. Estratégia de Retry

```javascript
// retry-strategy.js
class RetryStrategy {
  static async executarComRetry(fn, maxTentativas = 3, atrasoBase = 1000) {
    let tentativa = 0;
    
    while (tentativa < maxTentativas) {
      try {
        return await fn();
      } catch (erro) {
        tentativa++;
        
        if (tentativa === maxTentativas) {
          throw erro;
        }
        
        // Verificar se é um erro que vale a pena retry
        if (!this.deveRetry(erro)) {
          throw erro;
        }
        
        const atraso = this.calcularAtraso(tentativa, atrasoBase);
        console.log(`Tentativa ${tentativa} falhou. Retry em ${atraso}ms...`);
        
        await this.dormir(atraso);
      }
    }
  }
  
  static deveRetry(erro) {
    // Não retry para erros de autenticação
    if (erro.response?.status === 401 || erro.response?.status === 403) {
      return false;
    }
    
    // Não retry para erros de validação
    if (erro.response?.status === 400) {
      return false;
    }
    
    // Não retry para erros de não encontrado
    if (erro.response?.status === 404) {
      return false;
    }
    
    // Retry para erros de servidor, rede e rate limit
    return (
      erro.response?.status >= 500 ||
      erro.response?.status === 429 ||
      erro.code === 'ECONNREFUSED' ||
      erro.code === 'ETIMEDOUT'
    );
  }
  
  static calcularAtraso(tentativa, atrasoBase) {
    // Exponential backoff com jitter
    const exponential = Math.pow(2, tentativa - 1) * atrasoBase;
    const jitter = Math.random() * exponential * 0.1; // 10% de jitter
    return Math.min(exponential + jitter, 30000); // Máximo de 30 segundos
  }
  
  static dormir(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

---

*Este guia de casos de uso foi baseado na especificação OpenAPI v2.8.2 da API Pix do Banco Central do Brasil.*