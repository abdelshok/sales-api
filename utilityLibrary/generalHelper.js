// General Helper functions used throughout the application

// Internal Modules
const { neutral } = require('../chalk');
const figlet = require('figlet');

/*
Function: findUserSelection
Reformats the user's choice in the 'inquirer' given list to figure out which option the user selected
Parameter:
- string (string): ie. 'A. Buy a selection of A, B, C, and Ds'
- returnAll (boolean): determines whether the function should return the selection 'A' only or the selection
'A' and the text accompanying it (helpful in testPreselectedPrompt)
Returns:
- user's selection (string): ie. 'A'
*/
let findUserSelection = (string, returnAll) => {
    const selectedOptionArray = string.split('.'); // Every selection of each list is going to start with an alphabetic character followed by a "."
    if (returnAll == true) {
        selectedOptionArray[1] = selectedOptionArray[1].trim(); // Shaves off the unecessary white space at the beginning
        return selectedOptionArray;
    } else {
        // This helps us find out which option the user selected in order to provide the user the correct output and functionality
        let selectedCharacter = selectedOptionArray[0] // Based on the currrent program, will always be an individual character "A", "B", "C", etc. 
        return selectedCharacter;
    }
};


/*
Function: boom
Types out 'BOOM' on the terminal. Created to test out styling and CLI exiting.
No parameters, returns nothing.
*/
let boom = () => {
    console.log(
        neutral(figlet.textSync('BOOM', { horizontalLayout: 'full' }))
    );
};

module.exports = {
    boom, 
    findUserSelection,
}
