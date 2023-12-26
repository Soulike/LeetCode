/*
 * @lc app=leetcode id=1155 lang=javascript
 *
 * [1155] Number of Dice Rolls With Target Sum
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */
var numRollsToTarget = function (n, k, target) {
    const MOD = 10 ** 9 + 7;
    /**
     * dp[n][target]
     * `n` dices left, number of ways to achieve `target`
     *
     * base case
     * dp[0][*] = 0
     * dp[*][0] = 0
     * dp[1][more than k] = 0
     * dp[1][less equal to k] = 1
     *
     * for l from 1 to k
     * dp[i][j] = dp[i-1][j-l]
     *
     * @type {number[][]}
     */
    const dp = new Array(2);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(target + 1);
        dp[i][0] = 0;
    }
    dp[0].fill(0);
    dp[1].fill(0);
    for (let t = 1; t <= k; t++) {
        dp[1][t] = 1;
    }

    for (let m = 2; m <= n; m++) {
        for (let t = 1; t <= target; t++) {
            dp[m % 2][t] = 0;
            for (let l = 1; l <= k; l++) {
                if (l > t) break;
                dp[m % 2][t] += dp[(m - 1) % 2][t - l];
            }
            dp[m % 2][t] %= MOD;
        }
    }

    return dp[n % 2][target];
};
// @lc code=end

numRollsToTarget(30, 30, 500);
