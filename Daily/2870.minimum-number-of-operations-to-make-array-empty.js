/*
 * @lc app=leetcode id=2870 lang=javascript
 *
 * [2870] Minimum Number of Operations to Make Array Empty
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
    /** @type {Map<number, number>} */
    const numCounts = new Map();

    for (const num of nums) {
        numCounts.set(num, (numCounts.get(num) ?? 0) + 1);
    }

    let operationCount = 0;
    for (const [_, numCount] of numCounts) {
        if (numCount === 1) return -1;
        else operationCount += Math.ceil(numCount / 3);
    }

    return operationCount;
};
// @lc code=end
