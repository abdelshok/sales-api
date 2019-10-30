// Index.js file holds the main program

// External Packages
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const helper = require('./helper');
// Internal modules
const inquirerLibrary = require('./lib/inquirerLibrary');
// Data Pricing
const price = require('./itemPrices');

clear(); // Clears out the CL

console.log(
  chalk.redBright.bold(
    figlet.textSync('Sales API', { horizontalLayout: 'full' })
  )
);

const run = async () => {
  let initialPrompt = await inquirerLibrary.initialPrompt(); // Returns an object with two parameters "WelcomeSelection" and "WelcomeUserPrompt"
};

run();
