/*
 * @lc app=leetcode id=1679 lang=javascript
 *
 * [1679] Max Number of K-Sum Pairs
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const maxOperations = function (nums, k) {
    let operationCount = 0;
    /** @type {Map<number, number>} */
    const numToAmount = new Map();
    for (const num of nums) {
        const kMinusLeft = k - num;
        const kMinusLeftAmount = numToAmount.get(kMinusLeft);
        if (kMinusLeftAmount !== undefined && kMinusLeftAmount !== 0) {
            numToAmount.set(kMinusLeft, kMinusLeftAmount - 1);
            operationCount++;
        } else {
            numToAmount.set(num, (numToAmount.get(num) ?? 0) + 1);
        }
    }

    return operationCount;
};
// @lc code=end
