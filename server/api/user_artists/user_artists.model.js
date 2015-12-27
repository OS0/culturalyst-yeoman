'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserArtists', {
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
    artist_id: {
      type: DataTypes.INTEGER,
      references: 'User',
      referencesKey: '_id'
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  });
};
