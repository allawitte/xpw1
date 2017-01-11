'use strict';
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
function frequentRenterPointsForCustomer(rental) {

    return (movieFor(rental).code === "new" && rental.days > 2)? 2 : 1;

}
function totalAmount() {
    return customer.rentals
        .reduce((sum, value) => {

            return sum + getAmount(value);
        }, 0);

}
function totalFrequentRenterPoints() {
    return customer.rentals
        .map((rental) =>
            frequentRenterPointsForCustomer(rental)
        )
        .reduce((sum, value) => {
            return sum + value
        });
}
function getRecords(customer) {
    return customer.rentals
        .reduce((sum, rental) => {
            return sum + `\t${movieFor(rental).title}\t${getAmount(rental)}\n`;
        },'');
}
function getHeader(customer) {
    return `Rental Record for ${customer.name}\n`;
}
function getFooter() {
    let result = `Amount owed is ${totalAmount()}\n`;
    result += `You earned ${totalFrequentRenterPoints()} frequent renter points\n`;
    return result;
}
function statement(customer) {
    let result = getHeader(customer);

    result += getRecords(customer);

    result += getFooter();

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
console.log(statement(customer));/**
 * Created by HP on 1/10/2017.
 */
