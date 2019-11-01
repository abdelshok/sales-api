// Test cases for utility functions located in the checkoutHelper library file

const { hashString, reformatPrice, calculateTotalPrice} = require('../utilityLibrary/checkoutHelper');
let { hashOfProductArray, hashOfProductHash } = require('./testItemPrices');

describe('Set of tests related to functions used during the checkout process', () => {

    /*
    Tests for hashString function which takes a user inputted string "AAB" and outputs a hash table of the
    form {"A": 2, "B": 1} in order to allow us to later on calculate the total of the client's items
    */

    test('Hash empty string "" into an empty hash table {}', () => {
        let emptyItemListString = ""
        expect(hashString(emptyItemListString)).toStrictEqual({});
    });
    
    test('Hash one character string "A" into an hash table {A: 1}', () => {
        let itemListString = "A"
        expect(hashString(itemListString)).toStrictEqual({A: 1});
    });
    
    test('Hash string "ABBC" into hash table {A: 1, B: 2, C: 1}', () => {
        let itemListString = "ABBC";
        expect(hashString(itemListString)).toStrictEqual({A: 1, B: 2, C: 1});
    });
    
    
    test('Hash string "AAAAAAABCDZ" into hash table {A: 7, B: 1, C: 1, D: 1, Z: 1}', () => {
        let itemListString = "AAAAAAABCDZ";
        expect(hashString(itemListString)).toStrictEqual({A: 7, B: 1, C: 1, D: 1, Z: 1});
    });
    
    
    /*
    Tests for reformatPrice function which reformats the total price outputted into a string that looks like the one
    one receives in a store. Ie. If total price is 32, then this reformats it to "32.00", if total price is 0 then it
    reformats to "0.00"
    */
    
    test('Reformats 0 to "0.00"', () => {
        let price = 0;
        expect(reformatPrice(price)).toEqual("0.00");
    });
    
    test('Reformats 1 to "1.00"', () => {
        let price = 1;
        expect(reformatPrice(price)).toEqual("1.00");
    });
    
    test('Reformats 15 to "15.00"', () => {
        let price = 15;
        expect(reformatPrice(price)).toEqual("15.00");
    });
    
    test('Reformats 0.1 to "0.10"', () => {
        let price = 0.1;
        expect(reformatPrice(price)).toEqual("0.10");
    });
    
    test('Reformats 1.5 to "1.50"', () => {
        let price = 1.5;
        expect(reformatPrice(price)).toEqual("1.50");
    });
    
    test('Reformats 33.3 to "33.30"', () => {
        let price = 33.3;
        expect(reformatPrice(price)).toEqual("33.30");
    });
    
    test('Reformats 1.25 to "1.25"', () => {
        let price = 1.25;
        expect(reformatPrice(price)).toEqual("1.25");
    });
    
    test('Reformats and slices 0.244444 to "0.24"', () => {
        let price = 0.244444;
        expect(reformatPrice(price)).toEqual("0.24");
    });
    
    test('Reformats and slices 100.855555 to "100.85"', () => {
        let price = 100.855555;
        expect(reformatPrice(price)).toEqual("100.85");
    });
    
    test('Reformats and slices 9999.83425 to "9999.83"', () => {
        let price = 9999.83425;
        expect(reformatPrice(price)).toEqual("9999.83");
    });
    
    /*
    Tests for calculateTotalPrice function which calculates the total price of the client's item list (which is a 
    string of characters each representing a product, ie. "ABCD"), hash tables containing the product pricing individually
    and per volume and returns the correct total price
    */
    
    test('Total price for empty item list "" is $0.00', () => {
        let emptyItemList = "";
        expect(calculateTotalPrice(emptyItemList, hashOfProductHash, hashOfProductArray)).toEqual("0.00");
    });
    
    
    test('Total price for item list "A" is $2.00', () => {
        let itemList = "A";
        expect(calculateTotalPrice(itemList, hashOfProductHash, hashOfProductArray)).toEqual("2.00");
    });
    
    
    test('Total price for item list "ABCD" is $15.40', () => {
        let itemList = "ABCD";
        expect(calculateTotalPrice(itemList, hashOfProductHash, hashOfProductArray)).toEqual("15.40");
    });
    
    
    test('Total price for item list "CCCCCCC" is $7.25', () => {
        let itemList = "CCCCCCC";
        expect(calculateTotalPrice(itemList, hashOfProductHash, hashOfProductArray)).toEqual("7.25");
    });
    
    
    
    test('Total price for item list "ABCDABAA" is $32.40', () => {
        let itemList = "ABCDABAA";
        expect(calculateTotalPrice(itemList, hashOfProductHash, hashOfProductArray)).toEqual("32.40");
    });
    
    
})
