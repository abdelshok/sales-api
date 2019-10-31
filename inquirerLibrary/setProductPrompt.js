// Prompts to set/create product, set prices, and store them in the right data structures

'use strict';

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
        let productExists = setProductHelper.checkIfProductExists(setProductPrompt, items.itemPricesHash);
        if (productExists) {
            console.log('Product exists. You can now set the price and quantity');
        } else {
            console.log('Product created. You can now set the product price and quantity');
        }
        setProductQuantityPricePrompt(productExists, setProductPrompt);
        
    })
};

// Weakness = decimal numbers not taken care of.

let setProductQuantityPricePrompt = (didProductAlreadyExist, productName) => {
    const questions = [
        {
            name: 'productPrice',
            type: 'input',
            message: `Please input the price of the current product you've selected or created: \n
                      Enter the price: `,
            validate: (price) => {
                price = Number(price);
                if (!isNaN(price)) { // Number.isInteger() function does not take care of decimal number case
                    if (price != 0) {
                        if (price > 0) {
                            if (price < 100000) {
                                return true;
                            } else {
                                return '\n \n Price cannot be higher than $100,000.00. This a recession.'
                            }
                        } else {
                            return '\n \n Price cannot be negative.';
                        }
                    } else {
                        return '\n \n Price cannot be set to 0.';
                    }
                } else {
                    return '\n \n Input entered is not an integer.';
                }
            }
        },
        {
            name: 'productQuantity',
            type: 'input',
            message: `\n Please input the quantity you want to set this price to \n
                      - Remember that you can set the previous price to be for an individual item or for a volume
                      - If this a newly created item, then the first quantity set needs to be equal to one. \n
                      Enter the quantity as an integer: `,
            validate: (quantity) => {
                quantity = Number(quantity); // Quantity entered as a string, first convert it to an integer
                if (Number.isInteger(quantity)) { // Didn't use isNaN() because we need quantity to be an integer
                    if (quantity != 0) { // Ensures quantity cannot be set to 0 
                        if (quantity < 1000) {
                            if (quantity > 0) {
                                if (didProductAlreadyExist) {
                                    return true;
                                } else {
                                    if (quantity != 1) { // Ensures that individual price is set before volume prices are set up
                                        return '\n \n This product was recently created. Set invidual price first by setting quantity to 1.'
                                    } else if (quantity ) {
                                        return true;
                                    }
                                }
                            } else {
                                return '\n \n Quantity cannot be below 0';
                            }
                        } else {
                            return '\n \n Quantity cannot be higher than 1000 items. This is not an Amazon Warehouse.';
                        }
                    } else {
                        return '\n \n Product quantity cannot be set to 0.' 
                    }
                } else {
                    return '\n \n Input entered is not an integer.';
                }
            }
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        // console.log('Did product already exist', didProductAlreadyExist);
        // console.log('Product name', productName);
        let {productPrice, productQuantity} = answer;
        // console.log('Product about to be set at price', productPrice);
        // console.log('Product about to be set at quantity', productQuantity);
        // Transform the productPrice & productQuantity into integers here (can't stay as strings)
        productQuantity = Number(productQuantity);
        productPrice = Number(Number(productPrice).toFixed(2)); // Rounding to the nearest 100th, wrapped in Number() again because .toFixed() returns a string
        // console.log('Product transformed into integer', productPrice);
        // console.log('Product quantity transformed into integer', productQuantity);
        // console.log('SetProductQuantityPricePrompt over');
        setProductHelper.createProductInStore(productName, productPrice, productQuantity, items.itemPricesHash, items.itemPricesArray, didProductAlreadyExist);
        console.log('New item hash', items.itemPricesHash);
        console.log('new item array', items.itemPricesArray);
        console.log('Set product helper', setProductHelper);
        exitPrompt();
    })
}

module.exports = {
    setProductPrompt,
}

// External Packages
const inquirer = require('inquirer');
// Internal Modules
const setProductHelper = require('../utilityLibrary/setProductHelper');
const prices = require('../itemPrices');
const { exitPrompt } = require('./exitPrompt');
const { initialPrompt } = require('./initialPrompt');
const { purchasePrompt } = require('./purchasePrompt');

// Product Selection
const items = require('../itemPrices');


// TOENSURE: // Also make sure that when the product pricing is made it is above the lower quantity's price
// and under the above quantity's price

// TOENSURE: Add 3rd option (go back to mainmenu or purhcase more items ) in initialPrompt