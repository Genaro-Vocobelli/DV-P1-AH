import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { chefsService } from '../services/chefsService';
import './NuevaReceta.css';

function NuevoChef() {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    especialidad: '',
    experiencia: '',
    foto: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validaciones
    if (!formData.nombre || !formData.descripcion || !formData.foto) {
      setError('Los campos nombre, descripción y foto son obligatorios');
      setLoading(false);
      return;
    }

    try {
      await chefsService.create(formData);
      navigate('/mis-chefs');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear el chef');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nueva-receta-container">
      <div className="form-container">
        <h1>Nuevo Chef</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre del chef *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Gordon Ramsay"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción *</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe al chef..."
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="especialidad">Especialidad</label>
            <input
              type="text"
              id="especialidad"
              name="especialidad"
              value={formData.especialidad}
              onChange={handleChange}
              placeholder="Ej: Cocina italiana"
            />
          </div>

          <div className="form-group">
            <label htmlFor="experiencia">Experiencia</label>
            <input
              type="text"
              id="experiencia"
              name="experiencia"
              value={formData.experiencia}
              onChange={handleChange}
              placeholder="Ej: 20 años"
            />
          </div>

          <div className="form-group">
            <label htmlFor="foto">URL de la foto *</label>
            <input
              type="url"
              id="foto"
              name="foto"
              value={formData.foto}
              onChange={handleChange}
              placeholder="https://ejemplo.com/foto-chef.jpg"
              required
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate('/mis-chefs')}
              className="btn-secondary"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Creando...' : 'Crear Chef'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NuevoChef;