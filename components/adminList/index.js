const express = require('express');
const router = express.Router();
const adminListController = require('./adminListController');

router.get('/', adminListController.list);
router.get('/:page', adminListController.list)


module.exports = router;