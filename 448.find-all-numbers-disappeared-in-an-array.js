/*
 * @lc app=leetcode id=448 lang=javascript
 *
 * [448] Find All Numbers Disappeared in an Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const findDisappearedNumbers = function (nums)
{
    const LENGTH = nums.length;
    const numberSet = new Set();
    for (let i = 0; i < LENGTH; i++)
    {
        numberSet.add(i+1);
    }
    for (const num of nums)
    {
        numberSet.delete(num);
    }
    return Array.from(numberSet);
};
// @lc code=end

