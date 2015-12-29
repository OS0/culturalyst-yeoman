/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/user_rewards              ->  index
 * POST    /api/user_rewards              ->  create
 * GET     /api/user_rewards/:id          ->  show
 * PUT     /api/user_rewards/:id          ->  update
 * DELETE  /api/user_rewards/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var UserRewards = sqldb.UserRewards;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of UserRewardss
exports.index = function(req, res) {
  UserRewards.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single UserRewards from the DB
exports.show = function(req, res) {
  UserRewards.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new UserRewards in the DB
exports.create = function(req, res) {
  UserRewards.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

exports.addUserReward = function(req, res) {
  var reward = req.body;
  UserRewards.create({
    user_id: req.params.user_id,
    reward_id: reward._id,
    amount: reward.amount
  })
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing UserRewards in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  UserRewards.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a UserRewards from the DB
exports.destroy = function(req, res) {
  UserRewards.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
