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
const searchMatrix = function (matrix, target) {
  return matrixBinarySearch(matrix, target);
};

/**
 *
 * @param {number[][]} matrix
 * @param {number} target
 * @returns {boolean}
 */
function matrixBinarySearch(matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;
  /**
   * @param {number} index
   * @returns {number}
   */
  function getMatrixValue(index) {
    const y = index % n;
    const x = (index - y) / n;

    return matrix[x][y];
  }

  let startIndex = 0;
  let endIndex = m * n - 1;

  while (startIndex <= endIndex) {
    const midIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
    const midVal = getMatrixValue(midIndex);

    if (midVal === target) {
      return true;
    } else if (midVal < target) {
      startIndex = midIndex + 1;
    } else if (midVal > target) {
      endIndex = midIndex - 1;
    }
  }

  return false;
}
// @lc code=end
