const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/users'

// GET /api/users 
router.get('/', ensureLoggedIn, usersCtrl.index);
// GET /api/users/available
router.get('/available', ensureLoggedIn, usersCtrl.available);
// GET /api/users/:id
router.get('/:id', ensureLoggedIn, usersCtrl.detail);
// PUT /api/users/:id/setActiveConvo
router.put('/:id/setActiveConvo', ensureLoggedIn, usersCtrl.setActiveConvo);
// POST /api/users (create a user - sign up)
router.post('/', usersCtrl.create);
// POST /api/users/login
router.post('/login', usersCtrl.login);

module.exports = router;