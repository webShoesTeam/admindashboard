const express = require('express');
const router = express.Router();
const analysisController = require('./analysisController');



router.get('/', analysisController.getTotalOrderInOneMonth);

router.get('/test', analysisController.test);
module.exports = router;

