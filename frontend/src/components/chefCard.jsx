import { Link } from 'react-router-dom';
import './ChefCard.css';

function ChefCard({ chef, esPropio = false, onEliminar }) {
  return (
    <div className="chef-card">
      <div className="chef-image">
        <img src={chef.foto} alt={chef.nombre} />
      </div>
      
      <div className="chef-content">
        <h3>{chef.nombre}</h3>
        <p className="chef-description">{chef.descripcion}</p>
        
        {chef.especialidad && (
          <p className="chef-info">
            <strong>Especialidad:</strong> {chef.especialidad}
          </p>
        )}
        
        {chef.experiencia && (
          <p className="chef-info">
            <strong>Experiencia:</strong> {chef.experiencia}
          </p>
        )}

        <div className="chef-actions">
          <Link to={`/chef/${chef._id}`} className="btn-ver">
            Ver Perfil
          </Link>
          
          {esPropio && (
            <>
              <Link to={`/editar-chef/${chef._id}`} className="btn-editar">
                Editar
              </Link>
              <button 
                onClick={() => onEliminar(chef._id)} 
                className="btn-eliminar"
              >
                Eliminar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChefCard;