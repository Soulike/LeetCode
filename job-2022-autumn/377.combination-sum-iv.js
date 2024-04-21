/*
 * @lc app=leetcode id=377 lang=javascript
 *
 * [377] Combination Sum IV
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
  const cache = new Map();

  /**
   * @param {number} target
   * @returns {number}
   */
  const helper = (target) => {
    if (cache.has(target)) {
      return cache.get(target);
    }

    if (target < 0) {
      return 0;
    }
    if (target === 0) {
      return 1;
    }

    let sum = 0;

    for (const num of nums) {
      sum += helper(target - num);
    }

    cache.set(target, sum);
    return sum;
  };

  return helper(target);
};
// @lc code=end
