const express = require('express');
const router = express.Router();
const productListController = require('./productListController');

router.get('/', productListController.list);

module.exports = router;