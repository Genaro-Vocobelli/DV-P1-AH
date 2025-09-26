import * as services from "../../services/chefs.service.js"

export function getChefs(req, res) {
    services.getChefs(req.query)
        .then(chefs => res.status(200).json(chefs))
        .catch(err => res.status(500).json({ message: "Error al obtener chefs" }))
}

export function getChefById(req, res) {
    const id = req.params.id
    services.getChefById(id)
        .then(chef => {
            if (chef) {
                res.status(200).json(chef)
            } else {
                res.status(404).json({ message: "Chef no encontrado" })
            }
        })
        .catch(err => res.status(500).json({ message: "Error al obtener el chef" }))
}

export function createChef(req, res) {
    const chef = {
        nombre: req.body.nombre,
        foto: req.body.foto,
        descripcion: req.body.descripcion,
        especialidad: req.body.especialidad,
        experiencia: req.body.experiencia
    }
    
    if (!chef.nombre || !chef.foto || !chef.descripcion) {
        return res.status(400).json({ message: "Los campos nombre, foto y descripción son obligatorios" });
    }
    
    services.guardarChef(chef)
        .then((nuevoChef) => res.status(201).json(nuevoChef))
        .catch(err => res.status(500).json({ message: "Error al crear el chef" }))
}

export function deleteChef(req, res) {
    const id = req.params.id
    services.borrarChef(id)
        .then((idBorrado) => res.status(202).json({ message: `El chef con id:${idBorrado} se eliminó correctamente.` }))
        .catch((err) => res.status(500).json({ message: `El chef con id:${id} NO se eliminó.` }))
}

export function reemplazarChef(req, res) {
    const id = req.params.id
    const chef = {
        id: id,
        nombre: req.body.nombre,
        foto: req.body.foto,
        descripcion: req.body.descripcion,
        especialidad: req.body.especialidad,
        experiencia: req.body.experiencia
    }
    
    if (!chef.nombre || !chef.foto || !chef.descripcion) {
        return res.status(400).json({ message: "Los campos nombre, foto y descripción son obligatorios" });
    }
    
    services.editarChef(chef)
        .then(chefEditado => res.status(202).json(chefEditado))
        .catch(err => res.status(500).json({ message: "No se pudo actualizar el chef." }))
}

export function actualizarChef(req, res) {
    const id = req.params.id
    const chef = { id: id }
    
    if (req.body.nombre !== undefined) chef.nombre = req.body.nombre;
    if (req.body.foto !== undefined) chef.foto = req.body.foto;
    if (req.body.descripcion !== undefined) chef.descripcion = req.body.descripcion;
    if (req.body.especialidad !== undefined) chef.especialidad = req.body.especialidad;
    if (req.body.experiencia !== undefined) chef.experiencia = req.body.experiencia;
    
    services.actualizarChef(chef)
        .then(chefEditado => res.status(202).json(chefEditado))
        .catch(err => res.status(500).json({ message: "Error al actualizar el chef" }))
}

export function getRecetasByChef(req, res) {
    const chefId = req.params.id
    services.getRecetasByChefId(chefId)
        .then(recetas => {
            res.status(200).json({
                chefId: chefId,
                totalRecetas: recetas.length,
                recetas: recetas
            })
        })
        .catch(err => res.status(500).json({ message: "Error al obtener las recetas del chef" }))
}