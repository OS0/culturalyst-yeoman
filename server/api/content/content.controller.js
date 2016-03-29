/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/content              ->  index
 * POST    /api/content              ->  create
 * GET     /api/content/:id          ->  show
 * PUT     /api/content/:id          ->  update
 * DELETE  /api/content/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Content = sqldb.Content;

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

// Gets a list of Contents
exports.index = function(req, res) {
  Content.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Content from the DB
exports.show = function(req, res) {
  var userId = req.params.id;
  console.log(userId);
  Content.find({
    where: {
      user_id:userId
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Content in the DB
exports.create = function(req, res) {
  console.log('Were inside create...')
  var id = req.params.id;
  var date = new Date();
  var n = date.toDateString();
  var time = date.toLocaleTimeString();
  // console.log(req.body);
  Content.create({
    name: req.body.name,
    user_id: id,
    url:req.body.url,
    info: req.body.info,
    type: req.body.type,
    timestamp: n + ' ' + time,
  })
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Content in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Content.find({
    where: {
      _id: req.params.id
    }
  })
    .then(saveUpdates(req.body))
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Content from the DB
exports.destroy = function(req, res) {
  Content.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

exports.showResults = function(req, res, next) {
  var artist_id = req.params.user_id;

  Content.findAll({
      where: {
        user_id: artist_id,
        type: "post"
      }
    })
    .then(function(content) {
      console.log("Post Results");
      if (!content) {
        console.log('No content');
        res.status(444).end();
      }
      var time = content.timestamp;
      console.log(content);
      console.log(time);
      res.json(content);
    })
    .catch(function(err) {
      next(err);
    });
};

exports.showUploadResults = function(req, res, next) {
  var artist_id = req.params.user_id;

  Content.findAll({
      where: {
        user_id: artist_id,
        type:"cover"
      }
    })
    .then(function(content) {
      console.log("Upload Results");
      if (!content) {
        console.log('No content');
        return res.status(444).end();
      }
      res.json(content);
    })
    .catch(function(err) {
      return next(err);
    });
};



exports.showCovers = function(req, res, next) {
  var artist_id = req.params.user_id;

  Content.findAll({
      where: {
        user_id: artist_id,
        type:"cover"
      }
    })
    .then(function(content) {
      console.log("AHHHHHHHHHHHHHHH");
      if (!content) {
        console.log('No content');
        return res.status(444).end();
      }
      res.json(content);
    })
    .catch(function(err) {
      return next(err);
    });
};
