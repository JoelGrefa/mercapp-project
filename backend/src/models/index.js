const sequelize = require('../db/database');
const Category = require('./category.model');
const Product = require('./product.model');

// Relaciones
Category.hasMany(Product, {
  foreignKey: 'categoryId',
  as: 'products',
});

Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
});

module.exports = {
  sequelize,
  Category,
  Product,
};
