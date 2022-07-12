/*
 * @lc app=leetcode id=1518 lang=javascript
 *
 * [1518] Water Bottles
 */

// @lc code=start
/**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
var numWaterBottles = function (numBottles, numExchange) {
    let currentEmptyBottleNum = numBottles;
    let drunkBottleNum = numBottles;

    while (currentEmptyBottleNum >= numExchange) {
        const exchangedBottleNum = Math.floor(
            currentEmptyBottleNum / numExchange,
        );
        drunkBottleNum += exchangedBottleNum;

        currentEmptyBottleNum =
            exchangedBottleNum + (currentEmptyBottleNum % numExchange);
    }

    return drunkBottleNum;
};
// @lc code=end
