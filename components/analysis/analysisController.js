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
    // console.log("month: " + month);
    // console.log("max day: " + maxDay);
    const orders = await analysisService.findBillsOneMonth(maxDay, month, year);

    var x = Array.from(Array(maxDay), _ => Array(5).fill(0));
    for (let i=0; i<x.length; i++) {
        x[i][0] = i + 1;
    }
  
    for (let i=0; i<orders.length; i++) {
        const total = orders[i].total;
        const date = orders[i].createdAt;
        const day = orders[i].day;
        x[day-1][4] += total;
       
        orders[i].products.forEach(element => {
            if (element.item.category == "Men") {
                x[day-1][1] += element.totalMoney;
            } else if (element.item.category == "Women") {
                x[day-1][2] += element.totalMoney;
            } else if (element.item.category == "Children") {
                x[day-1][3] += element.totalMoney;
            }

        });
        // console.log(i + ". " + date);
        // console.log("total: " + total);
        // console.log("day: " + day)
        // console.log("\n\n");
    }

    // console.log(x);

    res.render('analysis/test', {
        titleChart: JSON.stringify("Total sale in days for one month"),
        dataArray: JSON.stringify(x),
    })
    
}

exports.getTotalOrderIn12Month = async (req, res) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const orders = await analysisService.findBillsOneYear(year);

    var x = Array.from(Array(12), _ => Array(5).fill(0));
    for (let i=0; i<x.length; i++) {
        x[i][0] = i + 1;
    }
  
    for (let i=0; i<orders.length; i++) {
        const total = orders[i].total;
        const date = orders[i].createdAt;
        // const day = orders[i].day;
        const month = orders[i].month;
        x[month-1][4] += total;
       
        orders[i].products.forEach(element => {
            if (element.item.category == "Men") {
                x[month-1][1] += element.totalMoney;
            } else if (element.item.category == "Women") {
                x[month-1][2] += element.totalMoney;
            } else if (element.item.category == "Children") {
                x[month-1][3] += element.totalMoney;
            }

        });
        // console.log(i + ". " + date);
        // console.log("total: " + total);
        // console.log("day: " + day)
        // console.log("\n\n");
    }

    // console.log(x);

    res.render('analysis/test', {
        titleChart: JSON.stringify("Total sale in months for one year"),
        dataArray: JSON.stringify(x),
    })
    
}

exports.getTotalOrderIn4Year = async (req, res) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const years = [year-3, year-2, year-1, year];
    const orders = await analysisService.findBillsAllYear();

    var x = Array.from(Array(4), _ => Array(5).fill(0));
    for (let i=0; i<x.length; i++) {
        x[i][0] = years[i].toString();
    }
  

    for (let i=0; i<orders.length; i++) {
        const total = orders[i].total;
        const date = orders[i].createdAt;
        // const day = orders[i].day;
        const y = orders[i].year;
        var index;
        for (var j=0;j<years.length;j++) {
            if (years[j]==y) {
                index=j;
                break;
            }
        }
        x[index][4] += total;
        console.log("index: " + index);
        orders[i].products.forEach(element => {
            if (element.item.category == "Men") {
                x[index][1] += element.totalMoney;
            } else if (element.item.category == "Women") {
                x[index][2] += element.totalMoney;
            } else if (element.item.category == "Children") {
                x[index][3] += element.totalMoney;
            }

        });

    }

    console.log(JSON.stringify(x));

    res.render('analysis/curveChart', {
        titleChart: JSON.stringify("Total sale in 4 closest years"),
        dataArray: JSON.stringify(x),
    })
    
}

exports.getTotalOrderInSeason = async (req, res) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    
    const orders = await analysisService.findBillsAllYear();

    var x = Array.from(Array(4), _ => Array(5).fill(0));
    x[0][0] = "I";
    x[1][0] = "II";
    x[2][0] = "III";
    x[3][0] = "IV";

    for (let i=0; i<orders.length; i++) {
        const total = orders[i].total;
        const date = orders[i].createdAt;
        // const day = orders[i].day;
        const y = orders[i].year;
        var index;
        if (orders.month <4) index=0;
        else if (orders.month <7) index=1;
        else if (orders.month <10) index=2;
        else index=3;
        x[index][4] += total;
        console.log("index: " + index);
        orders[i].products.forEach(element => {
            if (element.item.category == "Men") {
                x[index][1] += element.totalMoney;
            } else if (element.item.category == "Women") {
                x[index][2] += element.totalMoney;
            } else if (element.item.category == "Children") {
                x[index][3] += element.totalMoney;
            }

        });

    }

    console.log(JSON.stringify(x));

    res.render('analysis/curveChart', {
        titleChart: JSON.stringify("Total sale in 4 seasons"),
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