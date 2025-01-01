/*
 * @lc app=leetcode id=994 lang=javascript
 *
 * [994] Rotting Oranges
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const EMPTY = 0;
  const FRESH = 1;
  const ROTTEN = 2;
  const PRE_ROTTEN = 3;

  const m = grid.length;
  const n = grid[0].length;

  /**
   * @param {number} i
   * @param {number} j
   * @returns {boolean}
   */
  const preRottenNeighbors = (i, j) => {
    if (grid[i][j] !== ROTTEN) {
      return false;
    }

    let hasNeighbor = false;

    if (i - 1 >= 0 && grid[i - 1][j] === FRESH) {
      grid[i - 1][j] = PRE_ROTTEN;
      hasNeighbor = true;
    }

    if (i + 1 <= m - 1 && grid[i + 1][j] === FRESH) {
      grid[i + 1][j] = PRE_ROTTEN;
      hasNeighbor = true;
    }

    if (j - 1 >= 0 && grid[i][j - 1] === FRESH) {
      grid[i][j - 1] = PRE_ROTTEN;
      hasNeighbor = true;
    }

    if (j + 1 <= n - 1 && grid[i][j + 1] === FRESH) {
      grid[i][j + 1] = PRE_ROTTEN;
      hasNeighbor = true;
    }

    return hasNeighbor;
  };

  const makePreRottenRotten = () => {
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === PRE_ROTTEN) {
          grid[i][j] = ROTTEN;
        }
      }
    }
  };

  let minutes = 0;
  let done = false;
  let hasFresh = false;

  while (!done) {
    done = true;
    hasFresh = false;
    minutes++;

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === ROTTEN) {
          if (preRottenNeighbors(i, j)) {
            done = false;
          }
        } else if (grid[i][j] === FRESH) {
          hasFresh = true;
        }
      }
    }

    makePreRottenRotten();
  }

  if (hasFresh) {
    return -1;
  }
  return minutes - 1;
};
// @lc code=end
