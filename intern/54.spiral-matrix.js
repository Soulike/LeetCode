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
const spiralOrder = function (matrix) {
  const m = matrix.length;
  if (m === 0) {
    return [];
  }
  const n = matrix[0].length;
  if (n === 0) {
    return [];
  }
  let [top, right, bottom, left] = [0, n - 1, m - 1, 0];
  /**@type {number[]} */
  const result = [];
  while (true) {
    if (left <= right) {
      getTop(matrix, top, left, right, result);
      ++top;
    } else {
      break;
    }

    if (top <= bottom) {
      getRight(matrix, right, top, bottom, result);
      --right;
    } else {
      break;
    }

    if (left <= right) {
      getBottom(matrix, bottom, left, right, result);
      --bottom;
    } else {
      break;
    }

    if (top <= bottom) {
      getLeft(matrix, left, top, bottom, result);
      ++left;
    } else {
      break;
    }
  }
  return result;
};

/**
 * @param {number[][]} matrix
 * @param {number} top
 * @param {number} left
 * @param {number} right
 * @param {number[]} array
 * @return {void}
 */
function getTop(matrix, top, left, right, array) {
  array.push(...matrix[top].slice(left, right + 1));
}

/**
 * @param {number[][]} matrix
 * @param {number} right
 * @param {number} top
 * @param {number} bottom
 * @param {number[]} array
 * @return {void}
 */
function getRight(matrix, right, top, bottom, array) {
  for (let i = top; i <= bottom; i++) {
    array.push(matrix[i][right]);
  }
}

/**
 * @param {number[][]} matrix
 * @param {number} bottom
 * @param {number} left
 * @param {number} right
 * @param {number[]} array
 * @return {void}
 */
function getBottom(matrix, bottom, left, right, array) {
  array.push(...matrix[bottom].slice(left, right + 1).reverse());
}

/**
 * @param {number[][]} matrix
 * @param {number} left
 * @param {number} top
 * @param {number} bottom
 * @param {number[]} array
 * @return {void}
 */
function getLeft(matrix, left, top, bottom, array) {
  for (let i = bottom; i >= top; i--) {
    array.push(matrix[i][left]);
  }
}
// @lc code=end

console.log(spiralOrder([[1]]));
