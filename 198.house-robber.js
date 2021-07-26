/*
 * @lc app=leetcode id=198 lang=javascript
 *
 * [198] House Robber
 */

// @lc code=start

/**
 * @param {number[]} nums
 * @return {number}
 */
const rob = function (nums) 
{
    if (nums.length === 1)
    {
        return nums[0];
    }
    let evenMax = nums[0];
    let oddMax = Math.max(nums[0], nums[1]);
    for (let i = 2; i < nums.length; i++)
    {
        if (i % 2 === 0)
        {
            evenMax = Math.max(oddMax, evenMax + nums[i]);
        }
        else
        {
            oddMax = Math.max(evenMax, oddMax + nums[i]);
        }
    }
    return Math.max(oddMax, evenMax);
};
// @lc code=end