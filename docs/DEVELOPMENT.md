# Kilo Template - Development Guide

This guide provides comprehensive information for developers working with the Kilo Template.

## Table of Contents

- [Project Structure](#project-structure)
- [Development Environment Setup](#development-environment-setup)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Building and Deployment](#building-and-deployment)
- [Debugging](#debugging)
- [Extending the Template](#extending-the-template)
- [Performance Optimization](#performance-optimization)

---

## Project Structure

```
kilo-template/
├── .killo-workspace/          # Killo agent configuration
│   ├── agent/                 # AI agent configuration
│   │   ├── agent.yaml         # Main agent configuration
│   │   ├── actions/           # Custom actions
│   │   └── prompts/          # AI prompts
│   ├── scripts/               # Initialization scripts
│   │   ├── kilo-init.sh      # Environment initialization
│   │   ├── kilo-bootstrap.sh  # Project bootstrapping
│   │   └── kilo-recover.sh   # Failure recovery
│   ├── templates/             # Project templates
│   │   ├── nextjs-dashboard/
│   │   ├── node-api/
│   │   ├── react-admin/
│   │   └── universal-starter/
│   ├── vs-code/               # VS Code configuration
│   │   ├── settings.json      # VS Code settings
│   │   ├── extensions.json   # Recommended extensions
│   │   ├── tasks.json         # VS Code tasks
│   │   └── launch.json        # Debug configurations
│   └── health-check/          # Health monitoring
│       ├── project-scanner.js
│       ├── dependency-validator.js
│       └── failure-recovery.js
├── scripts/                   # Utility scripts
│   ├── kindex-fast.sh         # Fast file indexing
│   ├── ksearch.sh            # Semantic search
│   ├── kread.sh              # Safe file reading
│   ├── index_simple_fast.mjs  # Indexing module
│   └── search_repo.mjs       # Search module
├── src/                       # Application source code
│   ├── app.js                # Main application entry point
│   ├── config/               # Configuration modules
│   │   ├── cache.js          # Cache configuration
│   │   ├── database.js       # Database configuration
│   │   ├── security.js       # Security configuration
│   │   ├── logging.js        # Logging configuration
│   │   └── semanticSearch.js # Semantic search configuration
│   ├── services/             # Business logic services
│   │   ├── cacheService.js   # Cache service
│   │   ├── databaseService.js # Database service
│   │   ├── securityService.js # Security service
│   │   └── semanticSearchService.js # Semantic search service
│   └── utils/                # Utility functions
│       ├── errorHandler.js   # Error handling
│       └── validators.js     # Data validation
├── tests/                     # Test files
│   ├── integration/          # Integration tests
│   └── unit/                 # Unit tests
├── docs/                      # Documentation
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── kilo.config.js           # Kilo configuration
├── LICENSE                   # License file
├── package.json             # Project dependencies
└── README.md                # Main documentation
```

---

## Development Environment Setup

### Prerequisites

- Node.js 18.0 or higher
- npm 8.0 or higher
- Git
- Docker (recommended for services)

### Initial Setup

1. **Clone the repository**
```bash
git clone https://github.com/OARANHA/kilo-template.git
cd kilo-template
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Initialize the environment**
```bash
npm run init
```

5. **Start development server**
```bash
npm run dev
```

### VS Code Integration

1. Install recommended extensions:
   - ESLint
   - Prettier
   - Docker
   - Tailwind CSS
   - Python (for health checks)

2. Open the workspace in VS Code:
```bash
code .
```

3. Use the Kilo commands:
   - `Ctrl+Shift+P` → `Kilo: Bootstrap Project`
   - `Ctrl+Shift+P` → `Kilo: Health Check`
   - `Ctrl+Shift+P` → `Kilo: Recover Failure`

---

## Code Standards

### JavaScript/Node.js Standards

- Use ES6+ features
- Follow Airbnb JavaScript Style Guide
- Use const/let appropriately (prefer const)
- Use meaningful variable and function names
- Write JSDoc comments for public APIs

### Example Code Structure

```javascript
/**
 * Authenticates a user with the provided credentials
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {Promise<Object>} Authentication result
 */
async function authenticateUser(username, password) {
  const user = await databaseService.findUser(username);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  const isValidPassword = await securityService.verifyPassword(
    password, 
    user.password
  );
  
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }
  
  const token = securityService.generateToken(user);
  
  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    },
    token
  };
}
```

### Error Handling

Use the centralized error handler:

```javascript
const ErrorHandler = require('./utils/errorHandler');

// In route handlers
try {
  const result = await someOperation();
  res.json(result);
} catch (error) {
  ErrorHandler.handle(error, req, res);
}
```

### Logging

Use the structured logger:

```javascript
const logger = require('kilocode').logger;

logger.info('User logged in', { userId: 123 });
logger.error('Database connection failed', { error: error.message });
logger.debug('Processing request', { method: req.method, url: req.url });
```

---

## Testing

### Test Structure

```
tests/
├── unit/                    # Unit tests
│   ├── services/
│   └── utils/
└── integration/             # Integration tests
    ├── semanticSearch.test.js
    └── api.test.js
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --testPathPattern=semanticSearch

# Watch mode for development
npm run test:watch
```

### Writing Tests

#### Unit Test Example

```javascript
// tests/unit/services/cacheService.test.js
const CacheService = require('../../../src/services/cacheService');

describe('CacheService', () => {
  let cacheService;
  
  beforeEach(() => {
    cacheService = new CacheService();
  });
  
  describe('get', () => {
    it('should return cached value', async () => {
      await cacheService.set('test-key', 'test-value');
      const result = await cacheService.get('test-key');
      expect(result).toBe('test-value');
    });
    
    it('should return null for non-existent key', async () => {
      const result = await cacheService.get('non-existent-key');
      expect(result).toBeNull();
    });
  });
});
```

#### Integration Test Example

```javascript
// tests/integration/semanticSearch.test.js
const request = require('supertest');
const app = require('../../../src/app');

describe('Semantic Search Integration', () => {
  beforeAll(async () => {
    // Setup test data
    await request(app)
      .post('/semantic-search/index')
      .send({ root: './test-data' });
  });
  
  describe('POST /semantic-search/search', () => {
    it('should return search results', async () => {
      const response = await request(app)
        .post('/semantic-search/search')
        .send({ 
          query: 'user authentication',
          options: { limit: 5 }
        });
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.result)).toBe(true);
    });
  });
});
```

---

## Building and Deployment

### Building for Production

```bash
# Install production dependencies
npm install --production

# Build the application
npm run build

# Start production server
npm start
```

### Environment Configuration

| Environment Variable | Description | Default Value |
|----------------------|-------------|---------------|
| `NODE_ENV` | Node environment | `development` |
| `PORT` | Application port | `3000` |
| `KILO_ENV` | Kilo environment | `development` |
| `QDRANT_URL` | Qdrant service URL | `http://localhost:6333` |
| `OLLAMA_URL` | Ollama service URL | `http://localhost:11434` |

### Docker Deployment

#### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - QDRANT_URL=http://qdrant:6333
      - OLLAMA_URL=http://ollama:11434
    depends_on:
      - qdrant
      - ollama
  
  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"
    volumes:
      - qdrant_data:/qdrant/storage
  
  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama

volumes:
  qdrant_data:
  ollama_data:
```

---

## Debugging

### Common Debug Scenarios

#### Debugging Semantic Search Issues

1. Check Qdrant connection:
```bash
curl http://localhost:6333/
```

2. Verify Ollama models:
```bash
curl http://localhost:11434/api/tags
```

3. Check indexing status:
```bash
curl http://localhost:3000/semantic-search/status
```

#### Debugging Performance Issues

1. Enable verbose logging:
```javascript
logger.level = 'debug';
```

2. Monitor memory usage:
```bash
# Node.js memory monitoring
node --inspect src/app.js
```

3. Check database queries:
```javascript
// Enable query logging in database service
databaseService.options.logging = true;
```

### Debug Tools

- Chrome DevTools for API debugging
- VS Code debugger for Node.js
- Docker logs for container services
- Application logs for business logic

---

## Extending the Template

### Adding New Services

1. Create service file in `src/services/`
2. Add configuration in `src/config/`
3. Register service in `src/app.js`
4. Add tests in `tests/unit/`

### Adding New Templates

1. Create template directory in `.killo-workspace/templates/`
2. Add template configuration to `.killo-workspace/scripts/kilo-bootstrap.sh`
3. Create template files following the project structure
4. Add template documentation

### Customizing the Agent

Edit `.killo-workspace/agent/agent.yaml` to:
- Change agent persona
- Add custom commands
- Configure integrations
- Modify prompts

---

## Performance Optimization

### Caching Strategy

- Use Redis for application-level caching
- Implement HTTP caching headers
- Cache database queries
- Cache search results

### Database Optimization

- Add appropriate indexes
- Use connection pooling
- Implement query optimization
- Monitor slow queries

### Search Optimization

- Optimize chunk sizes
- Use appropriate embedding models
- Implement pagination
- Cache frequent searches

### Memory Management

- Monitor memory usage
- Implement proper cleanup
- Use streaming for large files
- Optimize garbage collection

---

## Best Practices

### Code Organization

- Keep modules focused and single-purpose
- Use dependency injection
- Implement proper error boundaries
- Follow SOLID principles

### Security

- Validate all inputs
- Use parameterized queries
- Implement rate limiting
- Keep dependencies updated

### Monitoring

- Implement comprehensive logging
- Set up health checks
- Monitor application metrics
- Set up alerts

### Documentation

- Document all public APIs
- Keep README updated
- Add inline comments for complex logic
- Maintain changelog

---

## Troubleshooting

### Common Issues

#### Service Connection Problems
- Check service URLs in `.env`
- Verify service containers are running
- Check network connectivity

#### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are installed
- Clear node_modules and reinstall

#### Performance Issues
- Check resource usage
- Monitor database queries
- Review caching configuration

### Getting Help

- Check the main README.md
- Review API documentation
- Check GitHub issues
- Join the Discord community