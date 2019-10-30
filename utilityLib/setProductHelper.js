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
let checkIfProductExists = (productName, productHash) => {
    if (productHash.hasOwnProperty(productName)) {
        return true;
    } else {
        return false;
    }
}


module.exports = {
    checkIfProductExists,
}
