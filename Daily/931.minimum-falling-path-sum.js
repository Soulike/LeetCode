/*
 * @lc app=leetcode id=931 lang=javascript
 *
 * [931] Minimum Falling Path Sum
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function (matrix) {
    const n = matrix[0].length;
    let prevRow = [...matrix[0]];
    /** @type {number[]} */
    let currentRow = new Array(n);

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < n; j++) {
            currentRow[j] =
                matrix[i][j] +
                Math.min(
                    j - 1 >= 0 ? prevRow[j - 1] : Infinity,
                    prevRow[j],
                    j + 1 <= n - 1 ? prevRow[j + 1] : Infinity,
                );
        }

        [prevRow, currentRow] = [currentRow, prevRow];
    }

    return Math.min(...prevRow);
};
// @lc code=end
