import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

const client = new MongoClient("mongodb+srv://admin:admin@hibridas.rovg5xk.mongodb.net/AH20232CP1?retryWrites=true&w=majority");
const db = client.db("AH20232CP1");

/** 
 * Buscar usuario por email
 */
export async function getUserByEmail(email) {
  await client.connect();
  return db.collection("usuarios").findOne({ email: email });
}

/**
 * Buscar usuario por username
 */
export async function getUserByUsername(username) {
  await client.connect();
  return db.collection("usuarios").findOne({ username: username });
}

/**
 * Buscar usuario por ID
 */
export async function getUserById(id) {
  await client.connect();
  return db.collection("usuarios").findOne({ _id: new ObjectId(id) });
}

/**
 * Crear un nuevo usuario
 */
export async function crearUsuario(userData) {
  await client.connect();
  
  // Verificar si el email ya existe
  const emailExiste = await getUserByEmail(userData.email);
  if (emailExiste) {
    throw new Error('El email ya está registrado');
  }
  
  // Verificar si el username ya existe
  const usernameExiste = await getUserByUsername(userData.username);
  if (usernameExiste) {
    throw new Error('El nombre de usuario ya está en uso');
  }
  
  // Encriptar la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  
  // Crear el usuario
  const nuevoUsuario = {
    username: userData.username,
    email: userData.email,
    password: hashedPassword,
    createdAt: new Date()
  };
  
  const resultado = await db.collection("usuarios").insertOne(nuevoUsuario);
  
  // Retornar usuario sin la contraseña
  const usuario = await getUserById(resultado.insertedId);
  delete usuario.password;
  return usuario;
}

/**
 * Verificar credenciales de login
 */
export async function verificarCredenciales(email, password) {
  await client.connect();
  
  const usuario = await getUserByEmail(email);
  
  if (!usuario) {
    throw new Error('Credenciales inválidas');
  }
  
  // Comparar contraseña
  const passwordValido = await bcrypt.compare(password, usuario.password);
  
  if (!passwordValido) {
    throw new Error('Credenciales inválidas');
  }
  
  // Retornar usuario sin la contraseña
  delete usuario.password;
  return usuario;
}

/**
 * Actualizar información del usuario
 */
export async function actualizarUsuario(id, userData) {
  await client.connect();
  
  const updateData = {};
  
  if (userData.username) updateData.username = userData.username;
  if (userData.email) updateData.email = userData.email;
  
  // Si se actualiza la contraseña, encriptarla
  if (userData.password) {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(userData.password, salt);
  }
  
  await db.collection("usuarios").updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );
  
  const usuario = await getUserById(id);
  delete usuario.password;
  return usuario;
}