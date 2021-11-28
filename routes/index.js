var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*router.get('/productlist', function(req, res, next) {
  res.render('productlist', { title: 'productlist' });
});*/

router.get('/productedit', function(req, res, next) {
  res.render('productedit', { title: 'productedit' });
});
router.get('/productdetail', function(req, res, next) {
  res.render('productdetail', { title: 'productdetail' });
});

router.get('/productcart', function(req, res, next) {
  res.render('productcart', { title: 'productcart' });
});

router.get('/productpayment', function(req, res, next) {
  res.render('productpayment', { title: 'productpayment' });
});

module.exports = router;
