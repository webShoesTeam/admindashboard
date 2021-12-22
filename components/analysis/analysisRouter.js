const express = require('express');
const router = express.Router();
const analysisController = require('./analysisController');



router.get('/', analysisController.getTotalOrderInOneMonth);

router.get('/day', analysisController.getTotalOrderInOneMonth);

router.get('/month', analysisController.getTotalOrderIn12Month);

router.get('/year', analysisController.getTotalOrderIn4Year);

router.get('/season', analysisController.getTotalOrderInSeason);

router.get('/test', analysisController.test);
module.exports = router;

