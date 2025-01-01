/*
 * @lc app=leetcode id=695 lang=javascript
 *
 * [695] Max Area of Island
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const WATER = 0;
  const LAND = 1;

  /**
   * @param {number} i
   * @param {number} j
   * @returns {number}
   */
  const flood = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === WATER) {
      return 0;
    }

    grid[i][j] = WATER;
    return (
      1 + flood(i + 1, j) + flood(i - 1, j) + flood(i, j + 1) + flood(i, j - 1)
    );
  };

  let maxArea = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === LAND) {
        maxArea = Math.max(maxArea, flood(i, j));
      }
    }
  }
  return maxArea;
};
// @lc code=end
