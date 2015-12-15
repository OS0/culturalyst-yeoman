'use strict';

var express = require('express');
var controller = require('./artist.controller');

var router = express.Router();

router.get('/artist', controller.index);
router.get('/artist/:id', controller.show);
router.post('/artist', controller.create);
router.put('/artist/:id', controller.update);
router.patch('/artist/:id', controller.update);
router.delete('/artist/:id', controller.destroy);

module.exports = router;
