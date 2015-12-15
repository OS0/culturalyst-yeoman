/**
 * Artist model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Artist = require('../../sqldb').Artist;
var ArtistEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ArtistEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Artist.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ArtistEvents.emit(event + ':' + doc._id, doc);
    ArtistEvents.emit(event, doc);
    done(null);
  }
}

module.exports = ArtistEvents;
