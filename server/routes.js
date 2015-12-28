/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import db from './sqldb'
import auth from './auth/auth.service'

var CLIENT_ID = 'ca_7Yac6i1E5MoE5YvDGx9tNYRrBq1tKddQ';
var API_KEY = 'sk_test_iJGQtNCDSmOSroJKVAlFCdbB';

var TOKEN_URI = 'https://connect.stripe.com/oauth/token';
var AUTHORIZE_URI = 'https://connect.stripe.com/oauth/authorize';

var qs = require('querystring');
var request = require('request');

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
  app.get('/authorize', function(req,res){
    console.log('yay!!!')
    res.redirect(AUTHORIZE_URI + '?' + qs.stringify({
      response_type: 'code',
      scope: 'read_write',
      client_id: CLIENT_ID
    }));
  })

  app.get('/oauth/callback', function(req, res) {

    var code = req.query.code;
    console.log('code: ', code)
    // Make /oauth/token endpoint POST request
    request.post({
      url: TOKEN_URI,
      form: {
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        code: code,
        client_secret: API_KEY
      }
    }, function(err, r, body) {
      if(err){console.log('err: ', err)}
      var accessToken = JSON.parse(body).access_token;
      console.log('access: ', accessToken)
      // Do something with your accessToken

      // For demo's sake, output in response:
      res.send({ 'Your Token': accessToken });

    });
  });
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
