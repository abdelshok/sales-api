/*
Object which holds a list of existing items in the store, their unit price, and their volume prices
Same as main '../itemPrices' file but copied here so that all the tests are done on these data structures
and don't affect what's going on on the main application
*/

let hashOfProductArray = {
    'A':[[1, 2.00], [2, 4.00], [4, 7.00]], // First integer of each subarray is the quantity for that price
    'B':[[1, 12.00]], // Second integer in each subarray is the price for that quantity 
    'C':[[1, 1.25], [6, 6.00]], // Ie. In the second sub-array, 6 items can be bought for $6.00
    'D':[[1, 0.15]] // Here, one item can be bought for $0.15
};

// Hash table created here so that if the user decides to set a new volume price, we can quickly check
// if the item exists or not already, replace it if so, or simply create it if it doesn't exist yet
let hashOfProductHash = {
    'A': {
        1: 2.00,
        2: 4.00,
        4: 7.00,
    },
    'B': {
        1: 12.00,
    },
    'C': {
        1: 1.25,
        6: 6.00
    },
    'D': {
        1: 0.15
    }
}

module.exports = {
    hashOfProductArray,
    hashOfProductHash,
}
