/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var User = sqldb.User;

User.sync()
  .then(function() {
    return User.destroy({where: {}});
  })
  .then(function() {
    return User.bulkCreate([{
        provider: 'local',
        name: 'Test User',
        email: 'test@example.com',
        password: 'test',
        profilePicture: null
      }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin',
        profilePicture: null
      }/*, {
       provider: 'local',
       role: 'catalyst',
       name: 'Catalyst',
       email: 'catalyst@example.com',
       password: 'catalyst',
       profilePicture: null
       }, {
       provider: 'local',
       role: 'creative',
       name: 'Creative',
       email: 'creative@example.com',
       password: 'creative',
       profilePicture: null
       }*/])
      .then(function() {
        console.log('finished populating users');
      });
  });
