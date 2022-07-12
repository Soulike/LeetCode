/*
 * @lc app=leetcode id=73 lang=javascript
 *
 * [73] Set Matrix Zeroes
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const setZeroes = function (matrix) {
    const m = matrix.length;
    if (m < 1) {
        return;
    }
    // m >= 1
    const n = matrix[0].length;
    if (n < 1) {
        return;
    }
    // m >= 1 && n >= 1
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                for (let k = 0; k < m; k++) {
                    if (matrix[k][j] !== 0) {
                        matrix[k][j] = NaN;
                    }
                }
                for (let k = 0; k < n; k++) {
                    if (matrix[i][k] !== 0) {
                        matrix[i][k] = NaN;
                    }
                }
            }
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (Number.isNaN(matrix[i][j])) {
                matrix[i][j] = 0;
            }
        }
    }
};
// @lc code=end
