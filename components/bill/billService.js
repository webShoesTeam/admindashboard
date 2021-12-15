const Bill = require('../../models/billModel')

exports.getAllBill = async () => {
    const bills = await Bill.find().sort({createdAt: -1});
    return bills;
}

exports.createNewBill = async (billData) => {
    const newBill = new Bill(billData);
    
    await newBill.save();
    return newBill;
}

exports.getBillWithIdBill = async (billId) => {
    const bill = await Bill.findOne({_id: billId});
    return bill;
}

exports.getBillWithUserId = async (userId) => {
    const bills = await Bill.find({userId: userId}).sort({createdAt: -1});
    return bills;
}

exports.removeBillWithId = async (billId) => {
    await Bill.findByIdAndDelete({_id: billId});
    return
}