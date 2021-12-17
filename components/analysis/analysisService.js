const billService = require('../bill/billService');
const productListService = require('../productList/productListService');

const Bill = require('../../models/billModel');


exports.findBillsOneMonth = async (maxDay, month, year) => {
    console.log(new Date(year, month, 1))
    console.log(new Date(year, month, maxDay))

    // const orders = await Bill.find({createdAt: {
    //     $gte: new Date(year, month, 1), 
    //     $lt: Date(year, month, maxDay)
    // }});

    const orders = await Bill.aggregate([
        {$addFields: {  "day" : {$dayOfMonth: '$createdAt'}}},
        {$match: { dayOfMonth: 15}}
    ]);


    const orders2  = await Bill.aggregate([
        {$addFields: {  "day" : {$dayOfMonth: '$createdAt'}}},
        {$match: { day: 15}}
    ]);
    for (let i=0; i<orders2.length; i++) {
        console.log("order2" + i + "\n\n")
        console.log(JSON.stringify(orders2[i]));
        
    }
    
    return orders;


}



