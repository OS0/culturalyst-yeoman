/**
 * Submedia model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Submedia = require('../../sqldb').Submedia;
var SubmediaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SubmediaEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Submedia.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    SubmediaEvents.emit(event + ':' + doc._id, doc);
    SubmediaEvents.emit(event, doc);
    done(null);
  }
}

module.exports = SubmediaEvents;
