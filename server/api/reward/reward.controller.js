/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/rewards              ->  index
 * POST    /api/rewards              ->  create
 * GET     /api/rewards/:id          ->  show
 * PUT     /api/rewards/:id          ->  update
 * DELETE  /api/rewards/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Reward = sqldb.Reward;
var Sequelize = require('sequelize');

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

// Gets a list of Rewards
exports.index = function(req, res) {
  Reward.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Reward from the DB
exports.show = function(req, res) {
  Reward.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

exports.showRewards = function(req, res) {
  Reward.findAll({
    where: {
      user_id: req.params.user_id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

exports.showMyRewards = function(req, res) {
  sqldb.sequelize.query(
    "SELECT * FROM Rewards INNER JOIN (SELECT reward_id from UserRewards WHERE user_id=" + req.params.user_id + ") AS myRewards ON Rewards._id=myRewards.reward_id",
    { type: sqldb.sequelize.QueryTypes.SELECT })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Reward in the DB
exports.create = function(req, res) {
  Reward.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

exports.newReward = function(req, res) {
  req.body.user_id = req.params.user_id;
  console.log(req.body)
  Reward.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Reward in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Reward.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Reward from the DB
exports.destroy = function(req, res) {
  Reward.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
