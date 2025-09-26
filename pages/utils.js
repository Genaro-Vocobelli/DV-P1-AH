export function createPage(titulo, contenido) {
    let html = ""
    html += '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<title>' + titulo + '</title>'
    html += '<link rel="stylesheet" href="/css/style.css">'
    html += '</head><body>'


    html += '<div class="menu">'
    html += '<a href="/recetas">Inicio</a>  '
    html += '<a href="/recetas/nuevo">Nueva receta</a>'
    html += '<a href="/chefs">Chefs</a>  '
    html += '<a href="/chefs/nuevo">Nuevo chef</a>'
    html += '</div>'

    html += '<div class="busqueda">'
    html += '<form action="/recetas/buscar" method="get">'
    html += '<input type="text" name="search" placeholder="Buscar recetas..."/>'
    html += '<input type="submit" value="Buscar"/>'
    html += '</form>'
    html += '</div>'


    html += '<div class="categorias">'
    html += '<strong>Categorías:</strong> '
    html += '<a href="/recetas">Todas</a>'
    html += '<a href="/recetas/categoria/entradas">Entrada</a>'
    html += '<a href="/recetas/categoria/plato principal">Plato Principal</a>'
    html += '<a href="/recetas/categoria/postres">Postres</a>'
    html += '<a href="/recetas/categoria/vegano">Vegano</a>'
    html += '<a href="/recetas/categoria/bebidas">Bebidas</a>'
    html += '</div>'
    html += `<h1>${titulo}</h1>`
    html += contenido
    html += "</body></html>"

    return html
}