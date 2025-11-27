import express from "express"
import * as controllers from "../controllers/chefs.api.controllers.js"
import { verificarAutenticacion } from "../../middlewares/auth.middleware.js"

const router = express.Router()

// Rutas públicas (sin autenticación)
router.get("/", controllers.getChefs)                                         // GET /api/chefs

// ← Rutas específicas ANTES de /:id
router.get("/mis-chefs", verificarAutenticacion, controllers.getMisChefs)    // GET /api/chefs/mis-chefs

// Rutas con parámetros (después de rutas específicas)
router.get("/:id", controllers.getChefById)                                  // GET /api/chefs/:id
router.get("/:id/recetas", controllers.getRecetasByChef)                     // GET /api/chefs/:id/recetas

// Rutas protegidas (requieren autenticación)
router.post("/", verificarAutenticacion, controllers.createChef)             // POST /api/chefs
router.delete("/:id", verificarAutenticacion, controllers.deleteChef)        // DELETE /api/chefs/:id
router.put("/:id", verificarAutenticacion, controllers.reemplazarChef)       // PUT /api/chefs/:id
router.patch("/:id", verificarAutenticacion, controllers.actualizarChef)     // PATCH /api/chefs/:id

export default router