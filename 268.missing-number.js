/*
 * @lc app=leetcode id=268 lang=javascript
 *
 * [268] Missing Number
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums)
{
    const n = nums.length;
    let sum = 0
    for (let i = 0; i <= n;i++)
    {
        sum += i;
        if (i !== n)
        {
            const num = nums[i];
            sum -= num;
        }
    }
    return sum;
};
// @lc code=end