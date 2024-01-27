/*
 * @lc app=leetcode id=629 lang=javascript
 *
 * [629] K Inverse Pairs Array
 */

// @lc code=start
/**
 * Reference: https://leetcode.com/problems/k-inverse-pairs-array/solutions/846076/c-4-solutions-with-picture/
 *
 * `dp[n][k]` - how many arrays with n elements have k inverse pairs
 *
 * base case
 * `dp[0][...] = 0`
 * `dp[...][0] = 1`
 *
 * `dp[n][k] = 0`
 *
 *  `for i from 0 to Math.min(k, n - 1)`
 *      `dp[n][k] += dp[n-1][k-i];`
 *
 * Explanation:
 *  Every time we can choose to put one number `i` as the first number, creating `i` inverse pairs.
 *  Then we need the other `n-1` numbers to create `k-i` inverse pairs.
 *  The range of `i` is `[0, min(k, n-1)]` as we can't choose a number > `n-1` or > `k`
 */
/**
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
var kInversePairs = function (N, K) {
    const dp = new Array(N + 1);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(K + 1);
        dp[i].fill(0);
        dp[i][0] = 1;
    }
    dp[0].fill(0);
    for (let n = 1; n <= N; n++)
        for (let k = 1; k <= K; k++)
            for (let i = 0; i <= Math.min(k, n - 1); i++)
                dp[n][k] = (dp[n][k] + dp[n - 1][k - i]) % 1000000007;
    return dp[N][K];
};
// @lc code=end

kInversePairs(1000, 1000);
