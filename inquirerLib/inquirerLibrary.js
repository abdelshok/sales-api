// Source file where we require all of the created inquirer prompts and functionality
// Makes all of the prompts more easily accessible at once

'use strict'

const initialPrompt = require('./initialPrompt');
const transactionPrompt = require('./purchasePrompt');
const exitPrompt = require('./exitPrompt');

module.exports = Object.assign({}, initialPrompt, transactionPrompt, exitPrompt);
