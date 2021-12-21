/*
 * @lc app=leetcode id=231 lang=javascript
 *
 * [231] Power of Two
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
const isPowerOfTwo = function (n)
{
    if (n <= 0)
    {
        return false;
    }

    while ((n & 0b1) !== 0b1)
    {
        n = n >>> 1;
    }
    return n === 1;
};
// @lc code=end