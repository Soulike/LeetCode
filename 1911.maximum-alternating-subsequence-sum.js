/*
 * @lc app=leetcode id=1911 lang=javascript
 *
 * [1911] Maximum Alternating Subsequence Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const maxAlternatingSum = function (nums)
{
    let maxSum = nums[0];
    for (let i = 1; i < nums.length; i++)
    {
        if (nums[i] - nums[i - 1] > 0)
        {
            maxSum += nums[i] - nums[i - 1];
        }
    }
    return maxSum;
};
// @lc code=end