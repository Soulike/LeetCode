/*
 * @lc app=leetcode id=485 lang=javascript
 *
 * [485] Max Consecutive Ones
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  let left = 0;
  let right = 0;

  while (nums[left] === 0) {
    left++;
  }
  right = left;

  let maxLength = 0;

  while (right < nums.length) {
    if (nums[right] === 1) {
      right++;
    } else {
      maxLength = Math.max(maxLength, right - left);

      left = right;
      while (nums[left] === 0) {
        left++;
      }
      right = left;
    }
  }

  maxLength = Math.max(maxLength, right - left);

  return maxLength;
};
// @lc code=end
