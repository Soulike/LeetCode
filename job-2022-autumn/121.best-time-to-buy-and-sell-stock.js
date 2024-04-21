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
var maxProfit = function (prices) {
  /**
   * dp[i][0 or 1] 第 i 天，是否持有股票取得的最大利润
   *
   * base case
   * dp[0][0] = 0
   * dp[0][1] = -prices[0]
   *
   * dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i])
   * dp[i][1] = Math.max(dp[i-1][1],
   *  0 - prices[i])  // 只能买入一次
   *
   * return dp[n-1][0]
   */

  const n = prices.length;
  let prevDp = [0, -prices[0]];
  let dp = new Array(2);

  for (let i = 1; i < n; i++) {
    dp[0] = Math.max(prevDp[0], prevDp[1] + prices[i]);
    dp[1] = Math.max(prevDp[1], -prices[i]);
    [dp, prevDp] = [prevDp, dp];
  }

  return prevDp[0];
};
// @lc code=end
