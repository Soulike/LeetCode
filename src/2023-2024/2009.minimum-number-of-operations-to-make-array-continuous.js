/*
 * @lc app=leetcode id=2009 lang=javascript
 *
 * [2009] Minimum Number of Operations to Make Array Continuous
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  const numsSet = new Set(nums);
  const uniqueNums = Array.from(numsSet.values());

  uniqueNums.sort((a, b) => a - b);

  let left = 0;
  let right = 0;
  let operationNum = nums.length;

  while (left < uniqueNums.length) {
    while (
      right < uniqueNums.length &&
      uniqueNums[right] - uniqueNums[left] <= nums.length - 1
    ) {
      right++;
    }

    const rangeCount = right - left;
    operationNum = Math.min(operationNum, nums.length - rangeCount);
    left++;
  }

  return operationNum;
};
// @lc code=end
