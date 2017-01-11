'use strict';
function statement(customer, movies) {
    let result = `Rental Record for ${customer.name}\n`;

    for (let rental of customer.rentals) {

        result += `\t${movieFor(rental).title}\t${getAmount(rental)}\n` ;

    }



    // add footer lines
    result += `Amount owed is ${totalAmount()}\n`;
    result += `You earned ${totalFrequentRenterPoints()} frequent renter points\n`;

    return result;

    function movieFor(rental) {
        return movies[rental.movieID];
    }


    function getAmount(rental) {
        let result = 0;
        switch (movieFor(rental).code) {
            case "regular":
                result = 2;
                if (rental.days > 2) {
                    result += (rental.days - 2) * 1.5;
                }
                break;
            case "new":
                result = rental.days * 3;
                break;
            case "childrens":
                result = 1.5;
                if (rental.days > 3) {
                    result += (rental.days - 3) * 1.5;
                }
                return result;
        }
        return result;
    }

    function totalFrequentRenterPoints() {
        return customer.rentals
            .reduce((sum, value) => {
                return sum + value;
            });
    }

    function totalAmount() {
        let result = 0;
        for (let rental of customer.rentals) {

            result += getAmount(rental);
        }
        return result;
    }
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
