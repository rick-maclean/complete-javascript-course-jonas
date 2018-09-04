
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

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type]. forEach(function(currItem) {
            sum = sum + currItem.value;
        });
        data.totals[type] = sum;
        // if (type === 'income') {
        // } else {
        // }
    }

    var data = {
        allItems: {
            expense: [],
            income: []
        },
        totals: {
            expense: 0,
            income: 0
        },
        budget: 0,
        percentage: -1
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

        calculateBudget: function() {
            // sum of all expenses
            calculateTotal('expense');
        
            // sum of all incomes
            calculateTotal('income');

            // difference (budget)  
            data.budget = data.totals.income - data.totals.expense;

            // calculate % of income that we have spent
            if (data.totals.income > 0) {
                data.percentage = Math.round((data.totals.expense/data.totals.income) * 100);
            } else {
                data.percentage = -1;
            }
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.income,
                totalExp: data.totals.expense,
                percentage: data.percentage
            }
        },

        testing: function () {
            console.log(data);
        }
    }
})();
// ==========================================================================================================
// UI CONTROLLER
var UIController = (function() {
    var DOMqueryStrings = {
        inputPlusMinus: '.add__type',
        inputDescription: '.add__description',
        inputDollars: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetTotal: '.budget__value',
        budgetIncome: '.budget__income--value',
        budgeExpenses: '.budget__expenses--value',
        budgeExpensesPercentage: '.budget__expenses--percentage',
        container: '.container'
    };
    return {
        getinput: function() {
            var type = document.querySelector(DOMqueryStrings.inputPlusMinus).value; // will be either inc or exp
            var description = document.querySelector(DOMqueryStrings.inputDescription).value;
            var value = parseFloat(document.querySelector(DOMqueryStrings.inputDollars).value);
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
            // console.log(newHtml);
            
            // Insert htm ito the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function() {
            var fields, fieldsArr;
           fields =  document.querySelectorAll(DOMqueryStrings.inputDescription + ', ' + DOMqueryStrings.inputDollars);

           fieldsArr = Array.prototype.slice.call(fields);

           fieldsArr.forEach(element => {
               element.value = ""; // value is the value of the html input element
           });

           fieldsArr[0].focus(); // put focus back into Description field to make inputting data easier
        },

        updateBudgetUI: function(obj) {
            var grand = '+ ';
            if (obj.budget <= 0) {
                grand = ' ';
            } 
            document.querySelector(DOMqueryStrings.budgetTotal).textContent = grand + obj.budget;
            if (obj.percentage > 0) {
                document.querySelector(DOMqueryStrings.budgeExpensesPercentage).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMqueryStrings.budgeExpensesPercentage).textContent = '---';
            }
            
            document.querySelector(DOMqueryStrings.budgeExpenses).textContent = '- ' + obj.totalExp;
            document.querySelector(DOMqueryStrings.budgetIncome).textContent = '+ ' + obj.totalInc;
        },

        getDOMstrings: function() {
            return DOMqueryStrings;
        }
    };
}) ();
// ==========================================================================================================
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

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)
    }   
    
    var updateBudget = function () {
        // 1. Calcualte the budget
        budgtetCtrl.calculateBudget();

        // 2. Return the budget
        var budget = budgtetCtrl.getBudget();
        console.log(budget);

        // 3. Display the budget in the UI
        UICtrl.updateBudgetUI(budget);
    }

    var ctrlAddItem = function() {
        var input, newItem;
        // 1. Get the field input data
        inputData = UICtrl.getinput();
        // console.log(inputData);

        if (inputData.description !== "" && !isNaN(inputData.value) && inputData.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetController.addItem(inputData.type, inputData.description, inputData.value);
            // console.log(newItem);
            // budgtetCtrl.testing();

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, inputData.type);

            // 4 clear the fields
            UICtrl.clearFields();

            // 5. Calculate and update the budget
            updateBudget();       
        }
    }

    var ctrlDeleteItem = function(event) {
        // this is a 'delagated'event handler which will be called when 
        // a user clicks on the delete button for a budget item. This happens with
        // bubbling up the DON tree until a node it hit that can handle an event.

        // 1. Determine what was clicked in the container? it needs to be a button
        // 2. need to don traverse up
        var itemID, splitID, type, ID;
        itemID= event.target.parentNode.parentNode.parentNode.parentNode.id;
        console.log(itemID);
        if (itemID) { //if defined or undefined
            splitID = itemID.split('-');
            type = splitID[0];
            ID = splitID[1];

            // 1. 
        }
        
    }

    return {
        init: function() {
            console.log('application has started.');
            UICtrl.updateBudgetUI({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            })
            setupEventListeners();
        }
    };
}) (budgetController, UIController); // <== involk it immediatelly

controller.init();

