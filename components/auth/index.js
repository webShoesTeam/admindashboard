const express = require('express');
const router = express.Router();
const authController = require('./authController');
const passport = require('../../passport')

router.get('/login', authController.login);
router.post('/login',  passport.authenticate('local', { successRedirect: '/',
failureRedirect: '/login?wrong-password'}));

router.get('/logout', authController.logout);

router.get('/register', authController.registerpage);
router.post('/register', authController.register);


module.exports = router;