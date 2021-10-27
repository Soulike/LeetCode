/*
 * @lc app=leetcode id=553 lang=javascript
 *
 * [553] Optimal Division
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {string}
 */
const optimalDivision = function (nums)
{
    if (nums.length === 1)
    {
        return `${nums[0]}`;
    }
    else if (nums.length === 2)
    {
        return `${nums[0]}/${nums[1]}`;
    }
    else
    {
        const dominator = nums.slice(1).join('/');
        return `${nums[0]}/(${dominator})`;
    }
};
// @lc code=end