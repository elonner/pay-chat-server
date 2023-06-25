const express = require('express');
const router = express.Router();
const conversationsCtrl = require('../../controllers/api/conversations');

// GET /api/conversations
router.get('/', conversationsCtrl.index);
// POST /api/conversations
router.post('/', conversationsCtrl.create);
// GET /api/conversations/:id
router.get('/:id', conversationsCtrl.detail);
// PUT /api/conversations/:id
router.put('/:id', conversationsCtrl.update);

module.exports = router;