import api from './api';

export const chefsService = {
  // Obtener todos los chefs
  getAll: async () => {
    const response = await api.get('/chefs');
    return response.data;
  },

  // Obtener chef por ID
  getById: async (id) => {
    const response = await api.get(`/chefs/${id}`);
    return response.data;
  },

  // Obtener MIS chefs (requiere auth)
  getMisChefs: async () => {
    const response = await api.get('/chefs/mis-chefs');
    return response.data;
  },

  // Crear chef (requiere auth)
  create: async (chefData) => {
    const response = await api.post('/chefs', chefData);
    return response.data;
  },

  // Actualizar chef (requiere auth)
  update: async (id, chefData) => {
    const response = await api.put(`/chefs/${id}`, chefData);
    return response.data;
  },

  // Eliminar chef (requiere auth)
  delete: async (id) => {
    const response = await api.delete(`/chefs/${id}`);
    return response.data;
  },

  // Obtener recetas de un chef
  getRecetasByChef: async (id) => {
    const response = await api.get(`/chefs/${id}/recetas`);
    return response.data;
  }
};