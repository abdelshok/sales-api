// Helper Functions for creating product & setting price-related features

/*
Function: checkIfProductExists
Checks if a product already exists in the store's existing selection
Parameters:
- productName (string): single character string, ie. 'A'
- productHash (object): hash table with product name as key and price points as value. ie. {'A': {...}, 'B': {...}}
Returns:
- If the product is in store (boolean)
*/
let checkIfProductExists = (productName, hashOfProductHash) => {
    if (hashOfProductHash.hasOwnProperty(productName)) {
        return true;
    } else {
        return false;
    }
}

/*
Function: createProductInStore
Takes the product name, price, and quantity that the client wants to change/add and sets them in the 
respective hash tables
Parameters:
- productName (string): ie. 'A'
- productPrice (integer): ie. 7
- productQuantity (integer): ie. 3 
- hashOfProductHash (object): nested hash table with product name as keys. Look @ hashOfProductHash in 
'itemPrices.js' file
- hashOfProductArray (object): nested hash table w/ product name as keys. Look @ hashOfProductArray in 
'itemPrices.js' file
Returns:
- Whether the product has been added in respective data structures (boolean)
*/
let createProductInStore = (productName, productPrice, productQuantity, hashOfProductHash, hashOfProductArray, didProductAlreadyExist) => {
    // Set new product & price in hashProductArray
    setProductInHashArray(productName, productPrice, productQuantity, hashOfProductArray, hashOfProductHash, didProductAlreadyExist);
    // Set new product & price in hashProductHash
    setProductInNestedHash(productName, productPrice, productQuantity, hashOfProductHash);
};


/*
Function: setProductInNestHash
Sets the individiaul or volume price of the newly created/already existing product to what the user decided
Parameters:
- productName (string)
- productPrice (integer or floating point)
- productQuantity (integer)
- hashOfProductHash (object): look at hashOfProductHash in '../itemPrices' file
Returns:
- Confirmation of change (boolean)
*/
let setProductInNestedHash = (productName, productPrice, productQuantity, hashOfProductHash) => {
    if (hashOfProductHash.hasOwnProperty(productName)) {
        hashOfProductHash[productName][productQuantity] = productPrice;
    } else {
        // Check to see if current product selection is in the store & set product prices in hash table 
        hashOfProductHash[productName] = {};
        hashOfProductHash[productName][productQuantity] = productPrice
    }
}

/*
Function: setProductInHashArray
Updates or sets the new price point for the product in the hash table containing key and array pairs
Ensures that the subarrays are sorted by quantity so that we can always output the correct total price 
Parameters:
- productName (string)
- productPrice (int or floating point)
- productQuantity (integer)
- hashOfProductArray, hashOfProductHash (object)
- didProductAlreadyExist (boolean)
Returns:
- Nothing. Reformats and updates the data structure.
*/
let setProductInHashArray = (productName, productPrice, productQuantity, hashOfProductArray, hashOfProductHash, didProductAlreadyExist) => {
    existingPriceArray = hashOfProductArray[productName];
    newPricePointArray = [productQuantity, productPrice];
    if (didProductAlreadyExist === true) {
        // Add or replace price point to already-existing product
        // console.log('Product already exists therefore we can run the setPrice function');
        setPriceForExistingProduct(productName, productPrice, productQuantity, hashOfProductHash, hashOfProductArray, existingPriceArray, newPricePointArray);
    } else {
        // Product didn't exist so simply create key and array pair
        // console.log("It seems like product doesn't exist");
        hashOfProductArray[productName] = [newPricePointArray]; 
    }
}


/*
Function: setPriceForExistingProduct
Adds or updates the new quantity/price point in the array containing all of the price points of the given product
Also ensures to sort the price points so that they show in increasing order of quantity
ie. if product 'A' already exists with price points [1,2] (1 for $2.00) and [6, 6] (6 for $6.00) and we're trying to add
a price point [2, 3] (2 for $3.00), then this function adds it to the array and ensures that it is sorted so that it becomes
[[1,2], [2,3], [6,6]] instead of being unsorted as: [[1,2], [6,6], 2,3]].
Why:
- This ensures that we always return the correct total price if an item has multiple volume prices
Parameters:
- productName (string)
- productPrice (int or floating point)
- productQuantity (int)
- hashOfProductHash, hashOfProductArray (object)
- existingPriceArray, newPricePointArray (array object)
Returns:
- Confirmation that product has been updated correctly (boolean)
*/
let setPriceForExistingProduct = (productName, productPrice, productQuantity, hashOfProductHash, hashOfProductArray, existingPriceArray, newPricePointArray) => {
    let quantityPointExists = findIfPriceQuantityExists(productName, productQuantity, hashOfProductHash);
    // console.log(`Does quantity point ${productQuantity} for item ${productName} exist:  ${quantityPointExists}`);
    if (quantityPointExists) { // Then we simply loop through the array and replace the correct quantity w/ the updated price
        for (let i=0; i<existingPriceArray.length; i++) {
            let currentPricePointArray = existingPriceArray[i];
            let currentQuantity = currentPricePointArray[0]
            if (currentQuantity == productQuantity) { // When right volume quantity is found, replace price w/ new one
                currentPricePointArray[1] = productPrice;
            }
        }
        sortArray(existingPriceArray); // Sorts subarray by quantity volume to ensure that price points show up in an increasing order of quantity
    } else {
        existingPriceArray.push(newPricePointArray); // Quantity point doesn't exist for this product so we simply push it into the array
        sortArray(existingPriceArray); // and sort it to have them show in increasing order of quantity
    }
}


/*
Function: findIfPriceQuantityExists
We already confirmed that the product already exists in the store, so now we only need to confirm
whether the hash table of the product itself contains the quantity point or not / already has  
a price for this quantity
Parameters:
- productName (string)
- productQuantity (integer)
- hashOfProductHash (object): look at 'hashOfProductHash' object in '../itemPrices'
Returns:
- Whether the quantity point exists for that specific product (boolean) 
*/
let findIfPriceQuantityExists = (productName, productQuantity, hashOfProductHash) => {

    if (hashOfProductHash[productName].hasOwnProperty(productQuantity) == true) {
        return true;
    } else {
        return false;
    }
}


/*
Function: sortArray
Multi-dimensional sorting
- Makes sure to sort the array of price points per volume by quantity. In the examples below, one
can see that it makes sure that the price point for 2 items is sorted to come before the price 
point for 4 items
Parameters: 
- array (array object). ie. [[1, 1.50], [4, 4], [2, 2.50]]
Returns:
- Nothing (boolean?). ie. [[1, 1.50], [2, 2.50], [4, 4]]
*/
let sortArray = (array) => {
    array.sort(function(a, b)
    {
        return a[0] - b[0];
    });
}

module.exports = {
    checkIfProductExists,
    createProductInStore,
}
