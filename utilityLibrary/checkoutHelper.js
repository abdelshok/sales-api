// Helper functions for checkout-related feature

// Internal Modules
const { error } = require('../chalk');

/*
Function: calculateTotalPrice
Returns the total price of the items purchased by the store's client
Parameters:
- itemList (string): ie. 'ABCD'
- hashPrices (object): hash table of the different items in the store, each containing a hash map of their price points
- arrayPrices (object): hash table of the different items, each containing an array of their price points
Returns:
- total price of items (integer)
*/
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
                    i--; // Will run into problems potentially if i keeps decrementing but the purchased quantity always reaches 0 -- we'd reach an index
                } // array out of range situation if it didn't
            } else {
                console.log(error(`Item ${currentItem} not present in the shop.`)); // Logging to show which of the items that were added are not present in store
            };
        };
        let totalString = reformatPrice(total);
        return totalString;
    } catch(error) {
        console.log('Calculate total price function encountered error.')
    }
}

// When adding, creating item prices for items, if you are going to add a volume price to an item, we need to make sure that there is an individual
// price already, because we'd run into a lot of problems if there's not (infinite loop situation)

/*
Function: hashString
Takes a string of characters and creates a hash table with the character as the key and the character's count as the value
Parameters:
- stringCharacters (string): ie. 'AAB'
Returns:
- a hash table of item/count pairs (object): ie. {'A': 2, 'B': 1}
*/
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

/*
Function: reformatPrice
Reformats the calculated total so that it looks like a store price
Parameter:
- price (integer): ie. 6, 13.4
Returns:
- The reformatted price (string): ie. 6.00, 13.40
*/
let reformatPrice = (price) => {
    let priceArray = price.toString().split('.');
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
            return finalPrice; // 
        }
    }
};


module.exports = {
    calculateTotalPrice,
    reformatPrice,
    hashString,
};
