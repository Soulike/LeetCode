/*
 * @lc app=leetcode id=1020 lang=javascript
 *
 * [1020] Number of Enclaves
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var numEnclaves = function (grid) {
  const ROW_COUNT = grid.length;
  const COL_COUNT = grid[0].length;
  const LAND = 1;
  const WATER = 0;
  const VISITED_LAND = -1;

  for (let i = 0; i < ROW_COUNT; i++) {
    flood(i, 0);
    flood(i, COL_COUNT - 1);
  }

  for (let j = 0; j < COL_COUNT; j++) {
    flood(0, j);
    flood(ROW_COUNT - 1, j);
  }

  let closedIslandCellCount = 0;

  for (let i = 0; i < ROW_COUNT; i++) {
    for (let j = 0; j < COL_COUNT; j++) {
      if (grid[i][j] === LAND) {
        visit(i, j);
      }
    }
  }

  return closedIslandCellCount;

  function flood(i, j) {
    if (
      i < 0 ||
      i === ROW_COUNT ||
      j < 0 ||
      j === COL_COUNT ||
      grid[i][j] !== LAND
    ) {
      return;
    }
    grid[i][j] = WATER;
    flood(i - 1, j);
    flood(i + 1, j);
    flood(i, j - 1);
    flood(i, j + 1);
  }

  function visit(i, j) {
    if (
      i < 0 ||
      i === ROW_COUNT ||
      j < 0 ||
      j === COL_COUNT ||
      grid[i][j] !== LAND
    ) {
      return;
    }
    grid[i][j] = VISITED_LAND;
    closedIslandCellCount++;
    visit(i - 1, j);
    visit(i + 1, j);
    visit(i, j - 1);
    visit(i, j + 1);
  }
};
// @lc code=end
