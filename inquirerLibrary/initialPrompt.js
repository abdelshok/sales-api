// Initial prompt that starts the whole application

'use strict';


let initialPrompt = () => {
    const questions = [
        {
            name: 'welcomeUserPrompt',
            message: "Welcome to Jupiter's one and only 7/11. 🌖 \n \n We sell As, Bs, Cs, Ds, and other letters of the alphabet galore. \n \n Please check out our prices below. Please press enter. \n"
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        const priceListString = formatProductPrices(hashOfProductArray);
        console.log(neutral(priceListString));
        userOptionsPrompt();
    });
}

let userOptionsPrompt = () => {
    const questions = [
        {
            name: 'initialUserSelection',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'A. Buy a selection of items',
                'B. Create products or update existing product pricing',
                'C. Test the price accuracy of our advanced software by choosing one of our preselected item lists',
                'D. Test Boom'
            ]
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        const { initialUserSelection } = answer;
        const userSelection = generalHelper.findUserSelection(initialUserSelection, false);

        if (userSelection === 'A') {
            purchasePrompt();
        } else if (userSelection === 'B') {
            setProductPrompt();
        } else if (userSelection === 'C') {
            testPreselectedPrompt();
        } else if (userSelection === 'D') {
            generalHelper.boom()
        }
    })
}
module.exports = {
    initialPrompt,
}

// External Packages
const inquirer = require('inquirer');
// Internal Modules
const generalHelper = require('../utilityLibrary/generalHelper');
const { purchasePrompt } = require('./purchasePrompt');
const { setProductPrompt } = require('./setProductPrompt');
const { testPreselectedPrompt } = require('./testPreselectedPrompt');
const { formatProductPrices } = require('../utilityLibrary/generalHelper');
const { neutral } = require('../chalk');
// Prices
const { hashOfProductHash, hashOfProductArray } = require('../itemPrices');
