// General Helper functions used throughout the application

// Internal Modules
const { neutral } = require('../chalk');
const figlet = require('figlet');
const { reformatPrice } = require('./checkoutHelper');

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
Function: formatProductPrices
Retrieves all of the products and their prices and formats it so that the user/client can see them 
Parameters:
- hashOfProductArray (object): with product name as the key and value a multi-dimensional array containing quantity/price pairs
Returns:
- productListString (string) 
*/
let formatProductPrices = (hashOfProductArray)  => {
    const productsAvailableArray = Object.keys(hashOfProductArray).sort(); 
    // console.log(`Products available array: ${productsAvailableArray}`);
    let finalString = '';
    for (let i=0; i<productsAvailableArray.length; i++) {
        let productName = productsAvailableArray[i];
        let pricePointsArray = hashOfProductArray[productName];
        // console.log(`Price points array: ${pricePointsArray}`);
        let pricePointStrings = stringifyQuantityPrice(pricePointsArray);
        finalString += productName + ': ' + pricePointStrings;
    }
    return finalString;
}


/*
Function: stringifyQuantityPrice
Takes a quantity/price point and turns into a string "X for $Y"
Parameters:
- priceQuantityArray (obect array)
- lastElement (boolean): determines whether the element passed is the last, so we add a newline at the end
Returns:
- finalPriceString (string)
*/
let stringifyQuantityPrice = (pricePointsArray) => {
    let finalPriceString = '';
    for (let i=0; i<pricePointsArray.length; i++) {
        const currentPricePointArray = pricePointsArray[i];
        const quantity = currentPricePointArray[0];
        const price = currentPricePointArray[1];
        const quantityString = quantity.toString();
        const priceString = reformatPrice(price);
        let lastElement = i == pricePointsArray.length-1 ? true : false; // If we're at the last index of array, set to true
        if (lastElement == false) {
            const priceSubString = quantityString + ' for $' + priceString + ', '; 
            finalPriceString += priceSubString;
        } else {
            const priceSubString = quantityString + ' for $' + priceString + '\n'; 
            finalPriceString += priceSubString;
        }
    }
    return finalPriceString;
}

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

/*
Function: findAllProducts
Finds all of the products available in the store (products are named as single characters for now)
Parameters:
- hashOfProducts (object): hash table with all of the product names as keys
Returns:
- productArray (object array)
*/
let findAllProducts = (hashOfProducts) => {
    let productArray = Object.keys(hashOfProducts);
    return productArray;
}

module.exports = {
    boom, 
    findUserSelection,
    findAllProducts,
    formatProductPrices,
}
