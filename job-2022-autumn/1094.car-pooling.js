/*
 * @lc app=leetcode id=1094 lang=javascript
 *
 * [1094] Car Pooling
 */

// @lc code=start
/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
var carPooling = function (trips, capacity) {
  const diff = [];
  for (const [num, from, to] of trips) {
    if (!diff[from]) {
      diff[from] = 0;
    }
    diff[from] += num;

    if (!diff[to]) {
      diff[to] = 0;
    }
    diff[to] -= num;
  }

  const sum = new Array(diff.length);
  for (let i = 0; i < diff.length; i++) {
    sum[i] = (diff[i] ?? 0) + (i >= 1 ? sum[i - 1] : 0);
    if (sum[i] > capacity) {
      return false;
    }
  }

  return true;
};
// @lc code=end
