const express = require('express');
const router = express.Router();
const productListController = require('./productListController');
// const Product = require("../../models/productModel");

router.get('/', productListController.list);
router.get('/:id', productListController.delete);


router.post('/add', productListController.add);

module.exports = router;