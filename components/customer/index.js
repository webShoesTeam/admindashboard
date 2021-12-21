const express = require('express');
const router = express.Router();
const customerController = require('./customerController');

router.get('/', customerController.list);
router.get('/:page', customerController.list)
// router.get('/edit/:id', customerController.edit)

module.exports = router;