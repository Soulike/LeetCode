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
var longestCommonSubsequence = function (text1, text2) {
    /**
     * dp[i][j]: The LCS between text1[0~i-1] and text2[0~j-1]
     *
     * base case
     * dp[0][j] = 0
     * dp[i][0] = 0
     *
     * if text[i-1] !== text[j-1]
     *  dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
     * else
     *  dp[i][j] = dp[i-1][j-1] + 1
     */

    const dp = new Array(2);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(text2.length + 1);
        dp[i][0] = 0;
    }
    dp[0].fill(0);

    for (let i = 1; i <= text1.length; i++) {
        for (let j = 1; j <= text2.length; j++) {
            if (text1[i - 1] !== text2[j - 1]) {
                // dp[i-1][j-1] is not possible to be larger
                dp[i % 2][j] = Math.max(dp[(i - 1) % 2][j], dp[i % 2][j - 1]);
            } else {
                dp[i % 2][j] = dp[(i - 1) % 2][j - 1] + 1;
            }
        }
    }

    return dp[text1.length % 2][text2.length];
};
// @lc code=end
