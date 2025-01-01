/*
 * @lc app=leetcode id=1827 lang=javascript
 *
 * [1827] Minimum Operations to Make the Array Increasing
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  let count = 0;
  let prev = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (prev >= nums[i]) {
      count += prev - nums[i] + 1;
      prev = prev + 1;
    } else {
      prev = nums[i];
    }
  }

  return count;
};
// @lc code=end
