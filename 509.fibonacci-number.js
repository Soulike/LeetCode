/*
 * @lc app=leetcode id=509 lang=javascript
 *
 * [509] Fibonacci Number
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
const fib = function (n)
{
    /** [再前一个数，前一个数] */
    const dp = [0, 1];
    if (n <= 1)
    {
        return dp[n];
    }
    else
    {
        for (let i = 2; i <= n; i++)
        {
            [dp[0], dp[1]] = [
                dp[1], dp[0] + dp[1]
            ];
        }
    }
    return dp[1];
};
// @lc code=end

