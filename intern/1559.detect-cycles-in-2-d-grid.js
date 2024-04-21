/*
 * @lc app=leetcode id=1559 lang=javascript
 *
 * [1559] Detect Cycles in 2D Grid
 */

// @lc code=start
/**
 * @param {string[][]} grid
 * @return {boolean}
 */
const containsCycle = function (grid) {
  const ROW_COUNT = grid.length;
  const COL_COUNT = grid[0].length;
  if (ROW_COUNT < 2) {
    return false;
  }
  if (COL_COUNT < 2) {
    return false;
  }

  const visitedGrid = new Array(ROW_COUNT);
  for (let k = 0; k < ROW_COUNT; k++) {
    visitedGrid[k] = new Array(COL_COUNT);
    visitedGrid[k].fill(0);
  }

  const cache = new Map();
  for (let i = 0; i < ROW_COUNT; i++) {
    for (let j = 0; j < COL_COUNT; j++) {
      visitedGrid[i][j] = 1;
      if (helper(grid, visitedGrid, i, j, -1, -1, cache)) {
        return true;
      }
    }
  }
  return false;
};

/**
 *
 * @param {string[][]} grid
 * @param {(0|1|2)[][]} visitedGrid - 0 未访问 1 正在访问 2 已访问
 * @param {number} x
 * @param {number} y
 * @param {number} lastX
 * @param {number} lastY
 * @param {Map<string, boolean>} cache
 */
function helper(grid, visitedGrid, x, y, lastX, lastY, cache) {
  const cachedResult = cache.get(`${x}-${y}`);
  if (cachedResult !== undefined) {
    return cachedResult;
  }

  visitedGrid[x][y] = 2;

  const ROW_COUNT = grid.length;
  const COL_COUNT = grid[0].length;
  const char = grid[x][y];
  if (x - 1 >= 0 && grid[x - 1][y] === char) {
    if (visitedGrid[x - 1][y] === 0) {
      visitedGrid[x - 1][y] = 1;
      if (helper(grid, visitedGrid, x - 1, y, x, y, cache)) {
        cache.set(`${x}-${y}`, true);
        return true;
      }
    } else if (visitedGrid[x - 1][y] === 2 && x - 1 !== lastX) {
      cache.set(`${x}-${y}`, true);
      return true;
    }
  }
  if (x + 1 <= ROW_COUNT - 1 && grid[x + 1][y] === char) {
    if (visitedGrid[x + 1][y] === 0) {
      visitedGrid[x + 1][y] = 1;
      if (helper(grid, visitedGrid, x + 1, y, x, y, cache)) {
        cache.set(`${x}-${y}`, true);
        return true;
      }
    } else if (visitedGrid[x + 1][y] === 2 && x + 1 !== lastX) {
      cache.set(`${x}-${y}`, true);
      return true;
    }
  }
  if (y - 1 >= 0 && grid[x][y - 1] === char) {
    if (visitedGrid[x][y - 1] === 0) {
      visitedGrid[x][y - 1] = 1;
      if (helper(grid, visitedGrid, x, y - 1, x, y, cache)) {
        cache.set(`${x}-${y}`, true);
        return true;
      }
    } else if (visitedGrid[x][y - 1] === 2 && y - 1 !== lastY) {
      cache.set(`${x}-${y}`, true);
      return true;
    }
  }
  if (y + 1 <= COL_COUNT - 1 && grid[x][y + 1] === char) {
    if (visitedGrid[x][y + 1] === 0) {
      visitedGrid[x][y + 1] = 1;
      if (helper(grid, visitedGrid, x, y + 1, x, y, cache)) {
        cache.set(`${x}-${y}`, true);
        return true;
      }
    } else if (visitedGrid[x][y + 1] === 2 && y + 1 !== lastY) {
      cache.set(`${x}-${y}`, true);
      return true;
    }
  }
  cache.set(`${x}-${y}`, false);
  return false;
}
// @lc code=end
