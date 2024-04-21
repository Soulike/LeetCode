/*
 * @lc app=leetcode id=714 lang=javascript
 *
 * [714] Best Time to Buy and Sell Stock with Transaction Fee
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function (prices, fee) {
  const DAY_COUNT = prices.length;
  if (DAY_COUNT < 2) {
    return 0;
  }
  /** dp[i][0 或 1]
   * 在第 i 天，在买（1）或者不买今天的股票（0）的情况下，最多可获得的利润
   */
  const dp = new Array(DAY_COUNT);
  for (let i = 0; i < DAY_COUNT; i++) {
    dp[i] = new Array(2);
  }

  /**
   * 在第 i 天，
   * 前一天买了股票
   * 今天要卖出
   * dp[i][0] = dp[i-1][1] + prices[i] - fee
   * 今天摸了
   * dp[i][1] = dp[i-1][1]
   *
   * 前两天没买股票
   * 今天要买入
   * dp[i][1] = dp[i-1][0] - prices[i]
   * 今天摸了
   * dp[i][0] = dp[i-1][0];
   */

  dp[0][0] = 0;
  dp[0][1] = -prices[0];

  for (let i = 1; i < DAY_COUNT; i++) {
    dp[i][0] = Math.max(dp[i - 1][1] + prices[i] - fee, dp[i - 1][0]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
  }

  return dp[DAY_COUNT - 1][0];
};
// @lc code=end
