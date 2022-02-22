/*
 * @lc app=leetcode id=5 lang=javascript
 *
 * [5] Longest Palindromic Substring
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
const longestPalindrome = function (s) 
{
    /**
     * dp[i][j] s[i] 到 s[j] ，以 j 结尾的最长的回文字串长度
     * 
     * base case
     * dp[i][i] = 1
     * 
     * dp[i][j] = 
     * if dp[i+1][j-1] === 0 || s[i] !== s[j]
     *  dp[i][j] = 0
     * else
     *  dp[i][j] = dp[i+1][j-1]+2
     */

    const n = s.length;
    const dp = new Array(n);
    for (let i = 0; i < n; i++)
    {
        dp[i] = new Array(n);
        dp[i].fill(0);
        dp[i][i] = 1;
    }

    let maxLen = 1;
    let maxLenSubStr = s[0];

    for (let i = n - 2; i >= 0; i--)
    {
        for (let j = i + 1; j < n; j++)
        {
            if (j > i + 1)
            {
                if (dp[i + 1][j - 1] !== 0 && s[i]===s[j])
                {
                    dp[i][j] = dp[i + 1][j - 1] + 2;
                }
            }
            else if (s[i] === s[j])    // j === i+1
            {
                dp[i][j] = 2;
            }

            if (dp[i][j] > maxLen)
            {
                maxLen = dp[i][j];
                maxLenSubStr = s.slice(i, j + 1);
            }
        }
    }

    return maxLenSubStr;
};
// @lc code=end