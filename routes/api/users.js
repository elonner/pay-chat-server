const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// All paths start with '/api/users'

// GET /api/users 
router.get('/', ensureLoggedIn, usersCtrl.index);
// GET /api/users/:id
router.get('/:id', ensureLoggedIn, usersCtrl.detail);
// PUT /api/users/:id/:conversation
router.put('/:id', ensureLoggedIn, usersCtrl.update);
// POST /api/users (create a user - sign up)
router.post('/', usersCtrl.create);
// POST /api/users/login
router.post('/login', usersCtrl.login);

module.exports = router;