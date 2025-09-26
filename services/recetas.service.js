
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://admin:admin@hibridas.rovg5xk.mongodb.net/AH20232CP1?retryWrites=true&w=majority");

const db = client.db("AH20232CP1")

export async function getRecetas(filter = {}) {
  const filterMongo = { eliminado: { $ne: true } };


  if (filter.search != undefined && filter.search.trim() !== '') {
    filterMongo.$or = [
      { name: { $regex: filter.search, $options: 'i' } },
      { description: { $regex: filter.search, $options: 'i' } },
      { section: { $regex: filter.search, $options: 'i' } }
    ];
  }


  if (filter.chefId != undefined) {
    filterMongo.chefId = new ObjectId(filter.chefId);
  }


  if (filter.section != undefined) {
    filterMongo.section = filter.section;
  }

  const pipeline = [
    { $match: filterMongo },
    {
      $lookup: {
        from: "chefs",
        localField: "chefId",
        foreignField: "_id",
        as: "chef"
      }
    },
    {
      $unwind: {
        path: "$chef",
        preserveNullAndEmptyArrays: true
      }
    }
  ];

  await client.connect();
  return db.collection("recetas").find(filterMongo).toArray();
}

export async function getRecetaById(id) {
  await client.connect();

  const pipeline = [
    { $match: { _id: new ObjectId(id) } },
    {
      $lookup: {
        from: "chefs",
        localField: "chefId",
        foreignField: "_id",
        as: "chef"
      }
    },
    {
      $unwind: {
        path: "$chef",
        preserveNullAndEmptyArrays: true
      }
    }
  ];

  const result = await db.collection("recetas").aggregate(pipeline).toArray();
  return result.length > 0 ? result[0] : null;
}

export async function guardarReceta(receta) {
  if (receta.chefId) {
    receta.chefId = new ObjectId(receta.chefId);
  }

  await client.connect();
  const resultado = await db.collection("recetas").insertOne(receta);
  return await getRecetaById(resultado.insertedId);
}

export async function editarReceta(receta) {
  await client.connect();
  const { id, ...recetaData } = receta;

   if (recetaData.chefId) {
    recetaData.chefId = new ObjectId(recetaData.chefId);
  }
  await db.collection("recetas").replaceOne({ _id: new ObjectId(id) }, recetaData);
  return await getRecetaById(id);
}

export async function borrarReceta(id) {
  await client.connect();
  await db.collection("recetas").updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } });
  return id;
}

export async function actualizarRecipe(receta) {
  await client.connect();
  const { id, ...recetaData } = receta;

  if (recetaData.chefId) {
    recetaData.chefId = new ObjectId(recetaData.chefId);
  }
  await db.collection("recetas").updateOne({ _id: new ObjectId(id) }, { $set: recetaData });
  return await getRecetaById(id);

 
}


export async function getProductoById(id) {
  return await getRecetaById(id);
}