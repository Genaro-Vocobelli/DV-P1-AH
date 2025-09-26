import express from "express"
import * as controller from '../controllers/chefs.controller.js'

const route = express.Router()

route.get("/chefs", controller.getChefs)
route.get("/chefs/nuevo", controller.formularioNuevoChef)
route.post("/chefs/nuevo", controller.guardarChef)
route.get("/chefs/editar/:id", controller.formularioEditarChef)
route.post("/chefs/editar/:id", controller.editarChef)
route.get("/chefs/borrar/:id", controller.formularioBorrarChef)
route.post("/chefs/borrar/:id", controller.borrarChef)
route.get("/chefs/:id", controller.getChefById)

export default route