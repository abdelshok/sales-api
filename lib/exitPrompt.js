'use strict';

// External Packages
const chalk = require('chalk');
const inquirer = require('inquirer');
const clear = require('clear');
// Internal Modules
const helper = require('../helper');
const inquirerLibrary = require('./inquirerLibrary'); // TOENSURE: Why is the inquirerLibrary object empty here but full in the index.js function that we run initially
let { initialPrompt } = require('./initialPrompt');

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
                'A. Exit the store',
                'B. Go back to main menu.',
            ]
        }
    ]
    return inquirer.prompt(questions).then(async (answer) => {
        let { exitNextPrompt } = answer;
        let userSelection = helper.findUserSelection(exitNextPrompt);
        
        if (userSelection === 'A') {
            console.log(chalk.bold.magenta('See you soon!'));
            return 'Bye';
        } else if (userSelection == 'B') {
            clear();
            console.log('Initial prompt', initialPrompt)
        };
    });
}

module.exports = {
    exitPrompt,
}

// TOENSURE: Create function that formats the pricing correctly. 