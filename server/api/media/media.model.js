'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Media', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    medium: {
      type: DataTypes.STRING,
      allowNull: false
    },
    submedium: {
      type: DataTypes.STRING,
      defaultValue: 'other'
    },
    active: DataTypes.BOOLEAN
  });
};
