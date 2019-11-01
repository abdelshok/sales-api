// Test cases for utility functions located in the setProductHelper library file 

const { checkIfProductExists, findIfPriceQuantityExists, sortArray } = require("../utilityLibrary/setProductHelper");
let { hashOfProductHash, hashOfProductArray } = require('./testItemPrices');


describe('Set of tests related to functions used during the set price / create new product feature', () => {

    /*
    Tests for checkIfProductExists function which simply checks if a product exists in the store. Returns a boolean
    */
    test('Check if "A" exists in the store product selection shown by the given hash table', () => {
        let productName = "A"
        expect(checkIfProductExists(productName, hashOfProductHash)).toBe(true);
    });

    test('Check that "Z" does not exist in the store product selection shown by the given hash table', () => {
        let productName = "Z"
        expect(checkIfProductExists(productName, hashOfProductHash)).toBe(false);
    });

    /*
    Tests findIfPriceQuantityExists function which checks if a price point exists for a given quantity
    */
    test('Check if item "A" has a price point for quantity 1', () => {
        let productName = "A";
        let productQuantity = 1;
        expect(findIfPriceQuantityExists(productName, productQuantity, hashOfProductHash)).toBe(true);
    });

    test('Check if item "A" does not have a price point for volume quantity 100', () => {
        let productName = "A";
        let productQuantity = 1;
        expect(findIfPriceQuantityExists(productName, productQuantity, hashOfProductHash)).toBe(true);
    });



    /*
    Tests sortArray function which sorts the multi-dimensional array of price/quantity points of each product
    in terms of quantity
    */
    test('Check if empty array returns empty array', () => {
        let arrayOfPricePoints = [];
        expect(sortArray(arrayOfPricePoints)).toStrictEqual([]);
    });

    test('Check if array of price points [[1, 4]] returns [[1, 4]]', () => {
        let arrayOfPricePoints = [[1, 4]];
        expect(sortArray(arrayOfPricePoints)).toStrictEqual([[1, 4]]);
    });

    test('Check if array of price points [[100, 400], [2, 6], [1, 4]] returns [[1, 4], [2, 6], [100, 400]]', () => {
        let arrayOfPricePoints = [[100, 400], [2, 6], [1, 4]];
        expect(sortArray(arrayOfPricePoints)).toStrictEqual([[1, 4], [2, 6], [100, 400]]);
    });

});
