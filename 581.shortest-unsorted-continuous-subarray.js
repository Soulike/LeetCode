/*
 * @lc app=leetcode id=581 lang=javascript
 *
 * [581] Shortest Unsorted Continuous Subarray
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function (nums)
{
    const numsCopy = [...nums];

    numsCopy.sort((a, b) => a - b);

    let left = -1;
    let right = -1;

    for (let i = 0; i < nums.length; i++)
    {
        if (nums[i] !== numsCopy[i])
        {
            left = i;
            break;
        }
    }

    if (left === -1)
    {
        return 0;
    }

    for (let i = nums.length; i >= 0; i--)
    {
        if (nums[i] !== numsCopy[i])
        {
            right = i;
            break;
        }
    }

    return right - left + 1;
};
// @lc code=end

