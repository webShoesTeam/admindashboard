const express = require('express');
const router = express.Router();
const adminController = require('./adminController');

router.get('/', adminController.list);
router.get('/:page', adminController.list)
router.get('/isbanned/:id', adminController.isBanned)

module.exports = router;