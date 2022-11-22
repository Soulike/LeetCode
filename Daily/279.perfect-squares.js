/*
 * @lc app=leetcode id=279 lang=javascript
 *
 * [279] Perfect Squares
 */

// @lc code=start

/** @type {number[]} */
const memo = [];

/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
    if (memo[n] !== undefined) return memo[n];
    if (Number.isInteger(Math.sqrt(n))) {
        memo[n] = 1;
        return 1;
    }

    let minNum = Infinity;

    for (let i = 1; ; i++) {
        const square = i ** 2;
        if (square < n) {
            minNum = Math.min(minNum, 1 + numSquares(n - square));
        } else {
            break;
        }
    }

    memo[n] = minNum;
    return minNum;
};
// @lc code=end
