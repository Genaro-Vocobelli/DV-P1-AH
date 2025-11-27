import express from "express"
import * as controllers from "../controllers/comentarios.api.controllers.js"
import { verificarAutenticacion } from "../../middlewares/auth.middleware.js"

const router = express.Router()

// Ruta pública - Ver comentarios de una receta
router.get("/receta/:recetaId", controllers.getComentariosByReceta)  // GET /api/comentarios/receta/:recetaId

// Rutas protegidas - Crear, editar y eliminar comentarios
router.post("/", verificarAutenticacion, controllers.crearComentario)         // POST /api/comentarios
router.patch("/:id", verificarAutenticacion, controllers.editarComentario)    // PATCH /api/comentarios/:id
router.delete("/:id", verificarAutenticacion, controllers.borrarComentario)   // DELETE /api/comentarios/:id

export default router