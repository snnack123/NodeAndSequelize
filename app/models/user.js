'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW
        }
    }, {});
    User.associate = function (models) {
        User.belongsToMany(models.Product, {
            through: 'UserProduct',
            foreignKey: 'userId',
            otherKey: 'productId'
        });
    };
    return User;
};
