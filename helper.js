// Helper Functions File 
// Pretty self-explanatory. Contains helpful function that will be re-used throughout the 
// program

// External Packages
const chalk = require('chalk');
const figlet = require('figlet');

// Functions below

// Find User Selection created here because inquirer package functionality is limited to string matching. Being that some of the strings used here as  
// user choices are a little long, it is better to use this function to figure out which option the user chose instead of having to type it out 
// Input: "B. Change product pricing, you are god."
// Output: "B"
let findUserSelection = (string) => {
    let selectedOptionArray = string.split('.'); // Every selection of each list is going to start with an alphabetic character followed by a "."
    // This helps us find out which option the user selected in order to provide the user the correct output and functionality
    let selectedCharacter = selectedOptionArray[0] // Based on the currrent program, will always be an individual character "A", "B", "C", etc. 
    return selectedCharacter;
};

let calculateTotalPrice = (itemList, hashPrices, arrayPrices) => {
    let total = 0;
    const hashOfPurchasedItems = hashString(itemList); 
    const arrayPurchasedItems = Object.keys(hashOfPurchasedItems); // ie. ['A', 'B', 'C'] ==> Array of items the customer purchased
    try {
        for (let i=0; i<arrayPurchasedItems.length; i++) {
            let currentItem = arrayPurchasedItems[i];
            if (hashPrices.hasOwnProperty(currentItem)) { // Character is present in the set of prices, so we can calculate it
                let purchasedQuantity = hashOfPurchasedItems[currentItem]; // Quantity purchased by current customer
                let arrayOfItemPrices = arrayPrices[currentItem]; // Array of all item prices, individual and volume 
                let i = arrayOfItemPrices.length-1; // Set up i to be length-1 so we can loop through the array of prices from the end
                while (purchasedQuantity > 0) {
                    let currentPriceForVolume = arrayOfItemPrices[i]; // ie. [4, 7.00] --> Means that 4 pieces of this item cost $7.00
                    let currentVolume = currentPriceForVolume[0]; // The volume is always the first element of the array pair
                    let currentPrice = currentPriceForVolume[1]; // The price is the always the second element of the array
                    if (purchasedQuantity >= currentVolume) {
 
                        total += Math.floor(purchasedQuantity/currentVolume) * currentPrice;
                        purchasedQuantity = purchasedQuantity%currentVolume; // We update the purchasedQuantity to the remaining items that couldn't
                        // be counted towards the current volume price
                    }
                    i--; // Will run into problems potentially if i keeps decrementing but the purchased quantity never reaches 0 -- we'd reach an index
                } // array out of range situation 
            } else {
                console.log(chalk.red(`Item ${currentItem} not present in the shop.`)); // Logging to show which of the items that were added are not present in store
            };
        };
        let totalString = reformatPrice(total);
        console.log(chalk.green(`\n Total of purchased items is $ ${totalString} \n`));
        return total;
    } catch(error) {
        console.log('Calculate total price function encountered error.')
    }
}

// TOENSURE: when adding, creating item prices for items, if you are going to add a volume price to an item, we need to make sure that there is an individual
// price already, because we'd run into a lot of problems if there's not (infinite loop situation)

// Takes a string of characters and creates a hash table with the character as the key and the count of each character in
// the string as the value
// Input: "AAB" 
// Output: {'A': 2, 'B': 1}
let hashString = (stringCharacters) => {
    let hash = {};
    for (let i=0; i<stringCharacters.length; i++) {
        let currentCharacter = stringCharacters[i].toUpperCase();
        if (hash.hasOwnProperty(currentCharacter)) {
            hash[currentCharacter] += 1;
        } else {
            hash[currentCharacter] = 1;
        };
    };
    return hash;
};

let boom = () => {
    console.log(
        chalk.yellow.bold(
          figlet.textSync('BOOM', { horizontalLayout: 'full' })
        )
    );
};

// Function reformats the calculated total so that it looks like a store price
// Input: price: integer --> output: string
// Ie. Input: 6 --> 6.00, 12.4 --> 12.40, 8.90 --> 8.90
// TOENSURE: maybe move the $ sign in this area 
let reformatPrice = (price) => {
    let priceArray = price.toString().split('.');
    // TODELETE: console.log(`Price array ${priceArray} \n`);
    let finalPrice = '';
    if (priceArray.length === 1) { // If price is an integer. Ie. 6
        finalPrice += priceArray[0] + '.00';
        return finalPrice; 
    } else if (priceArray.length == 2) {
        let numBeforeDecimal = priceArray[0];
        let numAfterDecimal = priceArray[1];

        if (numAfterDecimal.length == 1) {
            numAfterDecimal += '0' // ie. 2.4 => 4 => 40 so that we have '2.40' in the end
            finalPrice = numBeforeDecimal + '.' + numAfterDecimal;
            return finalPrice;
        } else if (numAfterDecimal.length > 1) {
            numAfterDecimal = numAfterDecimal.slice(0,2); // Shave off the extra digits in case there are some
            finalPrice = numBeforeDecimal + '.' + numAfterDecimal;
            return finalPrice; // TOENSURE: do we round up, round down or no?
        }
    }
};

// Function checks if the user's inputted product already exists in the store's database
// Input: productName: string, productHash: object
// Output: boolean
// ie.
// Input: productName = 'A', productHash = {A: {...}, B:{...}, C:{...}}
// Output: true
let checkIfProductExists = (productName, productHash) => {
    if (productHash.hasOwnProperty(productName)) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    findUserSelection,
    calculateTotalPrice,
    boom,
    checkIfProductExists
}
