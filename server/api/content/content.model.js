'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Content', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    url: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    type: DataTypes.STRING,
    timestamp: DataTypes.STRING,
  });
};
