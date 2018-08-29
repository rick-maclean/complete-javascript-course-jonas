console.log('Hello World Rick change again');

var firstname = 'Richard';

console.log(firstname);

var job;
var bool = true;
console.log(job);
console.log(bool);

// single line

// job = 1;
// job ='streing';
// firstname = 45;

// var name = 'John';
// var age = 16;

// var resultOfTernary = age >= 20 ? console.log('John is at least 20') : console.log('John is under 20');
// console.log('result of consol.log is ==>' + resultOfTernary);
// var drink = age>19 ? 'beer' : 'juice';
// console.log('John can drink ' + drink);


// falsy values are    undefined, null, o, '', NaN
// truthy values: NOT falsy values   eg 'a string'

console.log('\nTip Calculator\n')

// function tipCalculator(bill) {
//     let tip;
//     switch (true) {
//         case (bill < 50):
//         tip = 0.2;
//         break;
//         case (bill >= 50 && bill<200):
//         tip = 0.15;
//         break;
//         default:
//         tip = 0.1
//     }
//     return bill*tip;
// }

// console.log(tipCalculator(30));
// console.log(tipCalculator(100));
// console.log(tipCalculator(300));

// var bills = [30, 100, 300, 45, 138, 265];
// var tips = [];
// var finalvalues = [];
// for (i=0; i < bills.length; i++) {
//     tips.push(tipCalculator(bills[i]));
//     finalvalues.push(bills[i]+tips[i]);
// }
// console.log(bills);
// console.log(tips);
// console.log(finalvalues);


/*****************************
* CODING CHALLENGE 5
*/

/*
Remember the tip calculator challenge? Let's create a more advanced version using everything we learned!

This time, John and his family went to 5 different restaurants. The bills were $124, $48, $268, $180 and $42.
John likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, 
and 10% if the bill is more than $200.

Implement a tip calculator using objects and loops:
1. Create an object with an array for the bill values
2. Add a method to calculate the tip
3. This method should include a loop to iterate over all the paid bills and do the tip calculations
4. As an output, create 1) a new array containing all tips, and 2) an array containing final paid 
amounts (bill + tip). HINT: Start with two empty arrays [] as properties and then fill them up in the loop.


EXTRA AFTER FINISHING: Mark's family also went on a holiday, going to 4 different restaurants. 
The bills were $77, $375, $110, and $45.
Mark likes to tip 20% of the bill when the bill is less than $100, 10% when the bill is 
between $100 and $300, and 25% if the bill is more than $300 (different than John).

5. Implement the same functionality as before, this time using Mark's tipping rules
6. Create a function (not a method) to calculate the average of a given array of tips. 
HINT: Loop over the array, and in each iteration store the current sum in a variable (starting from 0). 
After you have the sum of the array, divide it by the number of elements in it (that's how you calculate the average)
7. Calculate the average tip for each family
8. Log to the console which family paid the highest tips on average

GOOD LUCK 😀
*/

let johnRestaurantBills = {
    bills : [124, 48, 268, 180, 42],
    tips : [],
    totals : [],
    calcTipsTotals : function () {
        for (i=0; i < this.bills.length; i++) {
            this.tips.push(this.tipCalculator(this.bills[i]));
            this.totals.push(this.bills[i]+this.tips[i]);
        }
        this.averageTip = averageTip(this.tips, this.tips.length);
    },
    tipCalculator: function(bill) {
        let tip;
        switch (true) {
            case (bill < 50):
            tip = 0.2;
            break;
            case (bill >= 50 && bill<200):
            tip = 0.15;
            break;
            default:
            tip = 0.1
        }
        return bill*tip;
    },
    averageTip: 0
}

// EXTRA AFTER FINISHING: Mark's family also went on a holiday, going to 4 different restaurants. 
// The bills were $77, $375, $110, and $45.
// Mark likes to tip 20% of the bill when the bill is less than $100, 10% when the bill is 
// between $100 and $300, and 25% if the bill is more than $300 (different than John).

// 5. Implement the same functionality as before, this time using Mark's tipping rules
// 6. Create a function (not a method) to calculate the average of a given array of tips. 
// HINT: Loop over the array, and in each iteration store the current sum in a variable (starting from 0). 
// After you have the sum of the array, divide it by the number of elements in it (that's how you calculate the average)
// 7. Calculate the average tip for each family
// 8. Log to the console which family paid the highest tips on average


let markRestaurantBills = {
    bills : [77, 375, 110, 45, 62],
    tips : [],
    totals : [],
    calcTipsTotals : function () {
        for (i=0; i < this.bills.length; i++) {
            this.tips.push(this.tipCalculator(this.bills[i]));
            this.totals.push(this.bills[i]+this.tips[i]);
        }
        this.averageTip = averageTip(this.tips, this.tips.length);
    },
    tipCalculator: function(bill) {
        let tip;
        switch (true) {
            case (bill < 100):
            tip = 0.2;
            break;
            case (bill >= 100 && bill<300):
            tip = 0.1;
            break;
            default:
            tip = 0.25
        }
        return bill*tip;
    },
    averageTip: 0
}

function averageTip (tiparray, length) {
    let totalTips = 0;
    for (i=0; i < length; i++) {
        totalTips =+ tiparray[i];
    }
    return totalTips/length;
}

johnRestaurantBills.tipCalculator();
markRestaurantBills.tipCalculator();

console.log(johnRestaurantBills);
console.log(markRestaurantBills);
