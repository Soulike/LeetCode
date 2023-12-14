/*
 * @lc app=leetcode id=2482 lang=javascript
 *
 * [2482] Difference Between Ones and Zeros in Row and Column
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number[][]}
 */
var onesMinusZeros = function (grid) {
    const M = grid.length;
    const N = grid[0].length;
    /** @type {number[]} */
    const onesRow = new Array(M).fill(0);
    /** @type {number[]} */
    const onesCol = new Array(N).fill(0);

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            onesRow[i] += grid[i][j];
            onesCol[j] += grid[i][j];
        }
    }

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            grid[i][j] = 2 * (onesRow[i] + onesCol[j]) - (M + N);
        }
    }

    return grid;
};
// @lc code=end
