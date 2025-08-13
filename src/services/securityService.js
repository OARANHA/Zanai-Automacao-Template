const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const securityConfig = require('../config/security');

class SecurityService {
  generateToken(payload) {
    return jwt.sign(payload, securityConfig.jwt.secret, {
      expiresIn: securityConfig.jwt.expiresIn
    });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, securityConfig.jwt.secret);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  encrypt(data) {
    const cipher = crypto.createCipher(
      securityConfig.encryption.algorithm,
      securityConfig.encryption.key
    );
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decrypt(encryptedData) {
    try {
      const decipher = crypto.createDecipher(
        securityConfig.encryption.algorithm,
        securityConfig.encryption.key
      );
      let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (error) {
      throw new Error('Falha na descriptografia');
    }
  }
}

module.exports = new SecurityService();