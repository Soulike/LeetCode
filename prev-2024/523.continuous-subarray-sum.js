/*
 * @lc app=leetcode id=523 lang=javascript
 *
 * [523] Continuous Subarray Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function (nums, k) {
  const n = nums.length;
  if (n < 2) {
    return false;
  }

  let currentSum = 0;

  /** @type {Map<number, number>} */
  const remainderToLeftMostIndex = new Map();

  for (let i = 0; i <= n; i++) {
    if (i > 0) {
      currentSum += nums[i - 1];
    }
    const remainder = currentSum % k;
    if (remainderToLeftMostIndex.has(remainder)) {
      const leftMostIndex = remainderToLeftMostIndex.get(remainder);
      if (i - leftMostIndex >= 2) {
        return true;
      }
    } else {
      remainderToLeftMostIndex.set(remainder, i);
    }
  }

  return false;
};
// @lc code=end
