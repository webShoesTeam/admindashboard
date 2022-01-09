var express = require('express');
var router = express.Router();

const loggedInUserGuard = require('../middlewares/loggedInUserGuard');
const analysisController = require('../components/analysis/analysisController');

// router.get('/', loggedInUserGuard.hasLogin, function(req, res, next) {
//   res.render('index');
// });

router.get('/', loggedInUserGuard.hasLogin, analysisController.getTotalOrderInOneMonth);

module.exports = router;
