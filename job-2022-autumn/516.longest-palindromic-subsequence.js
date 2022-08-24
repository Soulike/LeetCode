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
var longestPalindromeSubseq = function (s) {
    const n = s.length;
    /**
     * dp[i][j] s[i] 到 s[j] 范围中的最长回文子序列长度
     *
     * base case
     * dp[i][j] = 1
     *
     * dp[i][j] = s[i] === s[j] ? dp[i+1][j-1] + 2 : Math.max(dp[i+1][j], dp[i][j-1])
     */
    /** @type {number[][]} */
    const dp = new Array(n);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(n);
        dp[i].fill(1);
    }

    for (let i = n - 1; i >= 0; i--) {
        for (let j = i + 1; j < n; j++) {
            if (s[i] === s[j]) {
                if (j > i + 1) {
                    dp[i][j] = dp[i + 1][j - 1] + 2;
                } // j === i+1
                else {
                    dp[i][j] = 2;
                }
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[0][n - 1];
};
// @lc code=end
