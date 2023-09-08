/*
 * @lc app=leetcode id=118 lang=javascript
 *
 * [118] Pascal's Triangle
 */

// @lc code=start
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
    /** @type {number[][]} */
    const triangle = [];

    for (let i = 0; i < numRows; i++) {
        const ROW_SIZE = i + 1;
        const row = new Array(ROW_SIZE);
        const prevRow = triangle[i - 1];

        row[0] = row[ROW_SIZE - 1] = 1;
        for (let j = 1; j < ROW_SIZE - 1; j++) {
            row[j] = prevRow[j - 1] + prevRow[j];
        }

        triangle[i] = row;
    }

    return triangle;
};
// @lc code=end
