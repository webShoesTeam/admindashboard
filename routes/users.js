var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register', {
    title: "Register",
    layout: false
  })
});

// router.get('/login', function(req, res, next) {
//   res.render('login', {
//     title: "Login",
//     layout: false
//   })
// });

router.get('/logout', function(req, res, next) {
  res.render('login', {
    title: "Login",
    layout: false
  })
});

module.exports = router;
