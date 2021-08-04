/*
 * @lc app=leetcode id=238 lang=javascript
 *
 * [238] Product of Array Except Self
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const productExceptSelf = function (nums) 
{
    const LENGTH = nums.length;
    /** 下标 i （不含）之前所有数的乘积 */
    const beforeProduct = new Array(LENGTH);
    beforeProduct[0] = 1;
    /** 下标 i （不含）之后所有数的乘积 */
    const afterProduct = new Array(LENGTH);
    afterProduct[LENGTH - 1] = 1;

    for (let i = 0; i < LENGTH - 1; i++)
    {
        beforeProduct[i + 1] = beforeProduct[i] * nums[i];
    }

    for (let i = LENGTH - 1; i >= 1; i--)
    {
        afterProduct[i - 1] = afterProduct[i] * nums[i];
    }
    
    const output = new Array(LENGTH);

    for (let i = 0; i < LENGTH; i++)
    {
        output[i] = beforeProduct[i] * afterProduct[i];
    }

    return output;
};
// @lc code=end
