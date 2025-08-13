# Contributing to Kilo Template

We welcome contributions from the community! This document provides guidelines for contributing to the Kilo Template project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation Guidelines](#documentation-guidelines)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)
- [Community](#community)

---

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) in all interactions with the project.

---

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm 8.0 or higher
- Git
- Docker (recommended for running services)

### Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/kilo-template.git
   cd kilo-template
   ```

2. **Set up upstream**
   ```bash
   git remote add upstream https://github.com/kilo-template/kilo-template.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Initialize the environment**
   ```bash
   npm run init
   ```

6. **Run tests**
   ```bash
   npm test
   ```

---

## Development Workflow

### 1. Create a Feature Branch

```bash
# Create and switch to a feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes

- Follow the [Coding Standards](#coding-standards)
- Write tests for new functionality
- Update documentation as needed
- Ensure all tests pass

### 3. Commit Your Changes

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```bash
# feat: Add new functionality
git commit -m "feat: add user authentication service"

# fix: Fix a bug
git commit -m "fix: resolve database connection timeout issue"

# docs: Update documentation
git commit -m "docs: add API endpoint documentation"

# style: Format code
git commit -m "style: format code with Prettier"

# refactor: Refactor code
git commit -m "refactor: optimize search performance"

# test: Add tests
git commit -m "test: add unit tests for cache service"
```

### 4. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create pull request on GitHub
```

---

## Pull Request Process

### PR Requirements

- **Title**: Clear and descriptive
- **Description**: Explain what the PR does and why
- **Related Issues**: Link to any related issues
- **Testing**: Describe how you tested the changes
- **Breaking Changes**: Note any breaking changes

### PR Checklist

- [ ] Code follows the project's coding standards
- [ ] Tests pass locally and in CI
- [ ] Documentation is updated if needed
- [ ] CHANGELOG.md is updated for significant changes
- [ ] Issue templates are used if applicable
- [ ] All checks pass (linting, tests, security)

### PR Review Process

1. **Automated Checks**: CI/CD pipeline runs
2. **Code Review**: At least one maintainer reviews
3. **Discussion**: Address feedback and make changes
4. **Approval**: Get approval from at least one maintainer
5. **Merge**: Maintainer merges the PR

---

## Coding Standards

### JavaScript/Node.js

- Use ES6+ features
- Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use meaningful variable and function names
- Write JSDoc comments for public APIs
- Use const/let appropriately (prefer const)

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

## Testing Guidelines

### Test Structure

- Unit tests in `tests/unit/`
- Integration tests in `tests/integration/`
- Test files should mirror the source structure

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

#### Test Requirements

- Test both success and error cases
- Mock external dependencies
- Use clear and descriptive test names
- Follow AAA (Arrange, Act, Assert) pattern

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

---

## Documentation Guidelines

### Documentation Types

1. **Code Documentation**: JSDoc comments for functions and classes
2. **README**: Main project documentation
3. **API Documentation**: Endpoint descriptions and examples
4. **Developer Guide**: Setup and development instructions
5. **Changelog**: Version history and changes

### Documentation Standards

- Keep documentation up-to-date with code changes
- Use clear and concise language
- Include examples for complex concepts
- Follow consistent formatting
- Link to related documentation

### README Updates

When adding new features:
- Update the main features list
- Add new commands to the usage section
- Update installation instructions if needed
- Add troubleshooting information for new features

### API Documentation

Use the OpenAPI/Swagger format for API documentation:

```yaml
# Example API endpoint documentation
/semantic-search/search:
  post:
    summary: Perform semantic search
    description: Search the codebase using vector embeddings
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              query:
                type: string
                description: Search query
              options:
                type: object
                properties:
                  limit:
                    type: number
                    default: 8
    responses:
      '200':
        description: Successful search
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                result:
                  type: array
                  items:
                    $ref: '#/components/schemas/SearchResult'
```

---

## Issue Reporting

### Bug Reports

When reporting bugs, please include:

1. **Environment**
   - Node.js version
   - Operating system
   - Browser (if applicable)

2. **Steps to Reproduce**
   - Clear step-by-step instructions
   - Relevant code snippets
   - Expected vs actual behavior

3. **Additional Information**
   - Error messages
   - Stack traces
   - Screenshots (if helpful)

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md) on GitHub.

### Feature Requests

For feature requests:

1. **Use Case**: Describe the problem you're trying to solve
2. **Proposed Solution**: Explain your proposed solution
3. **Alternatives**: Mention any alternatives you've considered
4. **Additional Context**: Provide any relevant information

Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md) on GitHub.

---

## Feature Requests

### Requesting Features

1. **Search Existing Issues**: Check if the feature already exists
2. **Use the Template**: Fill out the feature request template
3. **Be Specific**: Provide clear details about the feature
4. **Explain the Value**: Explain how the feature would benefit users

### Evaluating Features

Features are evaluated based on:

- Alignment with project goals
- Number of users who would benefit
- Implementation complexity
- Maintenance overhead
- Community interest

---

## Community

### Getting Help

- **GitHub Discussions**: For general questions and discussions
- **GitHub Issues**: For bug reports and feature requests
- **Discord**: Join our community server for real-time chat
- **Email**: For private matters (contact@kilo-template.com)

### Communication Channels

- **GitHub**: For code contributions and issues
- **Discord**: For community discussions and support
- **Twitter**: For announcements and updates
- **Blog**: For in-depth articles and tutorials

### Events

- **Weekly Community Call**: Every Thursday at 15:00 UTC
- **Office Hours**: Tuesdays and Thursdays from 10:00-12:00 UTC
- **Hackathons**: Quarterly events with prizes and recognition

---

## Recognition

### Contributors

We recognize all contributors in:
- The README.md file
- The contributors list on GitHub
- Monthly community spotlights

### Maintainers

Current maintainers:
- [@maintainer1](https://github.com/maintainer1)
- [@maintainer2](https://github.com/maintainer2)

### Becoming a Maintainer

To become a maintainer:
- Make consistent high-quality contributions
- Show deep knowledge of the project
- Help review pull requests
- Participate in community discussions
- Be nominated by existing maintainers

---

## License

By contributing to Kilo Template, you agree that your contributions will be licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Questions?

If you have questions about contributing:
- Check the existing documentation
- Search GitHub issues and discussions
- Ask in our Discord community
- Open a discussion on GitHub

Happy contributing! 🎉