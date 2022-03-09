/*
 * @lc app=leetcode id=115 lang=javascript
 *
 * [115] Distinct Subsequences
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t)
{
    /**
     * dp[i][j] 
     * s[i:] 和 t[j:] 有多少种生成方式？
     * 
     * base case
     * dp[i][j] = 0 if s.length-i < t.length - j  // s 不够用了
     * dp[i][t.length] = 1  // t 用完了
     * 
     * dp[i][j]
     * 
     * if s[i] === t[j]
     *     dp[i][j] = dp[i+1][j+1] + dp[i+1][j]
     * else
     *     dp[i][j] = dp[i+1][j]
     */

    const dp = new Array(s.length + 1);
    for (let i = 0; i <= s.length; i++)
    {
        dp[i] = new Array(t.length + 1);
        for (let j = 0; j < i - s.length + t.length; j++)
        {
            dp[i][j] = 0;
        }

        if (i === s.length)
        {
            dp[i].fill(0);
        }
        dp[i][t.length] = 1;
    }

    for (let i = s.length - 1; i >= 0; i--)
    {
        for (let j = t.length - 1; j >= 0; j--)
        {
            if (s[i] === t[j])
            {
                dp[i][j] = dp[i + 1][j + 1] + dp[i + 1][j];
            }
            else
            {
                dp[i][j] = dp[i + 1][j];
            }
        }
    }

    return dp[0][0];
};
// @lc code=end

numDistinct('babgbag', 'bag');