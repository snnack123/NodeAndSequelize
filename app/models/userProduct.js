module.exports = (sequelize, DataTypes) => {
    const UserProduct = sequelize.define('UserProduct', {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        }
      }
    }, {});
    return UserProduct;
  };