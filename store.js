"use strict"

function statement(customer, movies) {
  let totalAmount = 0;
  let frequentRenterPoints = 0;
  let result = `Rental Record for ${customer.name}\n`;

  function calculateAmount (thisAmount, rent) {
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
    frequentRenterPoints++;
    // add bonus for a two day new release rental
    if (getMovie(rent.movieID).code === "new" && rent.days > 2) frequentRenterPoints++;

    //print figures for this rental
    result += `\t${getMovie(rent.movieID).title}\t${calculateAmount (0, rent)}\n`;
    totalAmount += calculateAmount (0, rent);
  }
  // add footer lines
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${frequentRenterPoints} frequent renter points\n`;

  return result;
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

console.log(statement(customer, movies))