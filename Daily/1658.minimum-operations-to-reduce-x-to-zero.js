/*
 * @lc app=leetcode id=1658 lang=javascript
 *
 * [1658] Minimum Operations to Reduce X to Zero
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minOperations = function (nums, x) {
    const sum = nums.reduce((prev, curr) => prev + curr);
    if (sum === x) return nums.length;

    const result = findLongestSumSubarrayLength(nums, sum - x);
    return result === -1 ? -1 : nums.length - result;
};

/**
 * @param {number[]} nums - all nums[i] must be non-negative
 * @param {number} sum
 * @returns {number}
 */
function findLongestSumSubarrayLength(nums, sum) {
    let left = 0;
    let right = 0;

    let currentSum = 0;
    let maxSubarrayLength = -1;

    while (right < nums.length) {
        currentSum += nums[right];
        while (currentSum > sum) {
            currentSum -= nums[left];
            left++;
        }

        if (currentSum === sum) {
            maxSubarrayLength = Math.max(maxSubarrayLength, right - left + 1);
        }

        right++;
    }

    return maxSubarrayLength;
}
// @lc code=end
