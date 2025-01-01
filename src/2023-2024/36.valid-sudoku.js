/*
 * @lc app=leetcode id=36 lang=javascript
 *
 * [36] Valid Sudoku
 */

// @lc code=start
/**
 * @param {string[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  const M = 9;
  const EMPTY = '.';

  /** @type {Set<string>} */
  const rowNumSet = new Set();
  /** @type {Set<string>} */
  const colNumSet = new Set();

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < M; j++) {
      // validate row i
      const rowValue = board[i][j];
      if (rowValue !== EMPTY) {
        if (!rowNumSet.has(rowValue)) {
          rowNumSet.add(rowValue);
        } else {
          return false;
        }
      }

      // validate col i
      const colValue = board[j][i];
      if (colValue !== EMPTY) {
        if (!colNumSet.has(colValue)) {
          colNumSet.add(colValue);
        } else {
          return false;
        }
      }

      // validate 3x3
      if (i % 3 === 0 && j % 3 === 0) {
        /** @type {Set<string>} */
        const subBoxNumSet = new Set();
        for (let k = 0; k < 3; k++) {
          for (let l = 0; l < 3; l++) {
            const gridValue = board[i + k][j + l];
            if (gridValue !== EMPTY) {
              if (!subBoxNumSet.has(gridValue)) {
                subBoxNumSet.add(gridValue);
              } else {
                return false;
              }
            }
          }
        }
      }
    }
    rowNumSet.clear();
    colNumSet.clear();
  }

  return true;
};
// @lc code=end
