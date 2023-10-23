/*
 * @lc app=leetcode id=342 lang=javascript
 *
 * [342] Power of Four
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function (n) {
    return (
        n > 0 && // positive
        (n & (n - 1)) === 0 && // only one bit of 1
        (n - 1) % 3 === 0
    ); // n is power of 4 but not the power of 2
};
// @lc code=end
