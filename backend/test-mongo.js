// backend/test-mongo.js
require('dotenv').config();
const mongoose = require('mongoose');

async function main() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ No se encontró MONGODB_URI en el archivo .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ Conectado correctamente a MongoDB Atlas');

    // Opcional: mostrar bases de datos / colecciones
    const admin = mongoose.connection.db.admin();
    const info = await admin.serverStatus();
    console.log('Versión de MongoDB:', info.version);

  } catch (err) {
    console.error('❌ Error al conectar con MongoDB Atlas');
    console.error(err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

main();
