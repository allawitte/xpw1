"use strict"

function statement(customer, movies) {
  let totalAmount = 0;
  let totalfrequentRenterPoints = 0;
  let result = `Rental Record for ${customer.name}\n`;

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
    result += `\t${getMovie(rent.movieID).title}\t${calculateAmount (rent)}\n`;
    totalAmount += calculateAmount (rent);
  }
  // add footer lines
  result += `Amount owed is ${totalAmount}\n`;
  result += `You earned ${totalfrequentRenterPoints} frequent renter points\n`;

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

function isBonus(rent){
  return(getMovie(rent.movieID).code === "new" && rent.days > 2);
}

console.log(statement(customer, movies))