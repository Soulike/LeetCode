/*
 * @lc app=leetcode id=2971 lang=javascript
 *
 * [2971] Find Polygon With the Largest Perimeter
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var largestPerimeter = function (nums) {
    nums.sort((a, b) => a - b);
    const prefixSum = new Array(nums.length);
    prefixSum[0] = nums[0];
    for (let i = 1; i < nums.length; i++) {
        prefixSum[i] = nums[i] + prefixSum[i - 1];
    }

    for (let i = nums.length - 1; i >= 2; i--) {
        if (nums[i] < prefixSum[i - 1]) {
            return prefixSum[i];
        }
    }

    return -1;
};
// @lc code=end

largestPerimeter([5, 5, 50]);
