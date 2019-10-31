// Initial prompt that starts the whole application

'use strict';

// External Packages
const inquirer = require('inquirer');
// Internal Modules
const generalHelper = require('../utilityLibrary/generalHelper');
const { purchasePrompt } = require('./purchasePrompt');
const { setProductPrompt } = require('./setProductPrompt');

let initialPrompt = () => {
    const questions = [
        {
            name: 'welcomeUserPrompt',
            message: "Welcome to Jupiter's one and only 7/11. \n \n We sell As, Bs, Cs, and Ds galore. \n \n Please check out our prices below. \n \n A: $2.00 each or 4 for $7.00 \n B: $12.00 \n C: $1.25 or 6 for $6.00 \n D: $0.15 \n Please press enter. \n"
        },
        {
            name: 'welcomeSelection',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'A. Buy a selection of A, B, C, and Ds',
                'B. Change product pricing, you are god.',
                'C. Test the price accuracy of our advanced software by choosing one of three preselected item lists.',
                'D. Test Boom'
            ]
        }
    ]
    return inquirer.prompt(questions).then((answer) => {
        let { welcomeSelection } = answer;
        let userSelection = generalHelper.findUserSelection(welcomeSelection);

        if (userSelection === 'A') {
            purchasePrompt();
        } else if (userSelection === 'B') {
            setProductPrompt();
        } else if (userSelection === 'C') {
            console.log('User selected option C \n');
        } else if (userSelection === 'D') {
            generalHelper.boom()
        }
    });
}

module.exports = {
    initialPrompt,
}
