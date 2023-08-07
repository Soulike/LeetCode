/*
 * @lc app=leetcode id=74 lang=javascript
 *
 * [74] Search a 2D Matrix
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    const rowNum = matrix.length;
    const colNum = matrix[0].length;

    let left = 0;
    let right = rowNum * colNum - 1;

    while (left <= right) {
        const mid = Math.floor((right - left) / 2) + left;
        const midValue = readMatrixAsArray(matrix, mid);
        if (midValue > target) {
            right = mid - 1;
        } else if (midValue < target) {
            left = mid + 1;
        } else {
            return true;
        }
    }
    return false;
};

/**
 * @param {number} index
 * @param {number[][]} matrix
 * @returns {number}
 */
function readMatrixAsArray(matrix, index) {
    const rowNum = matrix.length;
    const colNum = matrix[0].length;

    const row = Math.floor(index / colNum);
    const col = index - row * colNum;

    return matrix[row][col];
}
// @lc code=end
