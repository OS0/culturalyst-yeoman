/**
 * ArtistMedia model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var ArtistMedia = require('../../sqldb').ArtistMedia;
var ArtistMediaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ArtistMediaEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ArtistMedia.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ArtistMediaEvents.emit(event + ':' + doc._id, doc);
    ArtistMediaEvents.emit(event, doc);
    done(null);
  }
}

module.exports = ArtistMediaEvents;
