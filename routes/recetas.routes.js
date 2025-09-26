import express from "express"
import * as controller from '../controllers/recetas.controller.js'

const route = express.Router()

route.get("/recetas", controller.getRecetas)
route.get("/recetas/buscar", controller.buscarRecetas)
route.get("/recetas/nuevo", controller.formularioNuevoReceta)
route.post("/recetas/nuevo", controller.guardarReceta)
route.get("/recetas/editar/:id", controller.formularioEditarReceta)
route.post("/recetas/editar/:id", controller.editarReceta)
route.get("/recetas/borrar/:id", controller.formularioBorrarReceta)
route.post("/recetas/borrar/:id", controller.borrarReceta)
route.get("/recetas/:id", controller.getRecetaById)
route.get("/recetas/categoria/:section", controller.getRecetaByCategoria)
route.get("/recetas/chef/:chefId", controller.getRecetaByChef)
route.get("/recetas/:id", controller.getRecetaById)

export default route