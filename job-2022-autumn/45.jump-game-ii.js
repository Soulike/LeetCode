/*
 * @lc app=leetcode id=45 lang=javascript
 *
 * [45] Jump Game II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let n = nums.length;
  let end = 0,
    farthest = 0;
  let jumps = 0;
  for (let i = 0; i < n - 1; i++) {
    farthest = Math.max(nums[i] + i, farthest);
    if (end === i) {
      jumps++;
      end = farthest;
    }
  }
  return jumps;
};
// @lc code=end

jump([3, 2, 1]);
