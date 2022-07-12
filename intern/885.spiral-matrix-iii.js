/*
 * @lc app=leetcode id=885 lang=javascript
 *
 * [885] Spiral Matrix III
 */

// @lc code=start
/**
 * @param {number} rows
 * @param {number} cols
 * @param {number} rStart
 * @param {number} cStart
 * @return {number[][]}
 */
const spiralMatrixIII = function (rows, cols, rStart, cStart) {
    /**奇数向右向下，偶数向左向上 */
    let stepSize = 1;
    let x = rStart;
    let y = cStart;
    const TOTAL_SIZE = rows * cols;
    /**@type {number[][]} */
    const corrdinates = [[x, y]];
    while (corrdinates.length < TOTAL_SIZE) {
        for (let i = 0; i < stepSize; i++) {
            if (stepSize % 2) {
                y++;
            } else {
                y--;
            }
            if (x >= 0 && x < rows && y >= 0 && y < cols) {
                corrdinates.push([x, y]);
            }
        }
        for (let i = 0; i < stepSize; i++) {
            if (stepSize % 2) {
                x++;
            } else {
                x--;
            }
            if (x >= 0 && x < rows && y >= 0 && y < cols) {
                corrdinates.push([x, y]);
            }
        }
        stepSize++;
    }
    return corrdinates;
};
// @lc code=end
