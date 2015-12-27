'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ArtistMedia', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: 'User',
      referencesKey: '_id'
    },
    submedium_id: {
      type: DataTypes.INTEGER,
      references: 'Submedia',
      referencesKey: '_id'
    },
    active: DataTypes.BOOLEAN
  });
};
