/*
 * @lc app=leetcode id=54 lang=javascript
 *
 * [54] Spiral Matrix
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
    const m = matrix.length;
    const n = matrix[0].length;

    const result = [];
    let horizontalStep = n;
    let verticalStep = m - 1;

    let x = 0;
    let y = 0;

    while (true) {
        if (horizontalStep === 0) break;
        // to right
        for (let i = 0; i < horizontalStep; i++) {
            result.push(matrix[x][y]);
            y++;
        }
        y--;
        x++;
        horizontalStep--;

        if (verticalStep === 0) break;
        // to down
        for (let i = 0; i < verticalStep; i++) {
            result.push(matrix[x][y]);
            x++;
        }
        x--;
        y--;
        verticalStep--;

        if (horizontalStep === 0) break;
        // to left
        for (let i = 0; i < horizontalStep; i++) {
            result.push(matrix[x][y]);
            y--;
        }
        y++;
        x--;
        horizontalStep--;

        if (verticalStep === 0) break;
        // to up
        for (let i = 0; i < verticalStep; i++) {
            result.push(matrix[x][y]);
            x--;
        }
        x++;
        y++;
        verticalStep--;
    }

    return result;
};
// @lc code=end
