'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Media', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    medium: {
      type: DataTypes.STRING,
      allowNull: false
    },
    submedium: {
      DataTypes.STRING,
      defaultValue: 'other'
    },
    active: DataTypes.BOOLEAN
  });
};
