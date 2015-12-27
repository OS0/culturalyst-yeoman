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
router.get('/discovery/:medium/:submedium', controller.showResults);
router.get('/artist/:id', controller.show);
router.put('/:id/updateUserInfo', auth.isAuthenticated(), controller.updateUserInfo);
router.put('/:id/updateArtistInfo', auth.isAuthenticated(), controller.updateArtistInfo);
router.put('/:id/updateArtistContent', auth.isAuthenticated(), controller.updateArtistContent);
router.put('/:id/updateArtistCover', auth.isAuthenticated(), controller.updateArtistCover);

module.exports = router;
