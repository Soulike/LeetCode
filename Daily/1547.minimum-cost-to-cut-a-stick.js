/*
 * @lc app=leetcode id=1547 lang=javascript
 *
 * [1547] Minimum Cost to Cut a Stick
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[]} cuts
 * @return {number}
 */
var minCost = function (n, cuts) {
  cuts.sort((a, b) => a - b);

  const newCuts = [0, ...cuts, n];

  /**
   * dp[i][j] the min cost from newCuts[i] to newCuts[j]
   *
   * base case
   * dp[i][i+1] = 0
   *
   * dp[i][j] = min
   *  dp[i][k] + dp[k][j]
   */

  /** @type {number[][]} */
  const dp = new Array(newCuts.length);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = [];
    dp[i][i + 1] = 0;
  }

  for (let i = newCuts.length - 1; i >= 0; i--) {
    for (let j = i + 2; j < newCuts.length; j++) {
      dp[i][j] = Infinity;
      for (let k = i + 1; k < j; k++) {
        dp[i][j] = Math.min(
          dp[i][j],
          newCuts[j] - newCuts[i] + dp[i][k] + dp[k][j],
        );
      }
    }
  }

  return dp[0][newCuts.length - 1];
};
// @lc code=end

minCost(7, [1, 3, 4, 5]);
