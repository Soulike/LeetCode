/*
 * @lc app=leetcode id=338 lang=javascript
 *
 * [338] Counting Bits
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
    /** @type {number[]} */
    let bitCounts = new Array(n + 1);
    for (let i = n; i >= 0; i--) {
        bitCounts[i] = getBitCount(i);
    }
    return bitCounts;
};

/** @type {number[]} */
const memo = [];

/**
 * @param {number} num
 * @returns {number}
 */
function getBitCount(num) {
    if (num === 0) return 0;
    if (memo[num] !== undefined) return memo[num];
    let bitCount = 0;
    if ((num & 0b1) === 0b1) {
        bitCount++;
    }
    bitCount += getBitCount(Math.floor(num / 2));
    memo[num] = bitCount;
    return bitCount;
}
// @lc code=end
