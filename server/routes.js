/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

module.exports = function(app) {

  // Insert routes below
  app.use('/api/user_rewards', require('./api/user_rewards'));
  app.use('/api/artist_media', require('./api/artist_media'));
  app.use('/api/user_artists', require('./api/user_artists'));
  app.use('/api/submedia', require('./api/submedia'));
  app.use('/api/content', require('./api/content'));
  app.use('/api/rewards', require('./api/reward'));
  app.use('/api/media', require('./api/media'));
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
