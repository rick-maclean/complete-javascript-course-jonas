// ==========================================================================================================
// BUDGET CONTROLLER
var budgetController = (function() {
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);        
        } else {
            this.percentage = -1;
        } 
    }

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }

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

        deleteItem: function(type, id) {
            var ids, index;
            // id = 6
            // eg ids[1 2 4 6 8]  ==> index is 3 when id = 6
            // nope ==> data.allItems[type][id]

            //need an array of the indexes
            ids = data.allItems[type].map(function(current) {
                return current.id
            });
            index = ids.indexOf(id); // will return -1 if item is not found

            // console.log(ids);
            // console.log(index);

            if (index !== -1) {
                data.allItems[type].splice(index, 1); // this will remove 1 item at index location
            }
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

        calculatePercentages: function() {
            //  exp 20, 10, 40 income=100
            //      20% 10% 40%
            data.allItems.expense.forEach(function(cur) {
                cur.calcPercentage(data.totals.income);
            });

        },

        getPercentages: function() {
            var allPercentages = data.allItems.expense.map(function(cur) {
                return cur.getPercentage();
            })
            return allPercentages;
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
        container: '.container',
        listItem: '.item.clearfix',
        itemPercentage: '.item__percentage',
        monthYear: '.budget__title--month'
    };

    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
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
            var numb = this.formatNumber(type, obj.value);
            newHtml = newHtml.replace('%value%', numb);
            // console.log(newHtml);
            
            // Insert htm ito the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function(itemID) {
            var selector, itemToDelete;
            selector = DOMqueryStrings.listItem + '#' + itemID
            itemToDelete = document.querySelector(selector);
            console.log(itemToDelete);
            itemToDelete.parentNode.removeChild(itemToDelete);
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
            var numb;
            var type = 'expense';
            if (obj.budget >= 0) {
                type = 'income';
            } 
            // console.log('obj.budget => ' + obj.budget);
            document.querySelector(DOMqueryStrings.budgetTotal).textContent = this.formatNumber(type, obj.budget);
            if (obj.percentage > 0) {
                document.querySelector(DOMqueryStrings.budgeExpensesPercentage).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMqueryStrings.budgeExpensesPercentage).textContent = '---';
            }
            
            numb = this.formatNumber('expense', obj.totalExp);
            // console.log('obj.totalExp => ' + obj.totalExp);
            // console.log('obj.totalInc => ' + obj.totalInc);
            document.querySelector(DOMqueryStrings.budgeExpenses).textContent = numb;
            numb = this.formatNumber('income', obj.totalInc);
            document.querySelector(DOMqueryStrings.budgetIncome).textContent = numb;
        },

        displayPercentages: function(percts) {
            // console.log(percts);
            var precentageNodeSelector = DOMqueryStrings.expenseContainer + ' ' + DOMqueryStrings.itemPercentage;
            var percentageItems = document.querySelectorAll(precentageNodeSelector);
            for (var i=0; i<percentageItems.length; i++) {
                percentageItems[i].textContent = percts[i] + '%';
            }
            // if (percentageItems) {
            //     percentageItems.forEach(function(cur) {
            //         cur.textContent =  '34%x'
            //     });
            // }
            
        },

        formatNumber: function(type, numb) {
            // console.log(numb);
            if (NaN === numb) {
                numb = parseFloat(numb);
            }
            var numbCurrency = (numb).toLocaleString("en-USA", {style: "currency", currency: "USD", minimumFractionDigits: 2})
            // console.log(numbCurrency);
            if (type === 'income') {
                return '+ ' + numbCurrency;
            } else {
                return '- ' + numbCurrency;
            }
        },

        displayMonth: function() {
            var d = new Date();
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            var monthName = month[d.getMonth()];
            console.log(monthName);
            document.querySelector(DOMqueryStrings.monthYear).textContent = monthName + ' ' + d.getFullYear();
        },

        changedType: function(event) {
            // change red class and red focus on the UI elements
            var fields = document.querySelectorAll(
                DOMqueryStrings.inputPlusMinus + ',' +
                DOMqueryStrings.inputDescription + ',' +
                DOMqueryStrings.inputDollars);

            nodeListForEach(fields, function(cur) {
                cur.classList.toggle('red-focus');
            });
            document.querySelector(DOMqueryStrings.inputBtn).classList.toggle('red');
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

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputPlusMinus).addEventListener('change', UICtrl.changedType);
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

    var updatePercentages = function() {
        // console.log ('just called updatePErcentages')
        // 1. Calculate the percentages
        budgtetCtrl.calculatePercentages();

        // 2. Read percentage from the budget controller
        var percentages = budgtetCtrl.getPercentages();
        // console.log(percentages);

        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);


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
            
            //6. Calculate and update the expense percentages
            updatePercentages();
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
        // console.log(itemID);
        if (itemID) { //if defined or undefined
            // income-# or expense-#
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. Delete th item from the data structure
            budgtetCtrl.deleteItem(type, ID);

            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);

            //3. Update and show the new budget/totals
            updateBudget();    

            //4. Calculate and update the expense percentages
            updatePercentages();
        }
        
    }

    return {
        init: function() {
            // console.log('application has started.');
            UICtrl.updateBudgetUI({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            })
            UICtrl.displayMonth();
            setupEventListeners();
        }
    };
}) (budgetController, UIController); // <== involk it immediatelly

controller.init();

