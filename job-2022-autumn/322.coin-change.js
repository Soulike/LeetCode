/*
 * @lc app=leetcode id=322 lang=javascript
 *
 * [322] Coin Change
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    /**
     * dp[i] 在剩余金额为 i 时，所需的最少硬币数
     * @type {number[]}
     */
    const dp = [];
    dp[0] = 0;
    for (const coin of coins) {
        dp[coin] = 1;
    }

    /**
     * dp[i] = dp[i-coin] + 1
     */

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (i - coin >= 0 && dp[i - coin] !== undefined) {
                dp[i] = Math.min(dp[i] ?? Infinity, dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] ?? -1;
};
// @lc code=end
