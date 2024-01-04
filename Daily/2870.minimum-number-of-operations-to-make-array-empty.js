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
    for (const num of numCounts.keys()) {
        const numCount = numCounts.get(num) ?? 0;
        if (numCount === 1) return -1;
        else if (numCount === 2 || numCount === 3) operationCount++;
        else if (numCount === 4) operationCount += 2;
        else operationCount += Math.ceil(numCount / 3);
    }

    return operationCount;
};
// @lc code=end
