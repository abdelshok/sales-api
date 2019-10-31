// Prompt that will allow the user to select from a variety of pre-selected items and see their
// total price at the checkout line. Used for testing.

'use strict'

let testPreselectedPrompt = () => {
    const questions = [
        {
            name: 'preselectedProduct',
            type: 'list',
            message: `We are going to offer you a list of pre-selected products. Use the arrows to pick one of them
            and see the total: \n`,
            choices: [
                'A. ABCDABAA',
                'B. CCCCCCC',
                'C. ABCD'
            ]

        }
    ]
    inquirer.prompt(questions).then((answer) => {
        const { preselectedProduct } = answer;
        const selectedProduct = generalHelper.findUserSelection(preselectedProduct, true); // Returns an array of type ['C', 'ABCD']
        const productString = selectedProduct[1];
        checkoutHelper.calculateTotalPrice(productString, hashOfProductHash, hashOfProductArray);
        exitPrompt();
    })
}

module.exports = {
    testPreselectedPrompt,
}

// External Packages
const inquirer = require('inquirer');
// Internal Modules
const generalHelper = require('../utilityLibrary/generalHelper');
const checkoutHelper = require('../utilityLibrary/checkoutHelper');
const { exitPrompt } = require('./exitPrompt');
const { hashOfProductHash, hashOfProductArray } = require('../itemPrices');