// Prompts to set/create product, set prices, and store them in the right data structures

'use strict';

// External Packages
const inquirer = require('inquirer');
// Internal Modules
const setProductHelper = require('../utilityLib/setProductHelper');
const prices = require('../itemPrices');
const { exitPrompt } = require('./exitPrompt');
// Product Selection
const product = require('../itemPrices');


let setProductPrompt = () => {
    const questions = [
        {
            name: 'setProductPrompt',
            type: 'input',
            message: `\n You want to set prices, so here are a few rules: \n 
            1. You can change individual prices or volume prices of existing products (ie. A, B, etc).  
            2. You can also create new products by typing a new product name in the input that is going to follow.
            3. The new product that you create needs to be a single alphabetic character. Yes this means, that there is a maximum of 26 products.
            4. After you choose a new product, whether it is a newly invented one or an already existing one, the commmand line is going to ask you
            to choose the price first, and then the quantity. 
            5. The first price of a newly created product needs to always be set for an individual item (quantity=1). A product cannot be created by
            directly setting a volume quantity. 
            Ie. If you want to create a product 'Z', the CLI will first ask you the name of the product. Input 'Z'. It will then ask for the price of
            'Z'. Let's assume that it's set to 100. After that the CLI will ask for the quantity. The first quantity entry needs to be 1, meanining that
            one unit of 'Z' will cost $100. Any unit other than 1 will return an error. \n
            • If you want to reset the product list, exit the program and re-start it.

            Act accordingly.
            \n Enter new product name (single character): `,
            validate: (newItemString) => { // Validates that a string is actually entered, returns an error message if nothing is entered
                newItemString = newItemString.toString()
                let length = newItemString.length;
                if (length ==  0) {
                    return 'Input is empty. Please enter a valid one character string';
                } else if (length > 1) {
                    return 'Input too long. Please enter a valid one character string';
                } else {
                    if (/[a-z]/i.test(newItemString)) {
                        return true; 
                    } else {
                        return 'Input is not a character from the alphabet';
                    }
                }
            },
            filter: function(value) { // Ensures the string is always capitalized
                if (value.length > 0) {
                    return value.toUpperCase();
                } else {
                    return value;
                }
            }
        }
    ];

    inquirer.prompt(questions).then((answer) => {
        let { setProductPrompt } = answer;
        console.log('User is trying to change or create item', setProductPrompt);
        let productExists = setProductHelper.checkIfProductExists(setProductPrompt, product.itemPricesHash);
        if (productExists) {
            console.log('Product exists. You can now set the price and quantity');
        } else {
            console.log('Product created. You can now set the product price and quantity');
        }
        setProductQuantityPricePrompt(productExists);
        
    })
};

let setProductQuantityPricePrompt = (didProductAlreadyExist) => {
    const questions = [
        {
            name: 'askPricePrompt',
            type: 'input',
            message: `Please input the price of the current product you've selected or created: \n
                      Enter the price: `
        },
        {
            name: 'askQuantityPrompt',
            type: 'input',
            message: `\n Please input the quantity you want to set this price to \n
                      - Remember that you can set the previous price to be for an individual item or for a volume
                      - If this a newly created item, then the first quantity set needs to be equal to one. \n
                      Enter the quantity as an integer: `,
            validate: (quantity) => {
                if (didProductAlreadyExist) {
                    return true; // Volume can be sent for anything if product already existed
                } // which means that indidivual price has already been set
                else {
                    quantity = Number(quantity); // Quantity is a string, so first convert it to an integer
                    if (Number.isInteger(quantity)) { // Validates that the input is an integer
                        if (quantity != 1) {
                            return 'This product was just recently created. First set individual price of item by setting quantity to 1.';
                        } else {
                            return true;
                        }
                    } else {
                        return 'Input entered is not an integer.'; 
                    }
                }
            }
        }
    ]
    inquirer.prompt(questions);
}

module.exports = {
    setProductPrompt,
}
