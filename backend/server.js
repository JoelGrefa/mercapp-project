require('dotenv').config(); // 👈 Carga las variables del .env

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const { sequelize } = require('./src/models');
const productRoutes = require('./src/routes/product.routes');
const categoryRoutes = require('./src/routes/category.routes');

const app = express();

// Usar PORT desde entorno (Railway) o 4000 en local
const PORT = process.env.PORT || 4000;

// Puedes usar FRONTEND_URL para CORS (lo configuramos en Railway luego)
const FRONTEND_URL = process.env.FRONTEND_URL || '*';

// Middlewares globales
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));
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
      console.log(`🟢 Servidor MercApp API escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
}

start();
