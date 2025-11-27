import { createPage } from "../pages/utils.js";

export function createChefsListPage(chefs) {
  let html = '<div class="lista-recetas">';

  chefs.forEach((chef) => {
    html += `<div class="receta-item">`;

    if (chef.foto) {
      html += `<div class="receta-imagen">
        <img src="${chef.foto}" alt="${chef.nombre}" />
      </div>`;
    }

    html += `<div class="receta-contenido">`;
    html += `<h3>${chef.nombre}</h3>`;
    html += `<p class="receta-desc">${chef.descripcion}</p>`;
    
    if (chef.especialidad) {
      html += `<p><strong>Especialidad:</strong> ${chef.especialidad}</p>`;
    }
    
    if (chef.experiencia) {
      html += `<p><strong>Experiencia:</strong> ${chef.experiencia}</p>`;
    }

    html += `<div class="acciones">
        <a href="/chefs/${chef._id}" class="btn ver">Ver</a> | 
        <a href="/chefs/editar/${chef._id}" class="btn editar">Editar</a> | 
        <a href="/chefs/borrar/${chef._id}" class="btn borrar">Borrar</a> |
        <a href="/recetas/chef/${chef._id}" class="btn ver">Ver sus recetas</a>
      </div>`;
    html += `</div></div>`;
  });

  html += "</div>";

  return createPage("Nuestros Chefs", html);
}

export function createChefDetailPage(chef) {
  let html = '<div class="detalle-receta">';

  if (chef.foto) {
    html += `<div class="imagen-principal">
      <img src="${chef.foto}" alt="${chef.nombre}" />
      </div>`;
  }

  html += '<ul class="ver-platos">';
  html += `<li><strong>Descripción:</strong> ${chef.descripcion}</li>`;
  
  if (chef.especialidad) {
    html += `<li><strong>Especialidad:</strong> ${chef.especialidad}</li>`;
  }
  
  if (chef.experiencia) {
    html += `<li><strong>Experiencia:</strong> ${chef.experiencia}</li>`;
  }

  html += "</ul>";
  html += '</div>';

  html += `<div class="botones">`;
  html += `<a href="/recetas/chef/${chef._id}" class="btn-juntos color1">Ver sus recetas</a>`;
  html += `<a href="/chefs" class="btn-juntos color2">Volver a chefs</a>`;
  html += `</div>`;

  return createPage(chef.nombre, html);
}

export function errorChefPage() {
  let html = "";
  html += "<h2>No se encontró el chef buscado</h2>";
  html += `<a href="/chefs">Volver</a>`;
  return createPage("404", html);
}

export function formularioNuevoChef() {
  let html = "<form action='/chefs/nuevo' method='post' class='form-receta'>";
  html += '<label>Nombre del chef:</label>'
  html += "<div class='campo'><input type='text' name='nombre' placeholder='Nombre completo' required /></div>";
  html += '<label>Descripción:</label>'
  html += "<div class='campo'><input type='text' name='descripcion' placeholder='Descripción del chef' required/></div>";
  html += '<label>Especialidad:</label>'
  html += "<div class='campo'><input type='text' name='especialidad' placeholder='Especialidad culinaria' /></div>";
  html += '<label>Experiencia:</label>'
  html += "<div class='campo'><input type='text' name='experiencia' placeholder='Años de experiencia' /></div>";
  html += '<label>Foto:</label>'
  html += "<div class='campo'><input type='url' name='foto' placeholder='URL de la foto del chef' required/></div>";
  html += "<div class='acciones-form'><input type='submit' value='Guardar Chef' class='btn-guardar'/></div>";
  html += "</form>"
  html += `<a href="/chefs" class="volver">Volver</a>`;
  return createPage("Nuevo Chef", html);
}

export function formularioEditarChef(chef) {
  let html = `<form action='/chefs/editar/${chef._id}' method='post' class="form-receta">`;
  html += '<label>Nombre del chef:</label>'
  html += `<div class="campo"><input type='text' name='nombre' placeholder='Nombre completo' value="${chef.nombre}" required /></div>`;
  html += '<label>Descripción:</label>'
  html += `<div class="campo"><input type='text' name='descripcion' placeholder='Descripción del chef' value="${chef.descripcion}" required /></div>`;
  html += '<label>Especialidad:</label>'
  html += `<div class="campo"><input type='text' name='especialidad' placeholder='Especialidad culinaria' value="${chef.especialidad}" /></div>`;
  html += '<label>Experiencia:</label>'
  html += `<div class="campo"><input type='text' name='experiencia' placeholder='Años de experiencia' value="${chef.experiencia }" /></div>`;
  html += '<label>Foto:</label>'
  html += `<div class="campo"><input type='url' name='foto' placeholder='URL de la foto del chef' value="${chef.foto}" required /></div>`;
  html += "<div class='acciones-form'><input type='submit' value='Editar Chef' class='btn-guardar'/></div>";
  html += "</form>"
  html += `<a href="/chefs" class="volver">Volver</a>`;
  return createPage("Editar Chef", html);
}

export function formularioBorrarChef(chef) {
  let html = `<form action='/chefs/borrar/${chef._id}' method='post' class="form-receta">`;
  html += `<div class="campo-borrar">${chef.nombre}</div>`;
  html += `<div class="campo-borrar">${chef.descripcion}</div>`;
  
  if (chef.especialidad) {
    html += `<div class="campo-borrar"><strong>Especialidad:</strong> ${chef.especialidad}</div>`;
  }
  
  if (chef.experiencia) {
    html += `<div class="campo-borrar"><strong>Experiencia:</strong> ${chef.experiencia}</div>`;
  }

  if (chef.foto) {
    html += `<div class="receta-imagen">
        <img src="${chef.foto}" alt="${chef.nombre}" />
      </div>`;
  }
  
  html += "<div class='acciones-form'><input type='submit' value='Borrar Chef' class='btn-borrar'/></div>";
  html += "</form>"
  html += `<a href="/chefs" class="volver">Volver</a>`;
  return createPage("Borrar Chef", html);
}

export function borrarChefExito(id) {
  let html = ""
  html += "<p class='confirmacion-borrar'>El chef se borró correctamente</p>"
  html += `<a href="/chefs" class="volver">Volver</a>`;
  return createPage("Chef borrado correctamente", html)
}