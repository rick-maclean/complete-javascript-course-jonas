var budgetController = (function() {
    var x =23;
    var add = function(a) {
        return x + a;
    }
    
    return { 
        publicTest: function(b) {
            console.log(add(b));
        },
        publicTest2: function(b) {
            return (add(b) + 3);
        }
    }
})();
y=5;

var UIController = (function() {
    // some code
}) ();

var controller = (function(budgtetCtrl, UICtrl) {
    // some code

    var z = budgtetCtrl.publicTest2(7);

    return {
        anotherPublic: function() {
            console.log(z);
        }
    }
}) (budgetController, UIController); // <== involk it immediately
