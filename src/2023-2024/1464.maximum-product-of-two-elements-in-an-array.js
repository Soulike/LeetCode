/*
 * @lc app=leetcode id=1464 lang=javascript
 *
 * [1464] Maximum Product of Two Elements in an Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let maxNum = 0;
  let secondMaxNum = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > maxNum) {
      secondMaxNum = maxNum;
      maxNum = nums[i];
    } else {
      secondMaxNum = Math.max(secondMaxNum, nums[i]);
    }
  }

  return (maxNum - 1) * (secondMaxNum - 1);
};
// @lc code=end

maxProduct([3, 4, 5, 2]);
