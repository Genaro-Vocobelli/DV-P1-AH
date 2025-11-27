import api from './api';

export const comentariosService = {
  // Obtener comentarios de una receta
  getByReceta: async (recetaId) => {
    const response = await api.get(`/comentarios/receta/${recetaId}`);
    return response.data;
  },

  // Crear comentario (requiere auth)
  create: async (comentarioData) => {
    const response = await api.post('/comentarios', comentarioData);
    return response.data;
  },

  // Editar comentario (requiere auth)
  update: async (id, texto) => {
    const response = await api.patch(`/comentarios/${id}`, { texto });
    return response.data;
  },

  // Eliminar comentario (requiere auth)
  delete: async (id) => {
    const response = await api.delete(`/comentarios/${id}`);
    return response.data;
  }
};