/*
 * @lc app=leetcode id=189 lang=javascript
 *
 * [189] Rotate Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const rotate = function (nums, k) {
  k %= nums.length;

  let temp = nums[0];
  let currentIndex = 0;

  let lastIndex = 0;
  let counter = 0;

  while (counter < nums.length) {
    currentIndex = (currentIndex + k) % nums.length;
    [temp, nums[currentIndex]] = [nums[currentIndex], temp];
    counter++;
    // 防止陷入循环，记录上一次从哪里开始替换的
    if (currentIndex === lastIndex) {
      currentIndex++;
      temp = nums[currentIndex];
      lastIndex = currentIndex;
    }
  }
};
// @lc code=end
