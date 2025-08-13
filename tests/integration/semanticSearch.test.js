const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('Semantic Search Scripts', () => {
  const testFile = path.join(__dirname, '../test-file.md');
  
  beforeAll(() => {
    fs.writeFileSync(testFile, '# Test\nEste é um arquivo de teste para busca semântica.');
  });

  afterAll(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  test('kindex deve executar sem erros', () => {
    expect(() => {
      execSync('npm run kindex .', { stdio: 'pipe', timeout: 30000 });
    }).not.toThrow();
  });

  test('ksearch deve executar sem erros', () => {
    expect(() => {
      execSync('npm run ksearch "teste"', { stdio: 'pipe', timeout: 10000 });
    }).not.toThrow();
  });

  test('kread deve executar sem erros', () => {
    expect(() => {
      execSync(`npm run kread "${testFile}"`, { stdio: 'pipe', timeout: 5000 });
    }).not.toThrow();
  });
});