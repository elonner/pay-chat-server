const express = require('express');
const router = express.Router();
const conversationsCtrl = require('../../controllers/api/conversations');

// GET /api/conversations
router.get('/', itemsCtrl.index);
// POST /api/conversations
router.post('/', itemsCtrl.create);
// GET /api/conversations/:id
router.get('/:id', itemsCtrl.detail);
// PUT /api/conversations/:id
router.put('/:id', itemsCtrl.update);

module.exports = router;