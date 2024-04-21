/*
 * @lc app=leetcode id=1905 lang=javascript
 *
 * [1905] Count Sub Islands
 */

// @lc code=start
/**
 * @param {number[][]} grid1
 * @param {number[][]} grid2
 * @return {number}
 */
var countSubIslands = function (grid1, grid2) {
  const ROW_COUNT = grid1.length;
  const COL_COUNT = grid1[0].length;
  const LAND = 1;
  const WATER = 0;
  const VISITED_LAND = -1;

  let subIslandCount = 0;

  for (let i = 0; i < ROW_COUNT; i++) {
    for (let j = 0; j < COL_COUNT; j++) {
      if (grid2[i][j] === LAND && isASubIsland(i, j)) {
        subIslandCount++;
      }
    }
  }

  return subIslandCount;

  function isASubIsland(i, j) {
    if (
      i < 0 ||
      i === ROW_COUNT ||
      j < 0 ||
      j === COL_COUNT ||
      grid2[i][j] !== LAND
    ) {
      return true;
    }
    let isSubIsland = true;
    grid2[i][j] = VISITED_LAND;
    if (grid1[i][j] !== LAND) {
      isSubIsland = false;
    }
    const up = isASubIsland(i - 1, j);
    const down = isASubIsland(i + 1, j);
    const left = isASubIsland(i, j - 1);
    const right = isASubIsland(i, j + 1);
    return isSubIsland && up && down && left && right;
  }
};
// @lc code=end
