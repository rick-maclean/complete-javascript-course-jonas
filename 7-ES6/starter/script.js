/////////////////////////////////
// Lecture: Default parameters

/*
// ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
    
    lastName === undefined ? lastName = 'Smith' : lastName = lastName;
    nationality === undefined ? nationality = 'american' : nationality = nationality;
    
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

//ES6
var ages = [12,15,19,11,9];

console.log(ages.filter(el => el > 14));

function SmithPer (firstname, yearOfBirth, lastname = 'smith', country = 'american') {
    this.first = firstname;
    this.last = lastname;
    this.yob = yearOfBirth;
    this.nation = country;
}

const john = new SmithPer('john', 1934, 'frederick');
*/



////////////////////////////////
// Lecture: Classes and subclasses


//ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var Athlete5 = function(name, yearOfBirth, job, olymicGames, medals) {
    Person5.call(this, name, yearOfBirth, job);
    this.olymicGames = olymicGames;
    this.medals = medals;
}

Athlete5.prototype = Object.create(Person5.prototype);


Athlete5.prototype.wonMedal = function() {
    this.medals++;

    console.log(`Athlete5.medals ${this.medals}`);
}

Athlete5.prototype.lostMedal = function() {
    this.medals--;

    console.log(`Athlete5.medals ${this.medals}`);
}


var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);

johnAthlete5.calculateAge();
johnAthlete5.wonMedal();
johnAthlete5.lostMedal();
johnAthlete5.lostMedal();


//ES6
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(`Person6.calculateAge ${age}`);
    }
}

class Athlete6 extends Person6 {
    constructor(name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }
    
    wonMedal() {
        this.medals++;
        console.log(`won Athlete6.medals ${this.medals}`);
    }

    lostMedal() {
        this.medals--;
        console.log(`lost Athlete6.medals ${this.medals}`);
    }
}

const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);

johnAthlete6.wonMedal();
johnAthlete6.calculateAge();
johnAthlete6.lostMedal();
johnAthlete6.lostMedal();


