/*
 * @lc app=leetcode id=1329 lang=javascript
 *
 * [1329] Sort the Matrix Diagonally
 */

// @lc code=start
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var diagonalSort = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  /**
   * @returns {number[][]}
   */
  const getDiagonals = () => {
    /** @type {number[][]} */
    const diagonals = [];

    for (let i = m - 1; i >= 0; i--) {
      /** @type {number[]} */
      const diagonal = [];
      let row = i;
      let col = 0;
      while (row < m && col < n) {
        diagonal.push(mat[row][col]);
        row++;
        col++;
      }

      diagonals.push(diagonal);
    }

    for (let j = 1; j < n; j++) {
      /** @type {number[]} */
      const diagonal = [];
      let row = 0;
      let col = j;
      while (row < m && col < n) {
        diagonal.push(mat[row][col]);
        row++;
        col++;
      }
      diagonals.push(diagonal);
    }

    return diagonals;
  };

  /**
   * @param {number[][]} diagonals
   */
  const setDiagonals = (diagonals) => {
    let diagonalsIndex = 0;
    for (let i = m - 1; i >= 0; i--) {
      const diagonal = diagonals[diagonalsIndex];
      diagonalsIndex++;
      let row = i;
      let col = 0;

      let diagonalIndex = 0;
      while (row < m && col < n) {
        mat[row][col] = diagonal[diagonalIndex];
        diagonalIndex++;
        row++;
        col++;
      }
    }

    for (let j = 1; j < n; j++) {
      const diagonal = diagonals[diagonalsIndex];
      diagonalsIndex++;
      let row = 0;
      let col = j;

      let diagonalIndex = 0;
      while (row < m && col < n) {
        mat[row][col] = diagonal[diagonalIndex];
        diagonalIndex++;
        row++;
        col++;
      }
    }
  };

  const diagonals = getDiagonals();

  diagonals.map((diagonal) => diagonal.sort((a, b) => a - b));

  setDiagonals(diagonals);

  return mat;
};
// @lc code=end
