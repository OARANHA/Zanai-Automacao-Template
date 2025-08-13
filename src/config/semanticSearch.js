const kiloConfig = require('../../kilo.config');

module.exports = {
  ...kiloConfig.semanticSearch,
  // Configurações adicionais
  ignoreDirs: ['.git', '.github', '.next', 'node_modules', 'dist', 'build'],
  ignorePaths: [],
  goodExtensions: /\.(md|mdx|tsx?|jsx?|mjs|cjs|json|ya?ml|css|scss|less|html|txt|sql|sh|bash|zsh|py|go)$/i
};