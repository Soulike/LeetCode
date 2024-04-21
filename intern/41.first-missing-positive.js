/*
 * @lc app=leetcode id=41 lang=javascript
 *
 * [41] First Missing Positive
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    while (nums[i] !== i + 1 && nums[i] <= nums.length && nums[i] > 0) {
      const anotherIndex = nums[i] - 1;
      if (nums[anotherIndex] === nums[i]) {
        nums[i] = undefined;
        break;
      } else {
        [nums[i], nums[anotherIndex]] = [nums[anotherIndex], nums[i]];
      }
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  return nums.length + 1;
};
// @lc code=end
