'use strict';
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
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
    Category.associate = function (models) {
    // associations can be defined here
    };
    return Category;
};
