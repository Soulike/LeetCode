/*
 * @lc app=leetcode id=152 lang=javascript
 *
 * [152] Maximum Product Subarray
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const maxProduct = function (nums) 
{
    const LENGTH = nums.length;
    
    let lastMax = nums[0];
    let lastMin = nums[0];

    let currentMax;
    let currentMin;

    let result = nums[0];
    
    for (let i = 1; i < LENGTH; i++)
    {
        currentMax = Math.max(lastMax * nums[i], lastMin * nums[i], nums[i]);
        currentMin = Math.min(lastMax * nums[i], lastMin * nums[i], nums[i]);
        result = Math.max(result, currentMax);
        lastMax = currentMax;
        lastMin = currentMin;
    }
    return result;
};
// @lc code=end