var express = require('express');
var router = express.Router();

const loggedInUserGuard = require('../middlewares/loggedInUserGuard');

router.get('/', loggedInUserGuard.hasLogin, function(req, res, next) {
  res.render('index');
});

module.exports = router;
