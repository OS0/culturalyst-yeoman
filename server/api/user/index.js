'use strict';

import express from 'express';
import controller from './user.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.put('/:id/updateUserInfo', auth.isAuthenticated(), controller.updateUserInfo);
router.get('/discovery/:medium/:submedium', controller.showResults);
router.get('/artist/:id', controller.show);
// set this up just like you did for the user info
// router.put('/:id/updateArtist', auth.isAuthenticated(), controller.updateArtistInfo);

module.exports = router;
