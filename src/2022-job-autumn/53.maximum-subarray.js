/*
 * @lc app=leetcode id=53 lang=javascript
 *
 * [53] Maximum Subarray
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  const n = nums.length;
  /**
   * subArrayMaxSum[i] 以 i 结尾的最大连续数组和
   *
   * base case
   * subArrayMaxSum[0] = nums[0]
   *
   * subArrayMaxSum[i] = subArrayMaxSum[i-1] > 0 ? subArrayMaxSum[i-1] + nums[i] : nums[i]
   *
   * 空间压缩
   *
   * currentMaxSum = currentMaxSum > 0 ? currentMaxSum + nums[i] : nums[i]
   * @type {number}
   */
  let currentMaxSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < n; i++) {
    currentMaxSum = currentMaxSum > 0 ? currentMaxSum + nums[i] : nums[i];
    maxSum = Math.max(currentMaxSum, maxSum);
  }

  return maxSum;
};
// @lc code=end
