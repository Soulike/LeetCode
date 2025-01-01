/*
 * @lc app=leetcode id=90 lang=javascript
 *
 * [90] Subsets II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  nums.sort((a, b) => a - b);

  /** @type {number[][]} */
  const results = [];
  /** @type {number[]} */
  const result = [];

  /**
   * @param {number} startIndex
   */
  const backtrack = (startIndex) => {
    results.push([...result]);

    if (startIndex === nums.length) {
      return;
    }

    for (let i = startIndex; i < nums.length; i++) {
      if (i === startIndex || nums[i] !== nums[i - 1]) {
        result.push(nums[i]);
        backtrack(i + 1);
        result.pop();
      }
    }
  };

  backtrack(0);

  return results;
};
// @lc code=end
