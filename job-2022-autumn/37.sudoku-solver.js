/*
 * @lc app=leetcode id=37 lang=javascript
 *
 * [37] Sudoku Solver
 */

// @lc code=start
/**
 * @param {string[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  const n = 9;
  const EMPTY = '.';

  /**
   * @param {number} i
   * @param {number} num
   * @returns {boolean}
   */
  const checkRow = (i, num) => {
    const numStr = num.toString();
    for (let j = 0; j < n; j++) {
      if (board[i][j] === numStr) {
        return false;
      }
    }
    return true;
  };

  /**
   * @param {number} j
   * @param {number} num
   * @returns {boolean}
   */
  const checkCol = (j, num) => {
    const numStr = num.toString();
    for (let i = 0; i < n; i++) {
      if (board[i][j] === numStr) {
        return false;
      }
    }
    return true;
  };

  /**
   * @param {number} i
   * @param {number} j
   * @param {number} num
   */
  const checkSquare = (i, j, num) => {
    const rowStart = Math.floor(i / 3) * 3;
    const colStart = Math.floor(j / 3) * 3;
    const numStr = num.toString();

    for (let k = 0; k < 3; k++) {
      for (let l = 0; l < 3; l++) {
        if (board[rowStart + k][colStart + l] === numStr) {
          return false;
        }
      }
    }
    return true;
  };

  /**
   * @param {number} i
   * @param {number} j
   * @returns {boolean}
   */
  const backtrack = (i, j) => {
    if (i === n) {
      return true;
    }
    if (board[i][j] !== EMPTY) {
      if (j < n - 1) {
        return backtrack(i, j + 1);
      } else {
        return backtrack(i + 1, 0);
      }
    } else {
      for (let num = 1; num <= 9; num++) {
        if (checkRow(i, num) && checkCol(j, num) && checkSquare(i, j, num)) {
          board[i][j] = num.toString();
          if (j < n - 1) {
            if (backtrack(i, j + 1)) {
              return true;
            }
          } else {
            if (backtrack(i + 1, 0)) {
              return true;
            }
          }
          board[i][j] = EMPTY;
        }
      }
      return false;
    }
  };

  backtrack(0, 0);
};
// @lc code=end
