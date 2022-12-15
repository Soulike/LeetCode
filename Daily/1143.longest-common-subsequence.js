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
     * dp[i][j]
     *
     * the longest common subsequence between text1[0,i-1] and text2[0,j-1]
     *
     * base case
     * dp[0][...] = 0
     * dp[...][0] = 0
     *
     * if text1[i-1] !== text2[j-1]
     *  dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-1], dp[i][j-1])
     * else
     *  dp[i][j] = dp[i-1][j-1]+1
     */

    const M = text1.length;
    const N = text2.length;

    /** @type {number[][]} */
    const dp = new Array(M + 1);
    for (let i = 0; i < M + 1; i++) {
        dp[i] = new Array(N + 1);
        dp[i][0] = 0;
    }

    dp[0].fill(0);

    for (let i = 1; i <= M; i++) {
        for (let j = 1; j <= N; j++) {
            dp[i][j] =
                text1[i - 1] !== text2[j - 1]
                    ? Math.max(dp[i - 1][j], dp[i][j - 1]) // dp[i - 1][j - 1] must be less than the two
                    : dp[i - 1][j - 1] + 1;
        }
    }

    return dp[M][N];
};
// @lc code=end

longestCommonSubsequence('c', 'abc');
