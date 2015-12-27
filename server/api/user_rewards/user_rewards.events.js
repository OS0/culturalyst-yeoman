/**
 * UserRewards model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var UserRewards = require('../../sqldb').UserRewards;
var UserRewardsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UserRewardsEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  UserRewards.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    UserRewardsEvents.emit(event + ':' + doc._id, doc);
    UserRewardsEvents.emit(event, doc);
    done(null);
  }
}

module.exports = UserRewardsEvents;
