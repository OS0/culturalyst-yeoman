'use strict';

var express = require('express');
var controller = require('./content.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/:id', controller.create);
router.get('/:user_id/getContent', controller.showResults);
// router.get('/:user_id/getAllContent', controller.showAllResults);
module.exports = router;
