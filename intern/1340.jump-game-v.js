/*
 * @lc app=leetcode id=1340 lang=javascript
 *
 * [1340] Jump Game V
 */

// @lc code=start

/**
 * @param {number[]} arr
 * @param {number} d
 * @return {number}
 */
var maxJumps = function (arr, d) {
  const n = arr.length;
  const cache = new Map();
  /**
   * 在 i 位置起跳，能经过的最多地点数量
   */
  function helper(i) {
    if (cache.has(i)) {
      return cache.get(i);
    }
    let leftCount = 0;
    let rightCount = 0;
    if (i - 1 >= 0) {
      let max = 0;
      let maxIndexes = [];
      for (let dis = 1; dis <= d; dis++) {
        if (i - dis < 0 || arr[i - dis] >= arr[i]) {
          break;
        }
        if (arr[i - dis] > max) {
          max = arr[i - dis];
        }
      }

      for (let dis = 1; dis <= d; dis++) {
        if (i - dis < 0 || arr[i - dis] >= arr[i]) {
          break;
        }
        if (arr[i - dis] === max) {
          maxIndexes.push(i - dis);
        }
      }
      for (const maxIndex of maxIndexes) {
        leftCount = Math.max(leftCount, helper(maxIndex));
      }
    }
    if (i + 1 < n) {
      let max = 0;
      let maxIndexes = [];
      for (let dis = 1; dis <= d; dis++) {
        if (i + dis >= n || arr[i + dis] >= arr[i]) {
          break;
        }
        if (arr[i + dis] > max) {
          max = arr[i + dis];
        }
      }

      for (let dis = 1; dis <= d; dis++) {
        if (i + dis >= n || arr[i + dis] >= arr[i]) {
          break;
        }
        if (arr[i + dis] === max) {
          maxIndexes.push(i + dis);
        }
      }
      for (const maxIndex of maxIndexes) {
        rightCount = Math.max(rightCount, helper(maxIndex));
      }
    }

    const result = 1 + Math.max(leftCount, rightCount);
    cache.set(i, result);
    return result;
  }

  let max = 0;
  for (let i = 0; i < n; i++) {
    max = Math.max(max, helper(i));
  }

  return max;
};
// @lc code=end
