/*
 * @lc app=leetcode id=329 lang=javascript
 *
 * [329] Longest Increasing Path in a Matrix
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  const cache = new Map();
  function dp(i, j) {
    const cacheKey = `${i}-${j}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }
    let longestPath = 0;
    if (i - 1 >= 0 && matrix[i - 1][j] > matrix[i][j]) {
      longestPath = Math.max(longestPath, 1 + dp(i - 1, j));
    }
    if (i + 1 <= m - 1 && matrix[i + 1][j] > matrix[i][j]) {
      longestPath = Math.max(longestPath, 1 + dp(i + 1, j));
    }
    if (j - 1 >= 0 && matrix[i][j - 1] > matrix[i][j]) {
      longestPath = Math.max(longestPath, 1 + dp(i, j - 1));
    }
    if (j + 1 <= n - 1 && matrix[i][j + 1] > matrix[i][j]) {
      longestPath = Math.max(longestPath, 1 + dp(i, j + 1));
    }
    cache.set(cacheKey, longestPath);
    return longestPath;
  }

  let longestPath = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      longestPath = Math.max(longestPath, dp(i, j) + 1);
    }
  }
  return longestPath;
};
// @lc code=end
