const mongoose = require('mongoose');

async function connectMongo() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('❌ La variable de entorno MONGODB_URI no está definida');
  }

  mongoose.set('strictQuery', false);

  await mongoose.connect(uri);
  console.log('🗄️ Conectado correctamente a MongoDB Atlas');
}

module.exports = { connectMongo };
