const express = require('express');
const router = express.Router();
const billController = require('./billController');



router.get('/', billController.getAllBill);
router.get('/detail/:id', billController.getBillWithIdBill);
router.get('/history', billController.getBillWithUserId);

router.get('/remove/:id', billController.removeBill);


module.exports = router;

