/*
 * @lc app=leetcode id=2133 lang=javascript
 *
 * [2133] Check if Every Row and Column Contains All Numbers
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {boolean}
 */
var checkValid = function (matrix) {
    const n = matrix.length;

    /**
     * 287. Find the Duplicate Number
     * @param {number} i
     * @returns {boolean}
     */
    function checkRowValid(i) {
        const arr = matrix[i];

        let result = true;
        for (let i = 0; i < n; i++) {
            const index = Math.abs(arr[i]) - 1;
            if (arr[index] < 0) {
                result = false;
                break;
            } else {
                arr[index] *= -1;
            }
        }

        for (let i = 0; i < n; i++) {
            arr[i] = Math.abs(arr[i]);
        }

        return result;
    }

    /**
     * @param {number} j
     * @returns {boolean}
     */
    function checkColumnValid(j) {
        let result = true;
        for (let i = 0; i < n; i++) {
            const index = Math.abs(matrix[i][j]) - 1;
            if (matrix[index][j] < 0) {
                result = false;
                break;
            } else {
                matrix[index][j] *= -1;
            }
        }

        for (let i = 0; i < n; i++) {
            matrix[i][j] = Math.abs(matrix[i][j]);
        }

        return result;
    }

    for (let i = 0; i < n; i++) {
        if (!checkRowValid(i) || !checkColumnValid(i)) {
            return false;
        }
    }

    return true;
};
// @lc code=end
