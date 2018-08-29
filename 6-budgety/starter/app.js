
// BUDGET CONTROLLER
var budgetController = (function() {
    
})();

// UI CONTROLLER
var UIController = (function() {
    
    return {
        getinput: function() {
            var type = document.querySelector('.add__type').value; // will be either inc or exp
            var description = document.querySelector('.add__description').value;
            var value = document.querySelector('.add__value').value;   
            return {
                type : type,
                description : description,
                value: value
            }         
        }
    };
}) ();

// GLOBAL APP CONTROLLER
var controller = (function(budgtetCtrl, UICtrl) {
    var ctrlAddItem = function() {
        // 1. Get the field input data
        var inputData = UICtrl.getinput();
        console.log(inputData);
        // 2. Add the item to the budget controller
        // 3. Add the item to the UI
        // 4. Calcualte the budget
        // 5. Display the budget in the UI
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(eventParam) {
 
        if (eventParam.keyCode === 13) {
            ctrlAddItem();
        }
    });
}) (budgetController, UIController); // <== involk it immediately
