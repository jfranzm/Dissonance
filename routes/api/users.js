const express = require('express');

const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);
router.get('/check-token', usersCtrl.checkToken);
router.get('/', usersCtrl.userInfo);
router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.put('/:id', usersCtrl.updateUser);
router.delete('/:id', usersCtrl.deleteUser);
router.get('/friends/:userId', usersCtrl.getFriends);
router.put('/:id/follow', usersCtrl.followUser);
router.put('/:id/unfollow', usersCtrl.unfollowUser);

module.exports = router
