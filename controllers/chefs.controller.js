import * as service from "../services/chefs.service.js";
import * as views from "../views/chefs.views.js";

export function getChefs(req, res) {
  service.getChefs().then((chefs) => {
    res.send(views.createChefsListPage(chefs));
  });
}

export function getChefById(req, res) {
  const id = req.params.id;
  service.getChefById(id).then((chef) => {
    if (chef) {
      res.send(views.createChefDetailPage(chef));
    } else {
      res.send(views.errorChefPage());
    }
  });
}

export function formularioNuevoChef(req, res) {
  res.send(views.formularioNuevoChef())
}

export function guardarChef(req, res) {
  const chef = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    especialidad: req.body.especialidad,
    experiencia: req.body.experiencia,
    foto: req.body.foto
  }
  service.guardarChef(chef)
    .then(chefGuardado => res.send(views.createChefDetailPage(chefGuardado)))
}

export function formularioEditarChef(req, res) {
  const id = req.params.id
  service.getChefById(id)
    .then((chef) => res.send(views.formularioEditarChef(chef)))
}

export function editarChef(req, res) {
  const id = req.params.id
  const chef = {
    id: id,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    especialidad: req.body.especialidad,
    experiencia: req.body.experiencia,
    foto: req.body.foto
  }
  service.editarChef(chef)
    .then(chefEditado => res.send(views.createChefDetailPage(chefEditado)))
}

export function formularioBorrarChef(req, res) {
  const id = req.params.id
  service.getChefById(id)
    .then((chef) => res.send(views.formularioBorrarChef(chef)))
}

export function borrarChef(req, res) {
  const id = req.params.id
  service.borrarChef(id)
    .then((id) => res.send(views.borrarChefExito(id)))
}