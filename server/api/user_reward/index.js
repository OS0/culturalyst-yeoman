'use strict';

var express = require('express');
var controller = require('./user_reward.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/addUserReward/:user_id', controller.addUserReward);

module.exports = router;
