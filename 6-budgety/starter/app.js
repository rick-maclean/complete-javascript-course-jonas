
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
            expense: [],
            income: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }
    var ID = 0;
    
    return {
        addItem: function(type, des, val) {
            var newItem;
            ID++;
            if (type === 'expense') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'income') {
                newItem = new Income(ID, des, val);
            }  
            data.allItems[type].push(newItem);
            return newItem;
        },
        testing: function () {
            console.log(data);
        }
    }
})();

// UI CONTROLLER
var UIController = (function() {
    var DOMqueryStrings = {
        inputPlusMinus: '.add__type',
        inputDescription: '.add__description',
        inputDollars: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
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

        addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create html string with placeholder tags
            if (type === 'income') {
                element = DOMqueryStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div>' + 
                '<div class="right clearfix"><div class="item__value">%value%</div>' + 
                '<div class="item__delete"><button class="item__delete--btn">' + 
                '<i class="ion-ios-close-outline"></i></button>' + 
                '</div></div></div>';
            } else if (type === 'expense') {
                element = DOMqueryStrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div>' + 
                '<div class="right clearfix"><div class="item__value">%value%</div>' + 
                '<div class="item__percentage">21%</div><div class="item__delete">' + 
                '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>' + 
                '</div></div>';
            }
            
            // Replace placeholder tags with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            console.log(newHtml);
            
            // Insert htm ito the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
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
        var input, newItem;
        // 1. Get the field input data
        inputData = UICtrl.getinput();
        // console.log(inputData);

        // 2. Add the item to the budget controller
        newItem = budgetController.addItem(inputData.type, inputData.description, inputData.value);
        // console.log(newItem);
        budgtetCtrl.testing();

        // 3. Add the item to the UI
        UICtrl.addListItem(newItem, inputData.type);
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

