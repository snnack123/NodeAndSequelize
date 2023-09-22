'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    categoryId: DataTypes.INTEGER,
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
    },
  }, {});
  Product.associate = function(models) {
    Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
    }); 
  };  
  return Product;
};