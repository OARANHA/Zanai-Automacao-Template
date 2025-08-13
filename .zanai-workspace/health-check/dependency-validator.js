#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

class DependencyValidator {
  constructor() {
    this.issues = [];
  }

  async validate() {
    console.log('🔍 Validando dependências...');
    
    try {
      const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
      
      // Verifica dependências principais
      const requiredDeps = ['kilocode', 'express'];
      for (const dep of requiredDeps) {
        if (!packageJson.dependencies[dep]) {
          this.issues.push(`❌ Dependência obrigatória faltando: ${dep}`);
        }
      }
      
      // Verifica devDependencies
      const devDeps = ['nodemon', 'jest'];
      for (const dep of devDeps) {
        if (!packageJson.devDependencies?.[dep]) {
          this.issues.push(`❌ DevDependency recomendada faltando: ${dep}`);
        }
      }
      
      if (this.issues.length === 0) {
        console.log('✅ Todas as dependências estão OK!');
      } else {
        console.log('❌ Problemas nas dependências:');
        this.issues.forEach(issue => console.log(`  ${issue}`));
      }
    } catch (error) {
      console.error('❌ Erro ao validar dependências:', error.message);
    }
  }
}

const validator = new DependencyValidator();
validator.validate().catch(console.error);