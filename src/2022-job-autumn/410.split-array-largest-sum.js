/*
 * @lc app=leetcode id=410 lang=javascript
 *
 * [410] Split Array Largest Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
var splitArray = function (nums, m) {
  let subArraySumLeft = 0;
  // sum of non-splitted array with maximum values
  let subArraySumRight = 1000 * 10 ** 6;

  const cache = new Map();

  while (subArraySumLeft <= subArraySumRight) {
    const subArraySumMid =
      subArraySumLeft + Math.floor((subArraySumRight - subArraySumLeft) / 2);
    const currentSplitNumber = getSpiltNumberBySum(subArraySumMid, nums, cache);

    // Find the upper bound
    if (currentSplitNumber > m) {
      subArraySumLeft = subArraySumMid + 1;
    } else if (currentSplitNumber <= m) {
      if (getSpiltNumberBySum(subArraySumMid - 1, nums, cache) > m) {
        return subArraySumMid;
      } else {
        subArraySumRight = subArraySumMid - 1;
      }
    }
  }
};

/**
 * When the sum is set, how many splits are needed to contain all numbers in nums
 * @param {number} sum
 * @param {number[]} nums
 * @param {Map<number, number>} cache
 * @returns {number}
 */
function getSpiltNumberBySum(sum, nums, cache) {
  if (cache.has(sum)) {
    return cache.get(sum);
  }
  let splitAmount = 0;
  let leftSum = sum;
  for (let i = 0; i < nums.length; i++) {
    if (sum < nums[i]) {
      return Infinity;
    }
    if (leftSum < nums[i]) {
      splitAmount++;
      leftSum = sum;
      i--;
    } else if (leftSum >= nums[i]) {
      leftSum -= nums[i];
    }
  }

  if (leftSum !== sum) splitAmount++;

  cache.set(sum, splitAmount);
  return splitAmount;
}
// @lc code=end
