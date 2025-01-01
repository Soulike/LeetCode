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

  const rowPrefixSums = getMatrixRowPrefixSum(matrix);

  let sumToTargetCount = 0;

  for (let y1 = 0; y1 < N; y1++) {
    for (let y2 = y1; y2 < N; y2++) {
      /**
       * Limit the column range to [y1, y2]
       * In this column range, iterate x
       * Calculate row prefix sum of [0, x]
       * Then the problem becomes https://leetcode.com/problems/subarray-sum-equals-k/
       */

      let rowPrefixSumInColRange = 0;
      /** @type {Map<number, number>} */
      let prefixSumToCount = new Map([[0, 1]]);
      for (let x = 0; x < M; x++) {
        rowPrefixSumInColRange +=
          rowPrefixSums[x][y2] - (y1 - 1 >= 0 ? rowPrefixSums[x][y1 - 1] : 0);
        sumToTargetCount +=
          prefixSumToCount.get(rowPrefixSumInColRange - target) ?? 0;

        prefixSumToCount.set(
          rowPrefixSumInColRange,
          (prefixSumToCount.get(rowPrefixSumInColRange) ?? 0) + 1,
        );
      }
    }
  }

  return sumToTargetCount;
};

/**
 * @param {number[][]} matrix
 * @returns {number[][]}
 */
function getMatrixRowPrefixSum(matrix) {
  const M = matrix.length;
  const N = matrix[0].length;
  const rowPrefixSum = new Array(M);
  for (let i = 0; i < rowPrefixSum.length; i++) {
    rowPrefixSum[i] = new Array(N);
  }

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      rowPrefixSum[i][j] =
        (j - 1 >= 0 ? rowPrefixSum[i][j - 1] : 0) + matrix[i][j];
    }
  }

  return rowPrefixSum;
}
// @lc code=end

numSubmatrixSumTarget(
  [
    [1, -1],
    [-1, 1],
  ],
  0,
);
