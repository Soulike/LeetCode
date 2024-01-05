/*
 * @lc app=leetcode id=300 lang=javascript
 *
 * [300] Longest Increasing Subsequence
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
    /**
     * dp[i] the max LIS ends with nums[i]
     *
     * base case
     * dp[i] = 1
     *
     * dp[i] =
     * for j from 0 to i-1
     * if nums[j] < nums[i]
     *  max(dp[j]) + 1
     *
     * @type {number[]}
     */
    const dp = new Array(nums.length);
    dp.fill(1);

    let maxLIS = 1;

    for (let i = 1; i < nums.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[j] + 1, dp[i]);
            }
        }
        maxLIS = Math.max(maxLIS, dp[i]);
    }

    return maxLIS;
};
// @lc code=end

lengthOfLIS([1, 3, 6, 7, 9, 4, 10, 5, 6]);
