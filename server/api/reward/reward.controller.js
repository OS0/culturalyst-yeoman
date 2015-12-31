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
import stripe from '../../config/stripe'

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
  "SELECT r._id, r.title, r.amount, r.user_id, r.type, r.description, u.picUrl, u.name FROM  UserRewards as ur INNER JOIN  Rewards as r ON ur.reward_id=r._id INNER JOIN Users as u ON r.user_id=u._id WHERE ur.user_id=" + req.params.user_id,
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
  exports.createPlan(req,res);
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
    .then(function(res){
      exports.deletePlan(res)
      removeEntity(res)
    })
    .catch(handleError(res));
};

//Creates a stripe subscription plan for artist based on reward
exports.createPlan = function(req,res){
  console.log('creating plan!')
  var reward = req.body
  var plan = 'user' + reward.user_id + 'plan' + reward.amount
  stripe.plans.create({
    amount: reward.amount * 100,
    interval: 'month',
    name: 'reward.title',
    currency: 'usd',
    id: plan,
    statement_descriptor: 'Culturalyst Artist Support'
  }).then(function(plan){
    console.log('plan: ', plan)
    res.status(204).end();
  }).catch(handleError(res))
}

//Deletes a stripe subscription plan when artist deletes a reward
exports.deletePlan = function(reward){
  var plan = 'user' + reward.user_id + 'plan' + reward.amount
  stripe.plans.del(plan).then(function(confirmation){
    console.log('confirmation: ', confirmation);
  }).catch(function(err){
    console.log('err: ', err);
  })
}
