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
- hashOfProductHash (object): nested hash table with product name as keys. Look @ itemPricesHash in 
'itemPrices.js' file
- hashOfProductArray (object): nested hash table w/ product name as keys. Look @ itemPricesArray in 
'itemPrices.js' file
Returns:
- Whether the product has been added in respective data structures (boolean)
*/
let createProductInStore = (productName, productPrice, productQuantity, hashOfProductHash, hashOfProductArray, didProductAlreadyExist) => {
    // Set new product & price in hashProductHash
    setProductInNestedHash(productName, productPrice, productQuantity, hashOfProductHash);
    // Set new product & price in hashProductArray
    //setProductInHashArray(productName, productPrice, productQuantity, hashOfProductArray, didProductAlreadyExist);
};


let setProductInNestedHash = (productName, productPrice, productQuantity, hashOfProductHash) => {
    hashOfProductHash[productName][productQuantity] = productPrice;
    return true;
}

/*
let setProductInHashArray = (productName, productPrice, productQuantity, hashOfProductArray, didProductAlreadyExist) => {
    existingPriceArray = hashOfProductArray[productName];
    newPricePointArray = [productQuantity, productPrice];
    if (didProductAlreadyExist === true) {
    // Replace already existing price point

    } else {
    // Add price point and sort array based on quantity
    existingPriceArray.push(newPricePointArray); // Adds the price point
    }
};
*/

// Also make sure that when the product pricing is made it is above the lower quantity's price
// and under the above quantity's price

module.exports = {
    checkIfProductExists,
    createProductInStore,
}
