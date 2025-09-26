import * as services from "../../services/recetas.service.js"



export function getRecetas(req, res) {
    services.getRecetas(req.query)
        .then(recetas => res.status(200).json(recetas))
}

export function getRecetaById(req, res) {
    const id = req.params.id
    services.getRecetaById(id)
        .then(receta => {
            if (receta) {
                res.status(200).json(receta)
            } else {
                res.status(404).json({ message: "Recurso no encontrado" })
            }
        })
}

export function createRecipe(req, res) {
    const receta = {
        name: req.body.name,
        description: req.body.description,
        section: req.body.section,
        link: req.body.link,
        img: req.body.img
    }
    services.guardarReceta(receta)
        .then((nuevoReceta) => res.status(201).json(nuevoReceta))
        .catch(err => res.status(500).json({ message: err }))
}

export function deleteRecipe(req, res) {
    const id = req.params.id
    services.borrarReceta(id)
        .then((idBorrado) => res.status(202).json({ message: `el id:${idBorrado} se elimino correctamente.` }))
        .catch((err) => res.status(500).json({ message: `el id:${id} NO se elimino.` }))
}

export function reemplazarRecipe(req, res) {
    const id = req.params.id
    const receta = {
        id: id,
        name: req.body.name,
        description: req.body.description,
        section: req.body.section,
        link: req.body.link,
        img: req.body.img
    }
    services.editarReceta(receta)
        .then(recetaEditado => res.status(202).json(recetaEditado))
        .catch(err => res.status(500).json({ message: "No se pudo actualizar." }))
}

export function actualizarRecipe(req, res) {
    const id = req.params.id
    const receta = {
        id: id,
        name: req.body.name,
        description: req.body.description,
        section: req.body.section,
        link: req.body.link,
        img: req.body.img
    }
    services.actualizarRecipe(receta)
        .then(recetaEditado => res.status(202).json(recetaEditado))
        .catch(err => res.status(500).json({ message: err }))

}