class ErrorHandler {
  static handle(error, req, res, next) {
    console.error('Error:', error);
    
    // Erros personalizados
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    
    // Erros de autenticação
    if (error.name === 'UnauthorizedError') {
      return res.status(401).json({ error: 'Acesso não autorizado' });
    }
    
    // Erro padrão
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: process.env.KILO_ENV === 'development' ? error.stack : undefined
    });
  }
}

module.exports = ErrorHandler;