const billService = require('../bill/billService');
const productListService = require('../product/productService');

const Bill = require('../../models/billModel');


exports.findBillsOneMonth = async (maxDay, month, year) => {
    console.log(new Date(year, month, 1))
    console.log(new Date(year, month, maxDay))

    // const orders = await Bill.find({createdAt: {
    //     $gte: new Date(year, month, 1), 
    //     $lt: Date(year, month, maxDay)
    // }});

    const orders = await Bill.aggregate([
        {$addFields: {  
            "day" : {$dayOfMonth: '$createdAt'},
            "year": { $year: "$createdAt" },
            "month": { $month: "$createdAt" },
            }
        },
        {$match: { month: month, year: year}}
    ]);

    // righted:
    // const orders2  = await Bill.aggregate([
    //     {$addFields: {  "day" : {$dayOfMonth: '$createdAt'}}},
    //     {$match: { day: 15}}
    // ]);

    for (let i=0; i<orders.length; i++) {
        console.log("order2" + i + "\n\n")
        console.log(JSON.stringify(orders[i]));
        
    }
    
    return orders;


}

exports.findBillsOneYear = async (year) => {

    const orders = await Bill.aggregate([
        {$addFields: {  
            "day" : {$dayOfMonth: '$createdAt'},
            "year": { $year: "$createdAt" },
            "month": { $month: "$createdAt" },
            }
        },
        {$match: { year: year}}
    ]);
    
    return orders;
}

exports.findBillsAllYear = async () => {

    const orders = await Bill.aggregate([
        {$addFields: {  
            "day" : {$dayOfMonth: '$createdAt'},
            "year": { $year: "$createdAt" },
            "month": { $month: "$createdAt" },
            }
        },
        
    ]);
    
    return orders;
}



