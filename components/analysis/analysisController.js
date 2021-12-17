const analysisService = require('./analysisService');


exports.getTotalOrderInOneMonth = async (req, res) => {
    const currentDate = new Date();
    const maxDayInMonths = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const maxDay = maxDayInMonths[month];
    if ((year % 4 == 0) && ((year % 100 != 0)) || (year % 400 == 0)) {
        maxDayInMonth[2] = 29;
    }
    console.log("month: " + month);
    console.log("max day: " + maxDay);
    const orders = await analysisService.findBillsOneMonth(maxDay, month, year);

    for (let i=0; i<orders.length; i++) {
        console.log(i + "\n\n")
        console.log(JSON.stringify(orders[i]));
        
    }

    
    res.status(201);
}