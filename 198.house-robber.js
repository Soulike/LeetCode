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
    /** 
    * 从下标 i 位置的房屋开始抢，最多抢到多少钱
    * @type {number[]} */
    const cache = [];
    return Math.max(
        robHelper(nums, 0, cache),
        robHelper(nums, 1, cache));
};

/**
 * @param {number[]} nums
 * @param {number} left - 开始抢劫的房屋下标
 * @param {number[]} cache
 * @return {number}
 */
function robHelper(nums, left, cache)
{
    const LENGTH = nums.length;
    if (left === LENGTH - 1)
    {
        cache[left] = nums[LENGTH - 1];
        return nums[LENGTH - 1];
    }
    if (cache[left])
    {
        return cache[left];
    }
    let max = 0;
    for (let i = left + 2; i < LENGTH; i++)
    {
        if (nums[i] !== 0)
        {
            max = Math.max(max, robHelper(nums, i, cache));
        }
    }
    cache[left] = max + nums[left];
    return max + nums[left];
}
// @lc code=end