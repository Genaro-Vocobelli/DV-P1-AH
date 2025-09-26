import express from "express"
import * as controllers from "../controllers/recetas.api.controllers.js"

const router = express.Router()

router.get("/", controllers.getRecetas)           
router.get("/:id", controllers.getRecetaById)
router.post("/", controllers.createRecipe)
router.delete("/:id", controllers.deleteRecipe)
router.put("/:id", controllers.reemplazarRecipe)
router.patch("/:id", controllers.actualizarRecipe)

export default router