/*
 * @lc app=leetcode id=1292 lang=javascript
 *
 * [1292] Maximum Side Length of a Square with Sum Less than or Equal to Threshold
 */

// @lc code=start
/**
 * @param {number[][]} mat
 * @param {number} threshold
 * @return {number}
 */
const maxSideLength = function (mat, threshold) {
  const cache = new Map();
  let minSideLength = 1;
  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[0].length; j++) {
      while (
        i + minSideLength - 1 < mat.length &&
        j + minSideLength - 1 < mat[0].length &&
        matrixSum(mat, i, j, minSideLength, cache) <= threshold
      ) {
        minSideLength++;
      }
    }
  }
  return minSideLength - 1;
};

/**
 * @param {readonly (readonly number[])[]} matrix
 * @param {number} leftTopX
 * @param {number} leftTopY
 * @param {number} sideLength
 * @param {Map<`${number}-${number}`, Map<number, number>>} cache
 */
function matrixSum(matrix, leftTopX, leftTopY, sideLength, cache) {
  if (sideLength === 0) {
    return 0;
  }

  const leftTopSumCache = cache.get(`${leftTopX}-${leftTopY}`);
  if (leftTopSumCache === undefined) {
    let sum = 0;
    for (let i = 0; i < sideLength; i++) {
      for (let j = 0; j < sideLength; j++) {
        sum += matrix[leftTopX + i][leftTopY + j];
      }
    }
    cache.set(`${leftTopX}-${leftTopY}`, new Map([[sideLength, sum]]));
    return sum;
  } else {
    let sum = 0;
    let cachedSideLength = 0;
    for (let i = sideLength; i >= 1; i--) {
      const leftTopSumCacheInISideLength = leftTopSumCache.get(i);
      if (leftTopSumCacheInISideLength !== undefined) {
        cachedSideLength = i;
        sum = leftTopSumCacheInISideLength;
        break;
      }
    }
    for (let i = cachedSideLength; i < sideLength; i++) {
      for (let j = 0; j < sideLength; j++) {
        sum += matrix[leftTopX + i][leftTopY + j];
      }
    }
    for (let i = 0; i < sideLength; i++) {
      for (let j = cachedSideLength; j < sideLength; j++) {
        sum += matrix[leftTopX + i][leftTopY + j];
      }
    }
    sum -= matrixSum(
      matrix,
      leftTopX + cachedSideLength,
      leftTopY + cachedSideLength,
      sideLength - cachedSideLength,
      cache,
    );
    leftTopSumCache.set(sideLength, sum);
    return sum;
  }
}
// @lc code=end
