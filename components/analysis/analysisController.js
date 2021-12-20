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

    var x = Array.from(Array(maxDay), _ => Array(5).fill(0));
    for (let i=0; i<x.length; i++) {
        x[i][0] = i + 1;
    }
  
    for (let i=0; i<orders.length; i++) {
        const total = orders[i].total;
        const date = orders[i].createdAt;
        const day = orders[i].day;
        x[day][4] += total;
       
        orders[i].products.forEach(element => {
            if (element.item.category == "Men") {
                x[day][1] += element.totalMoney;
            } else if (element.item.category == "Women") {
                x[day][2] += element.totalMoney;
            } else if (element.item.category == "Childrent") {
                x[day][3] += element.totalMoney;
            }

        });
        console.log(i + ". " + date);
        console.log("total: " + total);
        console.log("day: " + day)
        console.log("\n\n");
    }

    console.log(x);

    res.render('analysis/test', {
        dataArray: JSON.stringify(x),
    })
    
}

exports.test = (req, res) => {

    const data = [
        [1,  3, 8, 4, 5],
        [2,  3, 5, 4, 5],
        [3,  2,   5, 25, 5],
        [4,  7, 1, 1, 6],
        [5,  1, 6, 10, 1],
        [6,   8, 13.6, 4, 7],
        [7,   6, 12.3, 4, 9],
        [8,  1, 9.2, 10, 3],
         [1,  3, 8, 4, 5],
        [2,  3, 5, 4, 5],
        [3,  2,   5, 25, 5],
        [4,  7, 1, 1, 6],
        [5,  1, 6, 10, 1],
        [6,   8, 13.6, 4, 7],
        [7,   6, 12.3, 4, 9],
        [8,  1, 9.2, 10, 3],
        [9,  1, 2.9, 14, 45],
        [10, 1, 3, 11.6, 34],
        [11,  5.3,  7.9,  4.7, 23],
        [12,  6.6,  8.4,  5.2, 23],
        [13,  4.8,  6.3,  3.6, 12],
        [14,  4.2,  6.2,  3.4, 10],
        [9,  1, 2.9, 14, 45],
        [10, 1, 3, 11.6, 34],
        [11,  5.3,  7.9,  4.7, 23],
        [12,  6.6,  8.4,  5.2, 23],
        [13,  4.8,  6.3,  3.6, 12],
        [14,  4.2,  6.2,  3.4, 10]

    ]
    console.log("\n\ntesst")
    res.render('analysis/test', {
        dataArray: JSON.stringify(data),
    })

}