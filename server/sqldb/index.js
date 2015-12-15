/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize: Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Artist = db.sequelize.import('../api/artist/artist.model');
db.Reward = db.sequelize.import('../api/reward/reward.model');
db.User = db.sequelize.import('../api/user/user.model');
db.Media = db.sequelize.import('../api/media/media.model');

db.Artist.belongsTo(db.User, { as: 'Artist'});
db.Media.belongsTo(db.User, { as: 'Medium' });
db.Reward.belongsTo(db.User, { as: 'Reward' });

module.exports = db;
