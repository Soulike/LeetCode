/*
 * @lc app=leetcode id=283 lang=javascript
 *
 * [283] Move Zeroes
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  const k = removeElement(nums, 0);

  nums.fill(0, k);
};

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
function removeElement(nums, val) {
  let left = 0;
  let right = 0;

  while (right < nums.length) {
    if (nums[right] !== val) {
      nums[left] = nums[right];
      left++;
    }
    right++;
  }

  return left;
}
// @lc code=end
