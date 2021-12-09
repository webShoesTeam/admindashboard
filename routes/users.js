var express = require('express');
var router = express.Router();

const userController = require("../components/user/userController")
const authGuard = require('../middlewares/loggedInUserGuard');
/* GET users listing. */






router.get('/profile', authGuard.hasLogin, userController.getProfile);


router.post('/update_avt/:id', authGuard.hasLogin, userController.updateImage);

router.post('/save/:id', authGuard.hasLogin, userController.saveUpdate);



module.exports = router;
