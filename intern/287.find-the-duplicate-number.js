/*
 * @lc app=leetcode id=287 lang=javascript
 *
 * [287] Find the Duplicate Number
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const findDuplicate = function (nums) {
  let slow = 0,
    fast = 0,
    t = 0;
  while (true) {
    slow = nums[slow];
    fast = nums[nums[fast]];
    if (slow === fast) break;
  }
  while (true) {
    slow = nums[slow];
    t = nums[t];
    if (slow === t) break;
  }
  return slow;
};
// @lc code=end
