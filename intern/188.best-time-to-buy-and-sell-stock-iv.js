/*
 * @lc app=leetcode id=188 lang=javascript
 *
 * [188] Best Time to Buy and Sell Stock IV
 */

// @lc code=start
/**
 * @param {number} K
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (K, prices) {
    const DAY_COUNT = prices.length;
    K = Math.min(K, Math.floor(DAY_COUNT / 2));
    if (DAY_COUNT === 0 || K === 0) {
        return 0;
    }
    /** dp[i][k][0 或 1]
     * 在第 i 天，如果最多进行 k 次交易，在买（1）或者不买今天的股票（0）的情况下，最多可获得的利润
     */
    const dp = new Array(DAY_COUNT);
    for (let i = 0; i < DAY_COUNT; i++) {
        dp[i] = new Array(K + 1);
        for (let k = 0; k <= K; k++) {
            dp[i][k] = new Array(2);
        }
    }

    /**
     * 在第 i 天，
     * 前一天买了股票
     * 今天要卖出
     * dp[i][k][0] = dp[i-1][k][1] + prices[i]
     * 今天摸了
     * dp[i][k][1] = dp[i-1][k][1]
     *
     * 前一天没买股票
     * 今天要买入
     * dp[i][k][1] = dp[i-1][k-1][0] - prices[i]
     * 今天摸了
     * dp[i][k][0] = dp[i-1][k][0];
     */

    for (let i = 0; i < DAY_COUNT; i++) {
        dp[i][0][1] = Number.NEGATIVE_INFINITY;
        dp[i][0][0] = 0;
    }
    for (let k = 1; k <= K; k++) {
        dp[0][k][0] = 0;
        dp[0][k][1] = -prices[0];
    }

    for (let i = 1; i < DAY_COUNT; i++) {
        for (let k = 1; k <= K; k++) {
            dp[i][k][0] = Math.max(
                dp[i - 1][k][1] + prices[i],
                dp[i - 1][k][0],
            );
            dp[i][k][1] = Math.max(
                dp[i - 1][k][1],
                dp[i - 1][k - 1][0] - prices[i],
            );
        }
    }

    return dp[DAY_COUNT - 1][K][0];
};
// @lc code=end
