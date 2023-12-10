/*
 * @lc app=leetcode id=867 lang=javascript
 *
 * [867] Transpose Matrix
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var transpose = function (matrix) {
    const M = matrix.length;
    const N = matrix[0].length;

    const transposedMatrix = new Array(N);
    for (let i = 0; i < N; i++) {
        transposedMatrix[i] = new Array(M);
    }

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            transposedMatrix[j][i] = matrix[i][j];
        }
    }

    return transposedMatrix;
};
// @lc code=end
