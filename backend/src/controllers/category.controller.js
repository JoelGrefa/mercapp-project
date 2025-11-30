const { Category } = require('../models');

async function getCategories(req, res) {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = {
  getCategories,
};
