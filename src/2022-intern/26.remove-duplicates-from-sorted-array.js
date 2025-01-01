/*
 * @lc app=leetcode id=26 lang=javascript
 *
 * [26] Remove Duplicates from Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let slow = 0;
  let fast = 0;

  while (fast < nums.length) {
    if (fast === 0 || nums[fast - 1] !== nums[fast]) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }

  return slow;
};
// @lc code=end
