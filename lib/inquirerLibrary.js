// Source file where we'll require all of the created inquirer prompts and fucntionality
'use strict'

const initialPrompt = require('./initialPrompt');
const transactionPrompt = require('./purchasePrompt');
const exitPrompt = require('./exitPrompt');

module.exports = Object.assign({}, initialPrompt, transactionPrompt, exitPrompt);
