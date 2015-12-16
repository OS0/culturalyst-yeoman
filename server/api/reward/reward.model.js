'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Reward', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  });
};
