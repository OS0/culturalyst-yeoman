/**
 * UserReward model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var UserReward = require('../../sqldb').UserReward;
var UserRewardEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UserRewardEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  UserReward.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    UserRewardEvents.emit(event + ':' + doc._id, doc);
    UserRewardEvents.emit(event, doc);
    done(null);
  }
}

module.exports = UserRewardEvents;
