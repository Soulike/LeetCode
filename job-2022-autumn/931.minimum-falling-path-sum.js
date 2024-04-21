/*
 * @lc app=leetcode id=931 lang=javascript
 *
 * [931] Minimum Falling Path Sum
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function (matrix) {
  const n = matrix.length;

  /**
   * dp[i][j] - the min sum of falling from dp[i][j]
   *
   * base case
   * dp[n-1][j] = matrix[n-1][j]
   *
   * dp[i][j] = Math.min(dp[i+1][j-1],dp[i+1][j],dp[i+1][j+1]) + matrix[i][j]
   *
   * memory compress
   *
   * base case
   * prevDp[j] = matrix[n-1][j]
   *
   * dp[j] =  Math.min(prevDp[j-1],prevDp[j],prevDp[j+1]) + matrix[i][j]
   */

  /** @type {number[]} */
  let dp = new Array(n);
  /** @type {number[]} */
  let prevDp = [...matrix[n - 1]];

  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j < n; j++) {
      dp[j] =
        Math.min(
          j - 1 >= 0 ? prevDp[j - 1] : Infinity,
          prevDp[j],
          j + 1 <= n - 1 ? prevDp[j + 1] : Infinity,
        ) + matrix[i][j];
    }
    [prevDp, dp] = [dp, prevDp];
  }

  return Math.min(...prevDp);
};
// @lc code=end
