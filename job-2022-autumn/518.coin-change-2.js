/*
 * @lc app=leetcode id=518 lang=javascript
 *
 * [518] Coin Change 2
 */

// @lc code=start
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  /**
   * dp[i][j] 使用 [0,i-1] 的硬币，组成面额 j 有几种方式
   *
   * base case
   * dp[0][j] = 0
   * dp[i][0] = 1
   *
   * dp[i][j] = dp[i][j-coins[i-1]] + dp[i-1][j]
   */

  const n = coins.length;

  /** @type {number[][]} */
  const dp = new Array(n + 1);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(amount + 1);
    dp[i].fill(0);
    dp[i][0] = 1;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= amount; j++) {
      if (j - coins[i - 1] >= 0) {
        dp[i][j] = dp[i][j - coins[i - 1]] + dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[n][amount];
};
// @lc code=end
