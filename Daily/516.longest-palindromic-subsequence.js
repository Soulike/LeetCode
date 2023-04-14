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
    const N = s.length;
    /** @type {number[][]} */
    const dp = new Array(N);
    for (let i = 0; i < N; i++) {
        dp[i] = new Array(N);
        dp[i][i] = 1;

        if (i !== N - 1) {
            dp[i][i + 1] = s[i] === s[i + 1] ? 2 : 1;
        }
    }

    for (let i = N - 1; i >= 0; i--) {
        for (let j = i + 2; j < N; j++) {
            dp[i][j] =
                s[i] === s[j]
                    ? dp[i + 1][j - 1] + 2
                    : Math.max(dp[i + 1][j], dp[i][j - 1]);
        }
    }

    return dp[0][N - 1];
};
// @lc code=end

longestPalindromeSubseq('cbbd');
