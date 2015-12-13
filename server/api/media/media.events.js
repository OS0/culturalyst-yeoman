/**
 * Media model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Media = require('../../sqldb').Media;
var MediaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MediaEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Media.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    MediaEvents.emit(event + ':' + doc._id, doc);
    MediaEvents.emit(event, doc);
    done(null);
  }
}

module.exports = MediaEvents;
