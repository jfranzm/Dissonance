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
router.put('/:id/friend', usersCtrl.friendUser);
router.put('/:id/unfriend', usersCtrl.unfriendUser);
module.exports = router
