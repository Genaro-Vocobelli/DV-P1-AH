import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { chefsService } from '../services/chefsService';
import ChefCard from '../components/ChefCard';
import './MisChefs.css';

function MisChefs() {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarMisChefs();
  }, []);

  const cargarMisChefs = async () => {
    try {
      setLoading(true);
      const data = await chefsService.getMisChefs();
      setChefs(data);
    } catch (err) {
      setError('Error al cargar tus chefs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este chef?')) {
      return;
    }

    try {
      await chefsService.delete(id);
      setChefs(chefs.filter(c => c._id !== id));
    } catch (err) {
      alert('Error al eliminar el chef');
    }
  };

  if (loading) {
    return <div className="loading">Cargando tus chefs...</div>;
  }

  return (
    <div className="mis-chefs-container">
      <div className="header">
        <h1>Mis Chefs</h1>
        <Link to="/nuevo-chef" className="btn-primary">
          + Nuevo Chef
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {chefs.length === 0 ? (
        <div className="empty-state">
          <h2>Aún no tienes chefs registrados</h2>
          <p>Crea perfiles de chefs para asociarlos con tus recetas</p>
          <Link to="/nuevo-chef" className="btn-primary">
            Crear mi primer chef
          </Link>
        </div>
      ) : (
        <div className="chefs-grid">
          {chefs.map((chef) => (
            <ChefCard 
              key={chef._id} 
              chef={chef}
              esPropio={true}
              onEliminar={handleEliminar}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MisChefs;