'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserReward', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: 'Users',
      referencesKey: '_id'
    },
    reward_id: {
      type: DataTypes.INTEGER,
      references: 'Rewards',
      referencesKey: '_id'
    },
    amount: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  });
};