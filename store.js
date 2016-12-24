"use strict";

function statement (customer, movies, mode) {
    let customerReport={
        customerName: customer.name,
        totalfrequentRenterPoints: 0,
        totalAmount: 0
    };
    customerReport.movies=[];

    function calculateAmount (rent) {
        let thisAmount=0;
        switch (getMovie (rent.movieID).code) {
            case "regular":
                thisAmount=2;
                if (rent.days>2) {
                    thisAmount+=(rent.days-2)*1.5;
                }
                break;
            case "new":
                thisAmount=rent.days*3;
                break;
            case "childrens":
                thisAmount=1.5;
                if (rent.days>3) {
                    thisAmount+=(rent.days-3)*1.5;
                }
                break;
        }
        return thisAmount;
    }

    for (let rent of customer.rentals) {

        customerReport.totalfrequentRenterPoints++;
        if (isBonus (rent)) totalfrequentRenterPoints++;

        customerReport.movies.push ({
            name: getMovie (rent.movieID).title,
            amount: calculateAmount (rent)
        });
        customerReport.totalAmount+=calculateAmount (rent);
    }

    return outPut (customerReport, mode);
}

let customer={
    name: "martin",
    rentals: [{
        "movieID": "F001",
        "days": 3
    }, {
        "movieID": "F002",
        "days": 1
    },]
}

let movies={
    "F001": {
        "title": "Ran",
        "code": "regular"
    },
    "F002": {
        "title": "Trois Couleurs: Bleu",
        "code": "regular"
    },
    // etc
};

function getMovie (id) {
    return movies[id];
}

function isBonus (rent) {
    return (getMovie (rent.movieID).code==="new"&&rent.days>2);
}

function outPut (customerReport, mode) {
    var report='';
    if (mode==='txt') {
        report=`Rental Record for ${customerReport.customerName}\n`;
        customerReport.movies.forEach (item => {
            report+=`\t${item.name}\t${item.amount}\n`;
        });
        report+=`Amount owed is ${customerReport.totalAmount}\n`;
        report+=`You earned ${customerReport.totalfrequentRenterPoints} frequent renter points\n`;
    }

    return report;
}

console.log (statement (customer, movies, 'txt'))