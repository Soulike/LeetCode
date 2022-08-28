/*
 * @lc app=leetcode id=309 lang=javascript
 *
 * [309] Best Time to Buy and Sell Stock with Cooldown
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    /**
     * dp[i][0] 在第 i 天不持有股票最大的收益
     * dp[i][1] 在第 i 天持有股票最大的收益
     *
     * base case
     * dp[0][0] = 0
     * dp[0][1] = -prices[0]
     *
     * dp[1][0] = Math.max(dp[0][0], dp[0][1] + prices[1])
     * dp[1][1] = Math.max(dp[0][1], dp[0][0] - prices[1])
     *
     * dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i])
     * dp[i][1] = Math.max(dp[i-1][1], dp[i-2][0] - prices[i])
     *
     * return dp[n-1][0]
     */

    const n = prices.length;

    if (n === 1) {
        return 0;
    }

    /** @type {[number, number][]} */
    const dp = new Array(n);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = [-1, -1];
    }

    dp[0] = [0, -prices[0]];

    dp[1][0] = Math.max(dp[0][0], dp[0][1] + prices[1]);
    dp[1][1] = Math.max(dp[0][1], dp[0][0] - prices[1]);

    for (let i = 2; i < n; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 2][0] - prices[i]);
    }

    return dp[n - 1][0];
};
// @lc code=end
