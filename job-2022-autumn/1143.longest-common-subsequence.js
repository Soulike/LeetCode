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
    const m = text1.length;
    const n = text2.length;
    /**
     * dp[i][j] text1[i...] 和 text2[j...] 之间的最长公共子串
     *
     * base case
     * dp[m][...] = 0
     * dp[...][n] = 0
     *
     * if text1[i] === text2[j]
     *   dp[i][j] = dp[i+1][j+1]+1
     * else
     *   dp[i][j] = Math.max(dp[i][j+1], dp[i+1][j], dp[i+1][j+1])
     *
     * 内存压缩
     *
     * base case
     * prevDp[...] = 0
     * dp[n] = 0
     *
     * if text1[i] === text2[j]
     *   dp[j] = prevDp[j+1]+1
     * else
     *   dp[j] = Math.max(dp[j+1], prevDp[j], prevDp[j+1])
     *
     * @type {number[]}
     */
    let prevDp = new Array(n + 1);
    prevDp.fill(0);

    /** @type {number[]} */
    let dp = new Array(n + 1);
    dp[n] = 0;

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (text1[i] === text2[j]) {
                dp[j] = prevDp[j + 1] + 1;
            } else {
                dp[j] = Math.max(dp[j + 1], prevDp[j], prevDp[j + 1]);
            }
        }

        [prevDp, dp] = [dp, prevDp];
    }

    return prevDp[0];
};
// @lc code=end
