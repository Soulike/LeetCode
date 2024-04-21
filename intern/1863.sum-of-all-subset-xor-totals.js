/*
 * @lc app=leetcode id=1863 lang=javascript
 *
 * [1863] Sum of All Subset XOR Totals
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var subsetXORSum = function (nums) {
  let currentXORSum = 0;
  let result = 0;

  function backtrack(startIndex) {
    result += currentXORSum;

    for (let i = startIndex; i < nums.length; i++) {
      currentXORSum ^= nums[i];
      backtrack(i + 1);
      currentXORSum ^= nums[i];
    }
  }

  backtrack(0);

  return result;
};
// @lc code=end
