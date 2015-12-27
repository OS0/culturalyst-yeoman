'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Submedia', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    submedium: DataTypes.STRING,
    medium_id: {
      type: DataTypes.INTEGER,
      references: 'Media',
      referencesKey: '_id'
    },
    active: DataTypes.BOOLEAN
  });
};
