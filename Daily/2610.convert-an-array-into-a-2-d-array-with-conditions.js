/*
 * @lc app=leetcode id=2610 lang=javascript
 *
 * [2610] Convert an Array Into a 2D Array With Conditions
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findMatrix = function (nums) {
    /** @type {Map<number, number>} */
    const numToCount = new Map();

    for (const num of nums) {
        numToCount.set(num, (numToCount.get(num) ?? 0) + 1);
    }

    /** @type {number[][]} */
    const matrix = [];

    while (numToCount.size > 0) {
        const row = Array.from(numToCount.keys());
        matrix.push(row);
        for (const num of row) {
            numToCount.set(num, (numToCount.get(num) ?? 0) - 1);
            if (numToCount.get(num) === 0) {
                numToCount.delete(num);
            }
        }
    }

    return matrix;
};
// @lc code=end

findMatrix([1, 3, 4, 1, 2, 3, 1]);
