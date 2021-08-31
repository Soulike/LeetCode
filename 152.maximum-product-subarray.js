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
    /**
     * @type {number[]}
     * 从 0 到 i 最大的累积
     */
    const maxDP = new Array(LENGTH);
    /**
     * @type {number[]}
     * 从 0 到 i 最小的累积
     */
    const minDP = new Array(LENGTH);

    maxDP[0] = nums[0];
    minDP[0] = nums[0];
    let result = nums[0];

    for (let i = 1; i < LENGTH; i++)
    {
        maxDP[i] = Math.max(maxDP[i - 1] * nums[i], minDP[i - 1] * nums[i], nums[i]);
        minDP[i] = Math.min(maxDP[i - 1] * nums[i], minDP[i - 1] * nums[i], nums[i]);
        result = Math.max(result, maxDP[i]);
    }
    return result;
};
// @lc code=end