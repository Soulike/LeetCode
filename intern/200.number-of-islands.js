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
const numIslands = function (grid) {
  const WATER = '0';
  const LAND = '1';
  const VISITED_LAND = '2';
  let islandNum = 0;
  const ROW_LENGTH = grid[0].length;
  const COL_LENGTH = grid.length;
  for (let i = 0; i < COL_LENGTH; i++) {
    for (let j = 0; j < ROW_LENGTH; j++) {
      if (grid[i][j] === LAND) {
        islandNum++;
        visit(i, j);
      }
    }
  }
  return islandNum;

  /**
   * @param {number} i
   * @param {number} j
   * @return {void}
   */
  function visit(i, j) {
    if (
      i < 0 ||
      i === COL_LENGTH ||
      j < 0 ||
      j === ROW_LENGTH ||
      grid[i][j] !== LAND
    ) {
      return;
    }
    grid[i][j] = VISITED_LAND;
    visit(i - 1, j);
    visit(i + 1, j);
    visit(i, j - 1);
    visit(i, j + 1);
  }
};
// @lc code=end
