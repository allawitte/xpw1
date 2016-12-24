"use strict"

function statement(customer, movies) {
  let totalAmount = 0;
  let totalfrequentRenterPoints = 0;
  let customerReport = {
    customerName: customer.name
  };
  customerReport.movies = [];

  function calculateAmount (rent) {
    let thisAmount = 0;
    switch (getMovie(rent.movieID).code) {
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

    //add frequent renter points
    totalfrequentRenterPoints++;
    // add bonus for a two day new release rental
    if (isBonus(rent)) totalfrequentRenterPoints++;

    //print figures for this rental
    customerReport.movies.push({
      name: getMovie(rent.movieID).title,
      amount: calculateAmount (rent)
    });
    totalAmount += calculateAmount (rent);
  }

  customerReport.totalAmount = totalAmount;
  customerReport.totalfrequentRenterPoints = totalfrequentRenterPoints;


  return outPut(customerReport);
}

let customer = {
  name: "martin",
  rentals: [{
    "movieID": "F001",
    "days": 3
  }, {
    "movieID": "F002",
    "days": 1
  }, ]
}

let movies = {
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

function getMovie(id){
  return movies[id];
}

function isBonus(rent){
  return(getMovie(rent.movieID).code === "new" && rent.days > 2);
}

function outPut(customerReport){
  var report = `Rental Record for ${customerReport.customerName}\n`;
  customerReport.movies.forEach(item => {
    report += `\t${item.name}\t${item.amount}\n`;
  });
  report += `Amount owed is ${customerReport.totalAmount}\n`;
  report += `You earned ${customerReport.totalfrequentRenterPoints} frequent renter points\n`;

  return report;
}

console.log(statement(customer, movies))