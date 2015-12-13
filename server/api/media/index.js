'use strict';

var express = require('express');
var controller = require('./media.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:medium/:submedium', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/medium', controller.show);
router.get('/submedium', controller.show)

module.exports = router;
