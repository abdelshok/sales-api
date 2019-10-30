'use strict';

const inquirer = require('inquirer');
const helper = require('../helper');
const prices = require('../itemPrices');
const inquirerLibrary = require('./inquirerLibrary');
const { exitPrompt } = require('./exitPrompt');

let purchasePrompt = () => {
    const questions = [
        {
            name: 'purchasePrompt',
            message: "Wise decision. We'll make sure to provide you with the best selection of As, Bs, Cs, and Ds. Please press Enter. \n"
        }
    ]
    inquirer.prompt(questions).then(() => {
        console.log('Answer of purchase prompt: \n');
        inputItemsPrompt(); // Leveraging hierarchical structure provided by inquirer package
    });
}

let inputItemsPrompt = () => {
    const questions = [
        {
            name: 'purchaseList',
            type: 'input',
            message: `Please enter a list of your purchased items as a string composed of only A, B, C, and D characters. \n 
            -Ie. If you only purchase one item A and two items B, then enter: ABB, BAB, etc.  
            -The ordering of the items does not matter, lowercase or uppercase does not matter.
            -At any time, you can come back to the main menu by typing "menu" 
            -Please enter one item at minimum, there is no limit to the amount of items you can purchase, we fortunately have an infinite supply. 
            \n Enter: `,
            validate: (itemList) => { // Validates that a string is actually entered, returns an error message if nothing is entered
                let length = itemList.length;
                if (length ==  0) {
                    return 'Please enter a valid string';
                } else {
                    return true; // validate() function needs to return a *boolean* value if true or it will not pass the answer
                } // to the next prompt 
            },
            filter: function(value) { // Ensures the string is always capitalized by transforming it
                if (value.length > 0) {
                    return value.toUpperCase();
                } else {
                    return value;
                }
            }
        }
    ];

    inquirer.prompt(questions).then(async (answer) => {
        let { purchaseList } = answer;
        let { itemPricesHash, itemPricesArray } = prices;
        helper.calculateTotalPrice(purchaseList, itemPricesHash, itemPricesArray);
        exitPrompt();
    })
};

module.exports = {
    purchasePrompt,
    inputItemsPrompt,
}

// TOENSURE: error logging if one of the items is not present in the store selection
