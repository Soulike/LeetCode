/*
 * @lc app=leetcode id=1143 lang=javascript
 *
 * [1143] Longest Common Subsequence
 */

// @lc code=start
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
const longestCommonSubsequence = function (text1, text2)
{
    /** dp[i][j] text1[0...i-1] 和 text2[0...j-1] 的最长公共子序列长度，注意，不包含 i 和 j */
    const dp = new Array(text1.length+1);
    for (let i = 0; i < text1.length+1; i++)
    {
        dp[i] = new Array(text2.length+1);
        // 处理空串情况
        if (i === 0)
        {
            dp[i].fill(0);
        }
        dp[i][0] = 0;
    }

    /**
     * 当 text1[i-1] === text2[j-1] 时，找到了 lcs 的其中一个字符
     * dp[i][j] = dp[i-1][j-1]+1
     * 当 text1[i] !== text2[j] 时，看看双方哪边 lcs 更长
     * dp[i][j] = max(dp[i-1][j], dp[i][j-1])
     */
    for (let i = 1; i <= text1.length; i++)
    {
        for (let j = 1; j <= text2.length; j++)
        {
            if (text1[i-1] === text2[j-1])
            {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            }
            else
            {
                dp[i][j] = Math.max(
                    dp[i - 1][j],
                    dp[i][j - 1]);
            }
        }
    }

    return dp[text1.length][text2.length];
};
// @lc code=end