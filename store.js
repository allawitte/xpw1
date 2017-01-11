'use strict';
function statement(customer, movies) {
    let totalAmount = 0;
    let frequentRenterPoints = 0;
    let result = `Rental Record for ${customer.name}\n`;

    function movieFor(rental) {
        return movies[rental.movieID];
    }


    function getAmount(rental) {
        let thisAmount = 0;
        switch (movieFor(rental).code) {
            case "regular":
                thisAmount = 2;
                if (rental.days > 2) {
                    thisAmount += (rental.days - 2) * 1.5;
                }
                break;
            case "new":
                thisAmount = rental.days * 3;
                break;
            case "childrens":
                thisAmount = 1.5;
                if (rental.days > 3) {
                    thisAmount += (rental.days - 3) * 1.5;
                }
                break;
        }
        return thisAmount;
    }

    function frequentRenterPointsForCustomer(rental) {
        frequentRenterPoints++;
        // add bonus for a two day new release rental
        if (movieFor(rental).code === "new" && rental.days > 2) frequentRenterPoints++;
    }

    for (let rental of customer.rentals) {


        //add frequent renter points
        frequentRenterPoints =+ frequentRenterPointsForCustomer(rental);

        //print figures for this rental
        result += `\t${movieFor(rental).title}\t${getAmount(rental)}\n` ;
        totalAmount += getAmount(rental);
    }
    // add footer lines
    result += `Amount owed is ${totalAmount}\n`;
    result += `You earned ${frequentRenterPoints} frequent renter points\n`;

    return result;
}
var customer = {
    "name": "martin",
    "rentals": [
    {"movieID": "F001", "days": 3},
    {"movieID": "F002", "days": 1}
]
};
var movies = {
    "F001": {"title": "Ran",                     "code": "regular"},
    "F002": {"title": "Trois Couleurs: Bleu",     "code": "regular"}
    // etc
};
console.log(statement(customer, movies));/**
 * Created by HP on 1/10/2017.
 */
