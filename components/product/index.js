const express = require('express');
const router = express.Router();
const productController = require('./productController');

router.get('/', productController.list);
router.get('/filter', productController.filterGet)
router.post('/filter', productController.filter)

router.get('/delete/:id', productController.delete);

router.get('/pageadd',productController.productAdd);
router.post('/add', productController.add);

router.get('/edit/:id', productController.edit);
router.post('/update/:id', productController.update);

router.get('/detail',productController.productDetail);
router.get('/cart',productController.productCart);
router.get('/payment',productController.productPayment);
router.get('/gallery/:id', productController.getGallery);
router.post('/gallery/:id', productController.postGallery);
router.get('/gallery/remove/:id', productController.postRemoveGallery);

module.exports = router;