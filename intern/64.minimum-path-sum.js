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
const minPathSum = function (grid) {
  /**
   * dp[i][j] 从 (0,0) 到 (i,j) 的最小路径和
   *
   * base case
   * dp[0][0] = grid[0][0]
   *
   * dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
   */

  const M = grid.length;
  const N = grid[0].length;

  const dp = new Array(M);
  for (let i = 0; i < M; i++) {
    dp[i] = new Array(N);
  }

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (i === 0 && j === 0) {
        dp[0][0] = grid[0][0];
      } else {
        if (i === 0) {
          dp[i][j] = dp[i][j - 1] + grid[i][j];
        } else if (j === 0) {
          dp[i][j] = dp[i - 1][j] + grid[i][j];
        } else {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
        }
      }
    }
  }

  return dp[M - 1][N - 1];
};
// @lc code=end
