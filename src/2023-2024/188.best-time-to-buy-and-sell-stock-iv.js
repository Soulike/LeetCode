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
var maxProfit = function (K, prices) {
  /**
   * dp[i][k][HOLD or NOT_HOLD] 第 i 天，最多进行了 k 次交易，持有或不持有股票获得的最大收益
   *
   * dp[-1][...][NOT_HOLD] = 0
   * dp[-1][...][HOLD] = -Infinity
   *
   * dp[...][0][NOT_HOLD] = 0
   * dp[...][0][HOLD] = -Infinity
   *
   * dp[i][k][HOLD] = Math.max(dp[i-1][k][HOLD], dp[i-1][k-1][NOT_HOLD]-prices[i])
   * dp[i][k][NOT_HOLD] = Math.max(dp[i-1][k][NOT_HOLD], dp[i-1][k][HOLD]+prices[i])
   *
   * 以上 -1<=i<DAYS
   *
   * return dp[DAYS-1][K][NOT_HOLD]
   */

  const DAYS = prices.length;
  const HOLD = 1;
  const NOT_HOLD = 0;

  /** @type {[number, number][][]} */
  const dp = new Array(DAYS);
  for (let i = -1; i < dp.length; i++) {
    dp[i] = new Array(K + 1);

    // dp[...][0][HOLD] = -Infinity
    dp[i][0] = [0, -Infinity];
    for (let k = 1; k < dp[i].length; k++) {
      // dp[-1][...][HOLD] = -Infinity
      dp[i][k] = i === -1 ? [0, -Infinity] : [0, 0];
    }
  }

  for (let i = 0; i < DAYS; i++) {
    for (let k = 1; k <= K; k++) {
      dp[i][k][HOLD] = Math.max(
        dp[i - 1][k][HOLD],
        dp[i - 1][k - 1][NOT_HOLD] - prices[i],
      );
      dp[i][k][NOT_HOLD] = Math.max(
        dp[i - 1][k][NOT_HOLD],
        dp[i - 1][k][HOLD] + prices[i],
      );
    }
  }

  return dp[DAYS - 1][K][NOT_HOLD];
};
// @lc code=end

maxProfit(2, [3, 2, 6, 5, 0, 3]);
