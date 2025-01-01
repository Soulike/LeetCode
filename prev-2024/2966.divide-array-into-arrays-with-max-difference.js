/*
 * @lc app=leetcode id=2966 lang=javascript
 *
 * [2966] Divide Array Into Arrays With Max Difference
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[][]}
 */
var divideArray = function (nums, k) {
  nums.sort((a, b) => a - b);

  /** @type {[number, number, number][]} */
  const result = [];

  for (let i = 0; i < nums.length - 2; i += 3) {
    const min = nums[i];
    const max = nums[i + 2];
    if (max - min <= k) {
      result.push([nums[i], nums[i + 1], nums[i + 2]]);
    } else return [];
  }

  return result;
};
// @lc code=end
