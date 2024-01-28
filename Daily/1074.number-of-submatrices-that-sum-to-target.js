/*
 * @lc app=leetcode id=1074 lang=javascript
 *
 * [1074] Number of Submatrices That Sum to Target
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {number}
 */
var numSubmatrixSumTarget = function (matrix, target) {
    const M = matrix.length;
    const N = matrix[0].length;

    const prefixSum = getMatrixPrefixSum(matrix);

    let sumToTargetCount = 0;
    for (let x1 = 0; x1 < M; x1++) {
        for (let y1 = 0; y1 < N; y1++) {
            for (let x2 = x1; x2 < M; x2++) {
                for (let y2 = y1; y2 < N; y2++) {
                    const sum = getSubMatrixSum(prefixSum, [x1, y1], [x2, y2]);
                    if (sum === target) sumToTargetCount++;
                }
            }
        }
    }

    return sumToTargetCount;
};

/**
 * @param {number[][]} matrix
 * @returns {number[][]}
 */
function getMatrixPrefixSum(matrix) {
    const M = matrix.length;
    const N = matrix[0].length;
    const prefixSum = new Array(M);
    for (let i = 0; i < prefixSum.length; i++) {
        prefixSum[i] = new Array(N);
    }

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            prefixSum[i][j] =
                (i - 1 >= 0 ? prefixSum[i - 1][j] : 0) +
                (j - 1 >= 0 ? prefixSum[i][j - 1] : 0) -
                (i - 1 >= 0 && j - 1 >= 0 ? prefixSum[i - 1][j - 1] : 0) +
                matrix[i][j];
        }
    }

    return prefixSum;
}

/**
 *
 * @param {number[][]} matrixPrefixSum
 * @param {[x: number, y: number]} coordinate1
 * @param {[x: number, y: number]} coordinate2
 * @returns {number}
 */
function getSubMatrixSum(matrixPrefixSum, coordinate1, coordinate2) {
    let [x1, y1] = coordinate1;
    let [x2, y2] = coordinate2;
    [x1, x2] = [Math.min(x1, x2), Math.max(x1, x2)];
    [y1, y2] = [Math.min(y1, y2), Math.max(y1, y2)];

    const subMatrixSum =
        matrixPrefixSum[x2][y2] -
        (y1 - 1 >= 0 ? matrixPrefixSum[x2][y1 - 1] : 0) -
        (x1 - 1 >= 0 ? matrixPrefixSum[x1 - 1][y2] : 0) +
        (x1 - 1 >= 0 && y1 - 1 >= 0 ? matrixPrefixSum[x1 - 1][y1 - 1] : 0);

    return subMatrixSum;
}
// @lc code=end
