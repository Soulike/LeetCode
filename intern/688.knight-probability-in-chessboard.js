/*
 * @lc app=leetcode id=688 lang=javascript
 *
 * [688] Knight Probability in Chessboard
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
const knightProbability = function (n, k, row, column) {
  const cache = new Map();
  return helper(n, k, row, column, cache);
};

/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @param {Map<`${row}-${column}-${k}`, number>} cache
 * @return {number}
 */
function helper(n, k, row, column, cache) {
  const cached = cache.get(`${row}-${column}-${k}`);
  if (cached !== undefined) {
    return cached;
  }

  let result = 0;

  if (k === 0) {
    if (row >= 0 && row < n && column >= 0 && column < n) {
      result = 1;
    } else {
      result = 0;
    }
  } else {
    if (row >= 0 && row < n && column >= 0 && column < n) {
      result =
        (helper(n, k - 1, row + 2, column + 1, cache) +
          helper(n, k - 1, row + 2, column - 1, cache) +
          helper(n, k - 1, row - 2, column + 1, cache) +
          helper(n, k - 1, row - 2, column - 1, cache) +
          helper(n, k - 1, row + 1, column + 2, cache) +
          helper(n, k - 1, row - 1, column + 2, cache) +
          helper(n, k - 1, row + 1, column - 2, cache) +
          helper(n, k - 1, row - 1, column - 2, cache)) /
        8;
    } else {
      result = 0;
    }
  }

  cache.set(`${row}-${column}-${k}`, result);
  return result;
}
// @lc code=end
