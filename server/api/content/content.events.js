/**
 * Content model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Content = require('../../sqldb').Content;
var ContentEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ContentEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Content.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ContentEvents.emit(event + ':' + doc._id, doc);
    ContentEvents.emit(event, doc);
    done(null);
  }
}

module.exports = ContentEvents;
