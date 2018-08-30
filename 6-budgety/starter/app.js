
// BUDGET CONTROLLER
var budgetController = (function() {
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            expenses: [],
        incomes: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }    
})();

// UI CONTROLLER
var UIController = (function() {
    var DOMqueryStrings = {
        inputPlusMinus: '.add__type',
        inputDescription: '.add__description',
        inputDollars: '.add__value',
        inputBtn: '.add__btn'
    };
    return {
        getinput: function() {
            var type = document.querySelector(DOMqueryStrings.inputPlusMinus).value; // will be either inc or exp
            var description = document.querySelector(DOMqueryStrings.inputDescription).value;
            var value = document.querySelector(DOMqueryStrings.inputDollars).value;   
            return {
                type : type,
                description : description,
                value: value
            }         
        },

        getDOMstrings: function() {
            return DOMqueryStrings;
        }
    };
}) ();

// GLOBAL APP CONTROLLER
var controller = (function(budgtetCtrl, UICtrl) {
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(eventParam) {
            if (eventParam.keyCode === 13) {
                ctrlAddItem();
            }
        });
    }    

    var ctrlAddItem = function() {
        // 1. Get the field input data
        var inputData = UICtrl.getinput();
        // console.log(inputData);

        // 2. Add the item to the budget controller
        // 3. Add the item to the UI
        // 4. Calcualte the budget
        // 5. Display the budget in the UI
    }

    return {
        init: function() {
            console.log('application has started.');
            setupEventListeners();
        }
    };
}) (budgetController, UIController); // <== involk it immediatelly

controller.init();
