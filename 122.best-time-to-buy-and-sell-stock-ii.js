/*
 * @lc app=leetcode id=122 lang=javascript
 *
 * [122] Best Time to Buy and Sell Stock II
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function (prices) 
{
    const DAY_COUNT = prices.length;
    /**
     * dp[i][0 or 1] 在第 i 天，买入(1)或者不买(0)当天的股票所取得的最大利润
     */
    const dp = new Array(DAY_COUNT);
    for (let i = 0; i < DAY_COUNT; i++)
    {
        dp[i] = new Array(2);
    }
    /**
     * 在第 i 天，
     * 前一天买了股票
     * 今天要卖出
     * dp[i][0] = dp[i-1][1] + prices[i]
     * 今天摸了
     * dp[i][1] = dp[i-1][1]
     * 
     * 前一天没买股票
     * 今天要买入
     * dp[i][1] = dp[i-1][0] - prices[i]
     * 今天摸了
     * dp[i][0] = dp[i-1][0]
     * 
     * 第 0 天
     * dp[0][0] = 0
     * dp[0][1] = -prices[0];
     */
    dp[0][0] = 0;
    dp[0][1] = -prices[0];

    for (let i = 1; i < DAY_COUNT; i++)
    {
        dp[i][0] = Math.max(dp[i - 1][1] + prices[i], dp[i - 1][0]);
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
    }

    return dp[DAY_COUNT - 1][0];
};
// @lc code=end