/*
 * @lc app=leetcode id=918 lang=javascript
 *
 * [918] Maximum Sum Circular Subarray
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubarraySumCircular = function (nums) {
  const sum = nums.reduce((prev, curr) => prev + curr);

  const maxSubArraySum = getMaxSubArraySum(nums);
  const minSubArraySum = getMinSubArraySum(nums);

  return minSubArraySum === sum
    ? maxSubArraySum
    : Math.max(maxSubArraySum, sum - minSubArraySum);
};

/**
 * @param {number[]} nums
 * @returns {number}
 */
function getMaxSubArraySum(nums) {
  const N = nums.length;
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < N; i++) {
    currentSum = Math.max(currentSum + nums[i], nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

/**
 * @param {number[]} nums
 * @returns {number}
 */
function getMinSubArraySum(nums) {
  const N = nums.length;
  let currentSum = nums[0];
  let minSum = nums[0];

  for (let i = 1; i < N; i++) {
    currentSum = Math.min(currentSum + nums[i], nums[i]);
    minSum = Math.min(minSum, currentSum);
  }

  return minSum;
}

// @lc code=end
