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
    let currentIndex = 0;
    while (currentIndex < nums.length)
    {
        const currentNum = nums[currentIndex];
        if (currentNum - 1 !== currentIndex && nums[currentNum-1]!== currentNum)
        {
            [nums[currentIndex], nums[currentNum - 1]] = [nums[currentNum - 1], nums[currentIndex]];
        }
        else
        {
            currentIndex++;
        }
    }

    const result = [];
    for (let i = 0; i < nums.length; i++)
    {
        if (nums[i] !== i + 1)
        {
            result.push(i + 1);
        }
    }
    return result;
};
// @lc code=end