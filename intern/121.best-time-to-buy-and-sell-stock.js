/*
 * @lc app=leetcode id=121 lang=javascript
 *
 * [121] Best Time to Buy and Sell Stock
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (prices) {
    /**
     * dp[i][k][0 或 1]
     * 在第 i 天，如果最多进行 k 次交易，在买（1）或者不买今天的股票（0）的情况下，最多可获得的利润
     *
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
     * dp[i][k][0] = dp[i-1][k][0]
     *
     * 在本题目中，k只能是 0 或者 1。当 k = 0 时
     * dp[i][0][0] = 0
     * dp[i][0][1] = -INF
     *
     * 当 k = 1 时
     *
     * 前一天买了股票
     * 今天要卖出
     * dp[i][1][0] = dp[i-1][1][1] + prices[i]
     * 今天摸了
     * dp[i][1][1] = dp[i-1][1][1]
     *
     * 前一天没买股票
     * 今天要买入
     * dp[i][1][1] = dp[i-1][0][0] - prices[i] = - prices[i]
     * 今天摸了
     * dp[i][1][0] = dp[i-1][1][0]
     *
     * 所以可以去掉 k，得到
     *
     * 前一天买了股票
     * 今天要卖出
     * dp[i][0] = dp[i-1][1] + prices[i]
     * 今天摸了
     * dp[i][1] = dp[i-1][1]
     *
     * 前一天没买股票
     * 今天要买入
     * dp[i][1] =  -prices[i]
     * 今天摸了
     * dp[i][0] = dp[i-1][0]
     *
     * 因为 dp[i] 只需要 dp[i-1]，可以优化掉
     */
    const DAY_COUNT = prices.length;
    if (DAY_COUNT === 0) {
        return 0;
    }

    let lastTuple = [];

    lastTuple[0] = 0;
    lastTuple[1] = -prices[0];

    for (let i = 1; i < DAY_COUNT; i++) {
        const newTuple = [];
        newTuple[0] = Math.max(lastTuple[1] + prices[i], lastTuple[0]);
        newTuple[1] = Math.max(lastTuple[1], -prices[i]);
        lastTuple = newTuple;
    }

    return lastTuple[0];
};
// @lc code=end
