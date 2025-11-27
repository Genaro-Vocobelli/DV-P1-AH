import jwt from 'jsonwebtoken';

// Clave secreta 
const SECRET_KEY = 'mejor_cocinero';

/**
 * Genera un token JWT para un usuario
 * @param {Object} payload - Datos del usuario (id, email)
 * @returns {string} Token JWT
 */
export function generarToken(payload) {
  return jwt.sign(
    payload,
    SECRET_KEY,
    { expiresIn: '24h' } // Token expira en 24 horas
  );
}

/**
 * Verifica y decodifica un token JWT
 * @param {string} token - Token a verificar
 * @returns {Object} Datos decodificados del token
 */
export function verificarToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
}