// Test cases for utility functions located in the generalHelper library file 

const { stringifyQuantityPrice, formatProductPrices, findUserSelection, findAllProducts} = require('../utilityLibrary/generalHelper');
let { hashOfProductHash } = require('./testItemPrices');

describe('Set of tests related to functions used during the checkout process', () => {


    /*
    Tests for findUserSelection function which theoretically takes a string representing a user's selection within the CLI
    such as "A. Buy a selection of items" and returns the leading marker representing the selection, such as "A"
    */

    test('Returns user selection "A" if user chose option "A. Buy a selection of items"', () => {
        let userSelectionString = "A. Buy a selection of items"
        expect(findUserSelection(userSelectionString, false)).toEqual("A");
    });

    test('Returns array of user selection ["A", "Buy a selection of items"] if user chose option "A. Buy a selection of items"', () => {
        let userSelectionString = "A. Buy a selection of items"
        expect(findUserSelection(userSelectionString, true)).toStrictEqual(["A", "Buy a selection of items"]);
    });

    test('Returns user selection "B" if user chose option "B. Create products or update existing product pricing"', () => {
        let userSelectionString = "B. Create products or update existing product pricing"
        expect(findUserSelection(userSelectionString, false)).toEqual("B");
    });


    test('Returns array of user selection ["B", "Create products or update existing product pricing"] if user chose option "B. Create products or update existing product pricing"', () => {
        let userSelectionString = "B. Create products or update existing product pricing"
        expect(findUserSelection(userSelectionString, true)).toStrictEqual(["B", "Create products or update existing product pricing"]);
    });

    test('Returns empty string if the user selection string is empty and boolean is set to false', () => {
        let userSelectionString = ""
        expect(findUserSelection(userSelectionString, false)).toEqual("");
    });

    test('Returns empty string if the user selection string is empty and boolean is set to true', () => {
        let userSelectionString = ""
        expect(findUserSelection(userSelectionString, true)).toEqual("");
    });

    test("Returns empty string if the string does not contain an initial marker like 'C' to indicate the user's preference", () => {
        // Test case added but except if someone changes the code, this should never happen in the first place.
        let userSelectionString = "Buy a selection of items"
        expect(findUserSelection(userSelectionString, false)).toEqual("");
    });

    test('Returns empty string if the user selection string is a random sequence of characters', () => {
        let userSelectionString = "aufezahiflbeayale"
        expect(findUserSelection(userSelectionString, true)).toEqual("");
    });

    test('Returns empty string if the single character marker "A" at the beginning of each option does not have a full stop', () => {
        let userSelectionString = "A Buy a selection of items"
        expect(findUserSelection(userSelectionString, true)).toEqual("");
    });


   /*
    Tests for stringifyQuantityPrice function which takes an array representing a product X's different price points (ie. [[1, 2], [2,3]] 
    which means that 1 unit of X is sold for $2 and 2 units sell for $3) and returns a string that explains that in "human language"
    */
   test('Returns empty string if empty array is given', () => {
        // Again, this should never happen because the code is set up so that if a product key such as "A" exists in both hash tables, it must
        // have at least one price point. But we'll test it out anyways.
        let pricePointArray = [];
        expect(stringifyQuantityPrice(pricePointArray)).toEqual("");
    });

    test('Returns "1 for $5.00\n" if array [1, 5] is given', () => {
        let pricePointArray = [[1, 5]];
        expect(stringifyQuantityPrice(pricePointArray)).toEqual("1 for $5.00\n");
    });


    test('Returns "1 for $5.00, 2 for $100.00\n" if array [1, 5] is given', () => {
        let pricePointArray = [[1, 5], [2, 100]];
        expect(stringifyQuantityPrice(pricePointArray)).toEqual("1 for $5.00, 2 for $100.00\n");
    });


    test('Returns "1 for $5.00, 2 for $100.00, 3 for $145.50\n" if array [1, 5] is given', () => {
        let pricePointArray = [[1, 5], [2, 100], [3, 145.50]];
        expect(stringifyQuantityPrice(pricePointArray)).toEqual("1 for $5.00, 2 for $100.00, 3 for $145.50\n");
    });


    /*
    Tests for formatProductPrices function which uses the stringifyQuantityPrice above to output a string containing
    all product names and different price points
    */

    test('Returns empty item list string if empty hash table', () => {
        let hashOfProduct = {};
        expect(formatProductPrices(hashOfProduct)).toStrictEqual("");
    });

    test('Returns "A: 1 for $1.00\nB: 2 for $2.00\n" if hash table is { A:[1,1], B: [2,2] }', () => {
        let hashOfProduct = { 
            A: [[1,1]],
            B: [[2,2]] 
        }
        expect(formatProductPrices(hashOfProduct)).toStrictEqual("A: 1 for $1.00\nB: 2 for $2.00\n");
    });

    test('Returns "A: 1 for $1.00, 2 for $3.00\nB: 2 for $2.00\n" if hash table is { A:[1,1], B: [2,2] }', () => {
        let hashOfProduct = { 
            A: [[1,1], [2,3]], 
            B: [[2,2]] 
        }
        expect(formatProductPrices(hashOfProduct)).toStrictEqual("A: 1 for $1.00, 2 for $3.00\nB: 2 for $2.00\n");
    });


    
});
