/*
 * @lc app=leetcode id=200 lang=javascript
 *
 * [200] Number of Islands
 */

// @lc code=start
/**
 * @param {string[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const LAND = '1';
  const WATER = '0';
  const m = grid.length;
  const n = grid[0].length;

  /**
   * @param {number} i
   * @param {number} j
   */
  const flood = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === WATER) {
      return;
    } else if (grid[i][j] === LAND) {
      grid[i][j] = WATER;
      flood(i + 1, j);
      flood(i - 1, j);
      flood(i, j + 1);
      flood(i, j - 1);
    }
  };

  let islandCount = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === LAND) {
        islandCount++;
        flood(i, j);
      }
    }
  }

  return islandCount;
};
// @lc code=end
