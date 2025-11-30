const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const { sequelize } = require('./src/models');
const productRoutes = require('./src/routes/product.routes');
const categoryRoutes = require('./src/routes/category.routes');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Carpeta para imágenes de productos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas de la API
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'MercApp API funcionando correctamente' });
});

// Iniciar servidor solo si la BD conecta
async function start() {
  try {
    await sequelize.authenticate();
    console.log('🗄️ Conexión a la base de datos establecida correctamente.');

    app.listen(PORT, () => {
      console.log(`🟢 Servidor MercApp API en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
}

start();
