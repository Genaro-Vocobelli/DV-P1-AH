import { createPage } from "../pages/utils.js";

export function createRecetasListPage(recetas) {
  let html = '<div class="lista-recetas">';

  recetas.forEach((receta) => {
    html += `<div class="receta-item">`;

    if (receta.img) {
      html += `<div class="receta-imagen">
        <img src="${receta.img}" alt="${receta.name}" />
      </div>`;
    }

    html += `<div class="receta-contenido">`;
    html += `<h3>${receta.name}</h3>`;
    html += `<p class="receta-desc">${receta.description}</p>`;
    html += `<p <strong>Tipo:</strong> ${receta.section}</p>`;


    html += `<div class="acciones">
        <a href="/recetas/${receta._id}" class="btn ver">Ver</a> | 
        <a href="/recetas/editar/${receta._id}" class="btn editar">Editar</a> | 
        <a href="/recetas/borrar/${receta._id}" class="btn borrar">Borrar</a>
      </div>`;
    html += `</div></div>`;
  });

  html += "</div>";

  return createPage("Las mejores recetas del chef", html);
}

export function createDetailPage(receta) {
  let html = '<div class="detalle-receta">';

  if (receta.img) {
    html += `<div class="imagen-principal">
      <img src="${receta.img}" alt="${receta.name}"
      </div>`;
  }


  html += '<ul class="ver-platos">';
  html += `<li <strong>Descripción:</strong> ${receta.description}</li>`;
  html += `<li <strong>Tipo:</strong> ${receta.section}</li>`;

  if (receta.chef) {
    html += `<li><strong>Chef:</strong> ${receta.chef.nombre}</li>`;
  }

  if (receta.link) {
    html += `<li <strong>Video de cocina:</strong> <a href="${receta.link}" target="_blank" class="enlace">Ver en YouTube</a></li>`;
  }

  html += "</ul>";
  html += '</div>';

  html += `<div><a href="/recetas" class="volver">Volver</a></div>`;
  return createPage(receta.name, html);
}

export function errorPage() {
  let html = "";
  html += "<h2>No se encontro la receta buscada</h2>";
  html += `<a href="/recetas">Volver</a>`;
  return createPage("404", html);
}

export function formularioNuevoReceta(chefs = []) {
  let html = "<form action='/recetas/nuevo' method='post' class='form-receta' >";
  html += '<label>Comida:</label>'
  html += "<div class='campo'><input type='text' name='name' placeholder='Comida'required /></div>";
  html += '<label>Descipcion:</label>'
  html += "<div class='campo'><input type='text' name='description' placeholder='Descripcion' required/></div>";
  html += '<label>Tipo de comida:</label>'
  html += "<div class='campo'><input type='text' name='section' placeholder='entradas, postres, bebidas, plato principal, vegano' required/></div>";

  html += '<label>Chef:</label>'
  html += "<div class='campo'><select name='chefId'>";
  html += "<option value=''>Seleccionar chef (opcional)</option>";
  chefs.forEach(chef => {
    html += `<option value='${chef._id}' class='campo'>${chef.nombre}</option>`;
  });
  html += "</select></div>";


  html += '<label>Video Receta:</label>'
  html += "<div class='campo'><input type='url' name='link' placeholder='Link del video de cocina (YouTube)' /></div>";
  html += '<label>Imagen plato:</label>'
  html += "<div class='campo'><input type='url' name='img' placeholder='URL de la imagen del plato'  required/></div>";
  html += "<div class='acciones-form'><input type='submit' value='Guardar' class='btn-guardar'/></div>";
  html += "</form>"
  html += `<a href="/recetas" class="volver">Volver</a>`;
  return createPage("Nueva receta", html);
}

export function formularioEditarReceta(receta, chefs = []) {
  let html = `<form action='/recetas/editar/${receta._id}' method='post'  class="form-receta">`;
  html += '<label>Comida:</label>'
  html += `<div class="campo"><input type='text' name='name' placeholder='Comida' value="${receta.name}" required /></div>`;
  html += '<label>Descipcion:</label>'
  html += `<div class="campo"><input type='text' name='description' placeholder='Descripcion' value="${receta.description}" required /></div>`;
  html += '<label>Tipo de comida:</label>'
  html += `<div class="campo"><input type='text' name='section' placeholder='Que tipo de comida es(postres, entradas... etc)' value="${receta.section}" required /></div>`;
  

  
  html += '<label>Chef:</label>'
  html += "<div class='campo'><select name='chefId'>";
  html += "<option value=''>Seleccionar chef (opcional)</option>";
  chefs.forEach(chef => {
    const selected = receta.chefId && receta.chefId.toString() === chef._id.toString() ? 'selected' : '';
    html += `<option value='${chef._id}' ${selected} class='campo'>${chef.nombre}</option>`;
  });
  html += "</select></div>";





  html += '<label>Video Receta:</label>'
  html += `<div class="campo"><input type='url' name='link' placeholder='Link del video de cocina' value="${receta.link}" /></div>`;
  html += '<label>Imagen plato:</label>'
  html += `<div class="campo"><input type='url' name='img' placeholder='URL de la imagen del plato' value="${receta.img}" /></div>`;
  html += "<div class='acciones-form'><input type='submit' value='Editar' class='btn-guardar'/></div>";
  html += "</form>"
  html += `<a href="/recetas" class="volver">Volver</a>`;
  return createPage("Editar receta", html);
}

export function formularioBorrarReceta(receta) {
  let html = `<form action='/recetas/borrar/${receta._id}' method='post' class="form-receta">`;
  html += `<div class="campo-borrar">${receta.name}</div>`;
  html += `<div class="campo-borrar">${receta.description}</div>`;
  html += `<div class="campo-borrar">${receta.section}</div>`;

  if (receta.link) {
    html += `<li class="campo-borrar" <strong>Video de cocina:</strong> <a href="${receta.link}" target="_blank" class="enlace">Ver en YouTube</a></li>`;
  }

  if (receta.img) {
    html += `<div class="receta-imagen">
        <img src="${receta.img}" alt="${receta.name}" />
      </div>`;
  }
  html += "<div class='acciones-form'><input type='submit' value='Borrar'class='btn-borrar'/></div>";
  html += "</form>"
  html += `<a href="/recetas" class="volver">Volver</a>`;
  return createPage("Borrar receta", html);
}

export function borrarExito(id) {
  let html = ""
  html += "<p class='confirmacion-borrar'>La receta se borro correctamente</p>"
  html += `<a href="/recetas" class="volver">Volver</a>`;
  return createPage("Receta borrada correctamente", html)
}