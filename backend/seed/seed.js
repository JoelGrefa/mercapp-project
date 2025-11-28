const { sequelize, Category, Product } = require('../src/models');

async function seed() {
  try {
    console.log('🔄 Sincronizando base de datos...');
    await sequelize.sync({ force: true });

    console.log('🌱 Creando categorías...');
    const categories = await Category.bulkCreate([
      { name: 'Tecnología' },
      { name: 'Hogar' },
      { name: 'Belleza' },
      { name: 'Deportes' },
    ]);

    console.log('🌱 Creando productos...');
    await Product.bulkCreate([
      {
        name: 'Audífonos inalámbricos',
        description: 'Audífonos Bluetooth con cancelación de ruido.',
        price: 49.99,
        imageUrl: '/uploads/audifonos.jpg',
        stock: 15,
        categoryId: categories[0].id,
      },
      {
        name: 'Mouse gamer',
        description: 'Mouse ergonómico con luces RGB.',
        price: 29.9,
        imageUrl: '/uploads/mouse.jpg',
        stock: 20,
        categoryId: categories[0].id,
      },
      {
        name: 'Cafetera eléctrica',
        description: 'Cafetera programable para 12 tazas.',
        price: 59.5,
        imageUrl: '/uploads/cafetera.jpg',
        stock: 10,
        categoryId: categories[1].id,
      },
      {
        name: 'Crema hidratante facial',
        description: 'Crema con ácido hialurónico para uso diario.',
        price: 19.99,
        imageUrl: '/uploads/crema.jpg',
        stock: 25,
        categoryId: categories[2].id,
      },
      {
        name: 'Pelota de fútbol',
        description: 'Balón tamaño 5 para césped natural o sintético.',
        price: 24.5,
        imageUrl: '/uploads/balon.jpg',
        stock: 30,
        categoryId: categories[3].id,
      },
    ]);

    console.log('✅ Seed completado correctamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en el seed:', error);
    process.exit(1);
  }
}

seed();
