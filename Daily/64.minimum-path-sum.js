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
   * dp[i][j] the min path sum starting from grid[i][j]
   *
   * base case
   * dp[M-1][N-1] = grid[M-1][N-1]
   *
   * dp[i][j] = Math.min(dp[i+1][j], dp[i][j+1]) + grid[i][j]
   *
   * memory compression
   *
   * base case
   * dp[N-1] = grid[M-1][N-1]
   *
   * dp[j] = Math.min(dp[j], dp[j+1]) + grid[i][j]
   */

  const ROW_NUMBER = grid.length;
  const COL_NUMBER = grid[0].length;

  /** @type {number[]} */
  const dp = [];

  dp[COL_NUMBER - 1] = grid[ROW_NUMBER - 1][COL_NUMBER - 1];

  for (let i = ROW_NUMBER - 1; i >= 0; i--) {
    for (let j = COL_NUMBER - 1; j >= 0; j--) {
      if (i === ROW_NUMBER - 1 && j === COL_NUMBER - 1) continue;
      dp[j] =
        Math.min(dp[j] ?? Infinity, j + 1 < COL_NUMBER ? dp[j + 1] : Infinity) +
        grid[i][j];
    }
  }

  return dp[0];
};
// @lc code=end

minPathSum([
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
]);
