/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/artist_media              ->  index
 * POST    /api/artist_media              ->  create
 * GET     /api/artist_media/:id          ->  show
 * PUT     /api/artist_media/:id          ->  update
 * DELETE  /api/artist_media/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var ArtistMedia = sqldb.ArtistMedia;

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

// Gets a list of ArtistMedias
exports.index = function(req, res) {
  ArtistMedia.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single ArtistMedia from the DB
exports.show = function(req, res) {
  ArtistMedia.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new ArtistMedia in the DB
exports.create = function(req, res) {
  ArtistMedia.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing ArtistMedia in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  ArtistMedia.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a ArtistMedia from the DB
exports.destroy = function(req, res) {
  ArtistMedia.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
