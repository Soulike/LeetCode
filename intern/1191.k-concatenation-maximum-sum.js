/*
 * @lc app=leetcode id=1191 lang=javascript
 *
 * [1191] K-Concatenation Maximum Sum
 */

// @lc code=start
/**
 * https://leetcode.com/problems/k-concatenation-maximum-sum/discuss/382885/Short-and-concise-O(N)-C%2B%2B-solution
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var kConcatenationMaxSum = function (arr, k) {
  const MOD = 10 ** 9 + 7;
  const arrSum = arr.reduce((prev, curr) => prev + curr);

  if (k > 1) {
    return ((k - 2) * Math.max(arrSum, 0) + maxSubArray(arr, 2)) % MOD;
  } else {
    return maxSubArray(arr, 1) % MOD;
  }
};

function maxSubArray(nums, k) {
  let maxSum = 0;
  let lastSum = 0;

  for (let i = 0; i < nums.length * k; i++) {
    lastSum = Math.max(lastSum + nums[i % nums.length], nums[i % nums.length]);
    maxSum = Math.max(maxSum, lastSum);
  }

  return maxSum;
}
// @lc code=end

console.log(kConcatenationMaxSum([1, -1], 1));
