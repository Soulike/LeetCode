/*
 * @lc app=leetcode id=766 lang=javascript
 *
 * [766] Toeplitz Matrix
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {boolean}
 */
var isToeplitzMatrix = function (matrix) {
    /** @type {Map<number, number>} */
    const diffToValue = new Map();

    const m = matrix.length;
    const n = matrix[0].length;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const diff = i - j;
            const value = matrix[i][j];

            if (diffToValue.has(diff)) {
                if (diffToValue.get(diff) !== value) {
                    return false;
                }
            } else {
                diffToValue.set(diff, value);
            }
        }
    }

    return true;
};
// @lc code=end
