/*
 * @lc app=leetcode id=62 lang=javascript
 *
 * [62] Unique Paths
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  let lastRow = new Array(n);
  lastRow.fill(1);
  let currentRow = new Array(n);
  currentRow[0] = 1;

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      currentRow[j] = currentRow[j - 1] + lastRow[j];
    }
    [lastRow, currentRow] = [currentRow, lastRow];
    currentRow[0] = 1;
  }

  return lastRow[n - 1];
};
// @lc code=end
