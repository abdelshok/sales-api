// Prompts to exit the application. Two options: go back to main menu or exit

'use strict';

let exitPrompt = () => {
    const questions = [
        {
            name: 'exitPrompt',
            message: "Thank you for coming to Jupiter's only 7/11. We hope to see you again. Please press Enter. \n"
        },
        {
            name: 'exitNextPrompt',
            type: 'list',
            message: 'What would you like to do next?',
            choices: [
                'A. Purchase products', 
                'B. Go back to Main Menu',
                'C. Exit the store'
            ]
        }
    ]
    inquirer.prompt(questions).then((answer) => {
        let { exitNextPrompt } = answer;
        let userSelection = findUserSelection(exitNextPrompt, false);
        
        if (userSelection === 'A') {
            clear();
            purchasePrompt();
        } else if (userSelection === 'B') {
            clear();
            initialPrompt();
        } else if (userSelection === 'C') {
            console.log(important('See you soon!'));
            return 'Bye';
        }
    });
}

module.exports = {
    exitPrompt
}

// External Packages
const inquirer = require('inquirer');
const clear = require('clear');
// Internal Modules
const { important } = require('../chalk');
const { findUserSelection } = require('../utilityLibrary/generalHelper');
const inquirerLibrary = require('./inquirerLibrary'); // Circular dependency problem fixed by moving imports to the end of the file
const { purchasePrompt } = require('./purchasePrompt');
const { initialPrompt } = require('./initialPrompt');
