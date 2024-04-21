/*
 * @lc app=leetcode id=977 lang=javascript
 *
 * [977] Squares of a Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  /** @type {number[]} */
  const result = new Array(nums.length);
  let currentIndex = result.length - 1;

  while (left <= right) {
    if (Math.abs(nums[left]) > Math.abs(nums[right])) {
      result[currentIndex] = nums[left] ** 2;
      left++;
    } else {
      result[currentIndex] = nums[right] ** 2;
      right--;
    }
    currentIndex--;
  }

  return result;
};
// @lc code=end

sortedSquares([-4, -1, 0, 3, 10]);
