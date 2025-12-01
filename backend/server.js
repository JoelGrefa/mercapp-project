require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// 👇 OJO: quitamos Sequelize por ahora
// const { sequelize } = require('./src/models');

const productRoutes = require('./src/routes/product.routes');
const categoryRoutes = require('./src/routes/category.routes');

const app = express();
const PORT = process.env.PORT || 4000;
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

// Iniciar servidor SIN Sequelize
app.listen(PORT, () => {
  console.log(`🟢 Servidor MercApp API escuchando en el puerto ${PORT}`);
});
