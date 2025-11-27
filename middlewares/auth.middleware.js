import { verificarToken } from '../utils/jwt.js';

/**
 * Middleware para verificar que el usuario esté autenticado
 * Verifica el token JWT en el header Authorization
 */
export function verificarAutenticacion(req, res, next) {
  try {
    // Obtener token del header Authorization: "Bearer TOKEN"
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
      return res.status(401).json({ 
        message: 'Token no proporcionado. Debes iniciar sesión.' 
      });
    }

    // Extraer el token (formato: "Bearer TOKEN")
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        message: 'Formato de token inválido' 
      });
    }

    // Verificar y decodificar el token
    const decoded = verificarToken(token);
    
    // Agregar información del usuario al request
    req.usuario = decoded;
    
    // Continuar con la siguiente función
    next();
    
  } catch (error) {
    return res.status(401).json({ 
      message: 'Token inválido o expirado',
      error: error.message 
    });
  }
}

/**
 * Middleware opcional - verifica token si existe, pero no lo requiere
 */
export function verificarAutenticacionOpcional(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      if (token) {
        const decoded = verificarToken(token);
        req.usuario = decoded;
      }
    }
    
    next();
  } catch (error) {
    // Si el token es inválido, simplemente continúa sin usuario
    next();
  }
}