const express = require('express');
const router = express.Router();
const productListController = require('./productListController');

router.get('/', productListController.list);
// router.get('/:page', productListController.list)

router.get('/delete/:id', productListController.delete);
router.post('/add', productListController.add);

router.get('/edit/:id', productListController.edit);
router.post('/update/:id', productListController.update);

router.get('/productadd',productListController.productAdd);
router.get('/productdetail',productListController.productDetail);
router.get('/productcart',productListController.productCart);
router.get('/productpayment',productListController.productPayment);

module.exports = router;