'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserRewards', {
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
    reward_id: {
      type: DataTypes.INTEGER,
      references: 'Reward',
      referencesKey: '_id'
    },
    amount: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  });
};
