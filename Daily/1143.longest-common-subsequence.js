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

    [text1, text2] =
        text1.length < text2.length ? [text1, text2] : [text2, text1];

    const M = text1.length;
    const N = text2.length;

    let prevDp = new Uint16Array(N + 1);
    prevDp.fill(0);

    let dp = new Uint16Array(N + 1);
    dp[0] = 0;

    for (let i = 1; i <= M; i++) {
        for (let j = 1; j <= N; j++) {
            dp[j] =
                text1[i - 1] !== text2[j - 1]
                    ? Math.max(prevDp[j], dp[j - 1]) // dp[i - 1][j - 1] must be less than the two
                    : prevDp[j - 1] + 1;
        }
        [prevDp, dp] = [dp, prevDp];
    }

    return prevDp[N];
};
// @lc code=end

longestCommonSubsequence('c', 'abc');
