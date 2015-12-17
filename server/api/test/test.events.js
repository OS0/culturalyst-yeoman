/**
 * Test model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Test = require('../../sqldb').Test;
var TestEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TestEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Test.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TestEvents.emit(event + ':' + doc._id, doc);
    TestEvents.emit(event, doc);
    done(null);
  }
}

module.exports = TestEvents;
