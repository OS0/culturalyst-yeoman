'use strict';

var express = require('express');
var controller = require('./reward.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/myRewards/:user_id', controller.showRewards);
router.post('/newReward/:user_id', auth.isAuthenticated(), controller.newReward);
router.get('/:user_id/showMyRewards', auth.isAuthenticated(), controller.showMyRewards);

module.exports = router;
