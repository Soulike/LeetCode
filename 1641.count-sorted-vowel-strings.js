/*
 * @lc app=leetcode id=1641 lang=javascript
 *
 * [1641] Count Sorted Vowel Strings
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var countVowelStrings = function (n)
{
    /**
     * a e i o u 对应 0 1 2 3 4
     * dp[i][j] 以 i 开头，还剩下 j 个位置，有多少个合法字符串
     * 
     * base case
     * dp[i][1] = 1
     * 
     * dp[i][j] = sum(k from i to 4 dp[k][j-1])
     */
    const dp = new Array(5);
    for (let i = 0; i <= 4; i++)
    {
        dp[i] = new Array(n + 1);
        dp[i][1] = 1;
    }

    for (let i = 4; i >= 0; i--)
    {
        for (let j = 2; j <= n; j++)
        {
            dp[i][j] = 0;
            for (let k = i; k <= 4; k++)
            {
                dp[i][j] += dp[k][j - 1];
            }
        }
    }

    let result = 0;
    for (let i = 0; i <= 4; i++)
    {
        result += dp[i][n];
    }

    return result;
};
// @lc code=end