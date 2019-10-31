// Index.js file holds the main program

// External Packages
const clear = require('clear');
const figlet = require('figlet');
// Internal modules
const inquirerLibrary = require('./inquirerLibrary/inquirerLibrary');
const { major } = require('./chalk');

clear(); // Clears out the CL

console.log(
  major(figlet.textSync('Sales API', { horizontalLayout: 'full' }))
);

const run = async () => {
  await inquirerLibrary.initialPrompt(); 
};

run();
