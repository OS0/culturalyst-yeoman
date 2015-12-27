/**
 * UserArtists model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var UserArtists = require('../../sqldb').UserArtists;
var UserArtistsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UserArtistsEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  UserArtists.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    UserArtistsEvents.emit(event + ':' + doc._id, doc);
    UserArtistsEvents.emit(event, doc);
    done(null);
  }
}

module.exports = UserArtistsEvents;
