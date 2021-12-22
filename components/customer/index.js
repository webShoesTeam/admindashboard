const express = require('express');
const router = express.Router();
const customerController = require('./customerController');

router.get('/', customerController.list);
router.get('/:page', customerController.list)
router.get('/isbanned/:id', customerController.isBanned)

module.exports = router;