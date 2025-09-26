
import express from "express"
import * as controllers from "../controllers/chefs.api.controllers.js"

const router = express.Router()

router.get("/", controllers.getChefs)
router.get("/:id", controllers.getChefById)
router.post("/", controllers.createChef)
router.delete("/:id", controllers.deleteChef)
router.put("/:id", controllers.reemplazarChef)
router.patch("/:id", controllers.actualizarChef)
router.get("/:id/recetas", controllers.getRecetasByChef)

export default router