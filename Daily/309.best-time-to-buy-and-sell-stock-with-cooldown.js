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
  if (prices.length < 2) return 0;

  /**
   * dp[i][HOLD or NOT_HOLD] the max profit of holding or not holding the stock on the i_th day
   *
   * base case
   * dp[0][NOT_HOLD] = 0
   * dp[0][HOLD] = -prices[0]
   *
   * dp[1][NOT_HOLD] = Math.max(dp[0][HOLD] + prices[1], dp[0][NOT_HOLD]);
   * dp[1][HOLD] = Math.max(dp[0][HOLD], -prices[1]);
   *
   * dp[i][NOT_HOLD] = Math.max(dp[i-1][NOT_HOLD], dp[i-1][HOLD]+prices[i])
   * dp[i][HOLD] = Math.max(dp[i-1][HOLD], dp[i-2][NOT_HOLD]-prices[i])
   *
   * return max(dp[DAYS-1][NOT_HOLD])
   */

  const DAYS = prices.length;
  const NOT_HOLD = 0;
  const HOLD = 1;

  /** @type {[number, number][]} */
  const dp = new Array(DAYS);
  for (let i = 0; i < DAYS; i++) {
    dp[i] = [0, 0];
  }

  dp[0][NOT_HOLD] = 0;
  dp[0][HOLD] = -prices[0];
  dp[1][NOT_HOLD] = Math.max(dp[0][HOLD] + prices[1], dp[0][NOT_HOLD]);
  dp[1][HOLD] = Math.max(dp[0][HOLD], -prices[1]);

  for (let i = 2; i < DAYS; i++) {
    dp[i][NOT_HOLD] = Math.max(
      dp[i - 1][NOT_HOLD],
      dp[i - 1][HOLD] + prices[i],
    );
    dp[i][HOLD] = Math.max(dp[i - 1][HOLD], dp[i - 2][NOT_HOLD] - prices[i]);
  }

  return Math.max(dp[DAYS - 1][NOT_HOLD]);
};
// @lc code=end

maxProfit([6, 4, 1]);
