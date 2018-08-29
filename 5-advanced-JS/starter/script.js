// // Function construtor
// var john = {
//     name: 'John',
//     yearOfBirth: 1990,
//     job: 'teacher'
// };
// console.log('John is ==>');
// console.log(john);

// function consoleLogFirstLast(person) {
//     console.log(person.name + ' ' + person.lastname);
// }
// // var Person = function(name, yearOfBirth, job) {
// //     this.name = name;
// //     this.yearOfBirth = yearOfBirth;
// //     this.job = job;
// //     this.calculateAge = function() {
// //         console.log('age of person is....'); console.log(2018 - this.yearOfBirth);
// //     }
// // }

// var Person = function(name, yearOfBirth, job) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// }

// Person.prototype.calculateAge = function() {
//     console.log('age of person is....'); console.log(2018 - this.yearOfBirth);
// };

// Person.prototype.lastname = 'Smith';

// // new operator creates a new EMPTY object and the function is called with an
// // execution context so 'this' points to the new empty object. Therefore the function
// // is setting the properties on the new empty object
// var john2 = new Person('john', 1990, 'Scottish Settler');
// console.log('John2 is ==>');
// console.log(john2);
// john2.calculateAge();
// consoleLogFirstLast(john2);

// var jane = new Person('Jane', 1969, 'designer');
// console.log(jane);
// consoleLogFirstLast(jane);

// jane.calculateAge();
// var mark = new Person('Mark', 1959, 'programmer');
// console.log(mark);
// mark.calculateAge();
// consoleLogFirstLast(mark);

// var person = Person('Not New', 1234, 'object');
// console.log('gonna log person');
// console.log(person);

// Person.prototype.lastname = 'McGwininshire';
// consoleLogFirstLast(mark);
// consoleLogFirstLast(jane);
// consoleLogFirstLast(john2);


(function somename() {
    console.log('calling an IIFE called somename');
})();


function somename() {
    console.log('another somename');
}

somename();