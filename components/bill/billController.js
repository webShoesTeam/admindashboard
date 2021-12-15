const billService = require('./billService');


exports.getAllBill = async (req, res) => {
    const bills = await billService.getAllBill();

    res.render('bill/allBill', {
        title: "Order List",
        bills: bills,
    })
}

exports.getBillWithIdBill = async (req, res) => {

    const billId = req.params.id;
    const bill = await billService.getBillWithIdBill(billId);
    console.log("\n\nBill:\n" + JSON.stringify(bill))
    res.render('bill/bill', {
        title: "Bill",
        bill: bill,
    })
}

exports.getBillWithUserId = async (req, res) => {
    
    const bills = await billService.getBillWithUserId(req.user._id);

    res.render('bill/allBill', {
        title: "History Bill",
        bills: bills,
    })
}

exports.removeBill = async (req, res) => {

    const billId = req.params.id;
    console.log("bill id" + billId);
    await billService.removeBillWithId(billId);

    res.redirect('/bill')
}