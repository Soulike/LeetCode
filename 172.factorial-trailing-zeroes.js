/*
 * @lc app=leetcode id=172 lang=javascript
 *
 * [172] Factorial Trailing Zeroes
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function (n)
{
    let result = 0;
    let divisor = 5;
    while (divisor <= n)
    {
        result += Math.floor(n / divisor);
        divisor *= 5;
    }
    return result;
};
// @lc code=end

trailingZeroes(5960)