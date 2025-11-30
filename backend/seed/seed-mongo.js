require('dotenv').config();
const mongoose = require('mongoose');
const { connectMongo } = require('../src/db/mongo');
const Category = require('../src/models/category.model');
const Product = require('../src/models/product.model');

async function run() {
  try {
    await connectMongo();

    console.log('🧹 Borrando datos anteriores...');
    await Category.deleteMany({});
    await Product.deleteMany({});

    console.log('📂 Creando categorías...');
    const categories = await Category.insertMany([
      { name: 'Electrónica' },
      { name: 'Hogar' },
      { name: 'Ropa' },
    ]);

    const [electronica, hogar, ropa] = categories;

    console.log('🛒 Creando productos...');
    await Product.insertMany([
      {
        name: 'Audífonos Bluetooth',
        description: 'Audífonos inalámbricos con buena calidad de sonido.',
        price: 25.5,
        stock: 10,
        imageUrl: '',
        category: electronica._id,
      },
      {
        name: 'TV 32 pulgadas',
        description: 'Televisor HD para tu sala.',
        price: 199.99,
        stock: 5,
        imageUrl: '',
        category: electronica._id,
      },
      {
        name: 'Almohada ortopédica',
        description: 'Para un descanso más cómodo.',
        price: 15.0,
        stock: 20,
        imageUrl: '',
        category: hogar._id,
      },
      {
        name: 'Camiseta básica',
        description: 'Camiseta de algodón, talla M.',
        price: 9.99,
        stock: 30,
        imageUrl: '',
        category: ropa._id,
      },
    ]);

    console.log('✅ Datos de prueba insertados correctamente.');
  } catch (err) {
    console.error('❌ Error en el seed:', err);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Conexión cerrada.');
    process.exit(0);
  }
}

run();
