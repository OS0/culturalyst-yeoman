/**
 * Reward model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Reward = require('../../sqldb').Reward;
var RewardEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RewardEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Reward.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    RewardEvents.emit(event + ':' + doc._id, doc);
    RewardEvents.emit(event, doc);
    done(null);
  }
}

module.exports = RewardEvents;
