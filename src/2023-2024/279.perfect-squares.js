/*
 * @lc app=leetcode id=279 lang=javascript
 *
 * [279] Perfect Squares
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  /**
   * dp[i] the least number of perfect square numbers that sum to `i`
   *
   * base case
   * dp[0] = 0
   * dp[1 to i] = Infinity
   *
   * for i from 1 to n
   *  for j from 1 to sqrt(i)
   *      dp[i] = Math.min(dp[i], dp[i-j**2]+1)
   */

  const dp = new Array(n + 1);
  dp.fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j * j <= i; j++) {
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
  }

  return dp[n];
};
// @lc code=end
