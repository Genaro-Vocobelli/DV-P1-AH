import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://admin:admin@hibridas.rovg5xk.mongodb.net/AH20232CP1?retryWrites=true&w=majority");

const db = client.db("AH20232CP1")

/**
 * Obtener todos los comentarios de una receta
 */
export async function getComentariosByReceta(recetaId) {
  await client.connect();
  return db.collection("comentarios").aggregate([
    {
      $match: { 
        recetaId: new ObjectId(recetaId),
        eliminado: { $ne: true }
      }
    },
    {
      $lookup: {
        from: "usuarios",
        localField: "userId",
        foreignField: "_id",
        as: "usuario"
      }
    },
    {
      $unwind: "$usuario"
    },
    {
      $project: {
        texto: 1,
        recetaId: 1,
        createdAt: 1,
        "usuario.username": 1,
        "usuario._id": 1
      }
    },
    {
      $sort: { createdAt: -1 }
    }
  ]).toArray();
}

/**
 * Obtener comentario por ID
 */
export async function getComentarioById(id) {
  await client.connect();
  return db.collection("comentarios").findOne({ _id: new ObjectId(id) });
}

/**
 * Crear nuevo comentario
 */
export async function crearComentario(comentario) {
  await client.connect();
  
  const nuevoComentario = {
    texto: comentario.texto,
    recetaId: new ObjectId(comentario.recetaId),
    userId: new ObjectId(comentario.userId),
    createdAt: new Date(),
    eliminado: false
  };
  
  const resultado = await db.collection("comentarios").insertOne(nuevoComentario);
  return await getComentarioById(resultado.insertedId);
}

/**
 * Editar comentario
 */
export async function editarComentario(id, texto) {
  await client.connect();
  
  await db.collection("comentarios").updateOne(
    { _id: new ObjectId(id) },
    { $set: { texto: texto } }
  );
  
  return await getComentarioById(id);
}

/**
 * Eliminar comentario (soft delete)
 */
export async function borrarComentario(id) {
  await client.connect();
  await db.collection("comentarios").updateOne(
    { _id: new ObjectId(id) },
    { $set: { eliminado: true } }
  );
  return id;
}

/**
 * Verificar si el comentario pertenece al usuario
 */
export async function esComentarioDelUsuario(comentarioId, userId) {
  await client.connect();
  const comentario = await db.collection("comentarios").findOne({ 
    _id: new ObjectId(comentarioId),
    userId: new ObjectId(userId)
  });
  return comentario !== null;
}