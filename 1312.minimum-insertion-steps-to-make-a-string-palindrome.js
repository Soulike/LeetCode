/*
 * @lc app=leetcode id=1312 lang=javascript
 *
 * [1312] Minimum Insertion Steps to Make a String Palindrome
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var minInsertions = function (s)
{
    /**
     * dp[i][j] 要使得 [i,j] 范围内的字符串成为回文，需要插入多少次
     * 
     * base case
     * dp[i][i] = 0
     * 
     * dp[i][j] ,i!==j
     * if s[i]===s[j]
     *  dp[i][j] = j===i+1? 0 : dp[i+1][j-1]
     * else
     *  dp[i][j] = min(
     * dp[i+1][j], // 把左边的插入到 j+1
     * dp[i][j-1])  // 把右边的插入到 i-1
     */

    const n = s.length;
    const dp = new Array(n);
    for (let i = 0; i < n; i++)
    {
        dp[i] = new Array(n);
        dp[i][i] = 0;
    }

    for (let i = n - 2; i >= 0; i--)
    {
        for (let j = i + 1; j < n; j++)
        {
            if (s[i] === s[j])
            {
                dp[i][j] = j === i + 1 ? 0 : dp[i + 1][j - 1];
            }
            else
            {
                dp[i][j] = 1 + Math.min(
                    dp[i + 1][j], // 把左边的插入到 j+1
                    dp[i][j - 1]);  // 把右边的插入到 i-1
            }
        }
    }

    return dp[0][n - 1];
};
// @lc code=end