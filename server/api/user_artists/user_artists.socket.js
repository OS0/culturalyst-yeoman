/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var UserArtistsEvents = require('./user_artists.events');

// Model events to emit
var events = ['save', 'remove'];

exports.register = function(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener('userArtists:' + event, socket);

    UserArtistsEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
};


function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    UserArtistsEvents.removeListener(event, listener);
  };
}
