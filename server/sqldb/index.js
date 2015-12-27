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
db.UserRewards = db.sequelize.import('../api/user_rewards/user_rewards.model');
db.ArtistMedia = db.sequelize.import('../api/artist_media/artist_media.model');
db.UserArtists = db.sequelize.import('../api/user_artists/user_artists.model');
db.Submedia = db.sequelize.import('../api/submedia/submedia.model');
db.Content = db.sequelize.import('../api/content/content.model');
db.Reward = db.sequelize.import('../api/reward/reward.model');
db.User = db.sequelize.import('../api/user/user.model');
db.Media = db.sequelize.import('../api/media/media.model');

module.exports = db;
