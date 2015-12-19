'use strict';
var CLIENT_ID = 'CLIENT ID';
var API_KEY = 'YOUR SECRET API KEY (Test or Live)';

var TOKEN_URI = 'https://connect.stripe.com/oauth/token';
var AUTHORIZE_URI = 'https://connect.stripe.com/oauth/authorize';

var qs = require('querystring');
// var request = require('request');
var express = require('express');


module.exports = function(app){


var app = express();

app.get('/authorize', function(req, res) {
  // Redirect to Stripe /oauth/authorize endpoint
  res.redirect(AUTHORIZE_URI + '?' + qs.stringify({
    response_type: 'code',
    scope: 'read_write',
    client_id: CLIENT_ID
  }));
});

app.get('/oauth/callback', function(req, res) {

  var code = req.query.code;

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

    var accessToken = JSON.parse(body).access_token;

    // Do something with your accessToken

    // For demo's sake, output in response:
    res.send({ 'Your Token': accessToken });

  });
});
}
