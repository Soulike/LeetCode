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
    const M = matrix.length;
    const N = matrix[0].length;

    let horizontalSteps = N;
    let verticalSteps = M;

    /** @type {number[]} */
    const answer = [];

    let x = 0;
    let y = -1;

    while (true) {
        if (horizontalSteps === 0) break;
        for (let i = 0; i < horizontalSteps; i++) {
            y++;
            answer.push(matrix[x][y]);
        }
        verticalSteps--;

        if (verticalSteps === 0) break;
        for (let i = 0; i < verticalSteps; i++) {
            x++;
            answer.push(matrix[x][y]);
        }
        horizontalSteps--;

        if (horizontalSteps === 0) break;
        for (let i = 0; i < horizontalSteps; i++) {
            y--;
            answer.push(matrix[x][y]);
        }
        verticalSteps--;

        if (verticalSteps === 0) break;
        for (let i = 0; i < verticalSteps; i++) {
            x--;
            answer.push(matrix[x][y]);
        }
        horizontalSteps--;
    }

    return answer;
};
// @lc code=end
