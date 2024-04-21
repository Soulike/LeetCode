/*
 * @lc app=leetcode id=2348 lang=javascript
 *
 * [2348] Number of Zero-Filled Subarrays
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var zeroFilledSubarray = function (nums) {
  let currentRangeLength = 0;
  let subarrayNumber = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      currentRangeLength++;
    } else {
      subarrayNumber += getArithmeticProgressionSum(
        1,
        currentRangeLength,
        currentRangeLength,
      );
      currentRangeLength = 0;
    }
  }

  subarrayNumber += getArithmeticProgressionSum(
    1,
    currentRangeLength,
    currentRangeLength,
  );

  return subarrayNumber;
};

/**
 * @param {number} a_0
 * @param {number} a_n
 * @param {number} n
 * @returns {number}
 */
function getArithmeticProgressionSum(a_0, a_n, n) {
  return ((a_0 + a_n) / 2) * n;
}
// @lc code=end

zeroFilledSubarray([0, 0, 0, 0, 0]);
