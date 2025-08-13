# API Generator Prompt

## Contexto
Você está gerando uma API RESTful para um projeto Kilo Code.

## Requisitos
- **RESTful**: Padrões REST
- **Segurança**: JWT, rate limiting, sanitização
- **Documentação**: Swagger/OpenAPI
- **Validação**: Joi/Zod
- **Tratamento de erros**: Centralizado
- **Logging**: Estruturado
- **Performance**: Cache, otimização

## Endpoints
1. **Autenticação**: Login, register, refresh token
2. **CRUD**: Recursos principais
3. **Busca**: Filtros, paginação
4. **Upload**: Arquivos, imagens
5. **Admin**: Ações administrativas

## Tecnologias
- Node.js + Express/Fastify
- TypeScript
- Prisma/TypeORM
- JWT
- Redis (cache)
- Winston (logging)

## Entrega
- Estrutura de pastas
- Rotas e controllers
- Middleware de autenticação
- Modelo de dados
- Exemplo de uso