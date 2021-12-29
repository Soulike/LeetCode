/*
 * @lc app=leetcode id=516 lang=javascript
 *
 * [516] Longest Palindromic Subsequence
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
const longestPalindromeSubseq = function (s)
{
    /** dp[i][j] 字符串从 i 到 j 中最长回文子序列的长度 */
    const dp = new Array(s.length);
    for (let i = 0; i < s.length; i++)
    {
        dp[i] = [];
        dp[i][i] = 1;
    }

    /**
     * dp[i][i] = 1;
     * dp[i][i+1] = s[i] === s[i+1] ? 2 : 1
     * dp[i][j] = max(
     *      dp[i+1][j-1] + (s[i]===s[j]?2:0),
     *      dp[i][j-1],
     *      dp[i+1][j])
     */

    let maxLen = 1;
    for (let i = s.length - 1; i >= 0; i--)
    {
        for (let j = i + 1; j < s.length; j++)
        {
            if (i + 1 !== j)
            {
                dp[i][j] = Math.max(
                    dp[i + 1][j - 1] + (s[i] === s[j] ? 2 : 0),
                    dp[i][j - 1],
                    dp[i + 1][j]);
            }
            else
            {
                // 注意任意区间最少也有长度为 1 的回文
                dp[i][j] = s[i] === s[j] ? 2 : 1;
            }
            maxLen = Math.max(dp[i][j], maxLen);
        }
    }

    return maxLen;
};
// @lc code=end