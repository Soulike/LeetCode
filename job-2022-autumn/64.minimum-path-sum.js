/*
 * @lc app=leetcode id=64 lang=javascript
 *
 * [64] Minimum Path Sum
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  /**
   * dp[i][j] 从 grid[i][j] 出发，到达右下角的最短路径和
   *
   * base case
   * dp[m-1][n-1] = grid[m-1][n-1]
   *
   * dp[i][j] = Math.min(dp[i+1][j], dp[i][j+1]) + grid[i][j]
   *
   * return dp[0][0]
   *
   * 内存优化
   *
   * base case
   * dp[n-1] = grid[m-1][n-1]
   *
   * dp[j] = Math.min(dp[j], dp[j+1]) + grid[i][j]
   */

  const m = grid.length;
  const n = grid[0].length;

  /** @type {number[]} */
  let dp = new Array(m);

  dp[n - 1] = grid[m - 1][n - 1];

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (i === m - 1 && j === n - 1) {
        continue;
      }
      dp[j] =
        Math.min(
          i + 1 <= m - 1 ? dp[j] : Infinity,
          j + 1 <= n - 1 ? dp[j + 1] : Infinity,
        ) + grid[i][j];
    }
  }

  return dp[0];
};
// @lc code=end
