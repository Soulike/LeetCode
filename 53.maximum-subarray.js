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
const maxSubArray = function (nums)
{
    let maxSum = nums[0];
    let lastSum = nums[0];

    for (let i = 1; i < nums.length; i++)
    {
        lastSum = Math.max(lastSum + nums[i], nums[i]);
        maxSum = Math.max(maxSum, lastSum);
    }

    return maxSum;
};
// @lc code=end

