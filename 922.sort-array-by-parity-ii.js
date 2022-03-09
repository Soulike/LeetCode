/*
 * @lc app=leetcode id=922 lang=javascript
 *
 * [922] Sort Array By Parity II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParityII = function (nums)
{
    for (let i = 0; i < nums.length; i++)
    {
        if (getMod2(i) !== getMod2(nums[i]))
        {
            for (let j = i + 1; j < nums.length; j++)
            {
                if (getMod2(j) !== getMod2(nums[j])
                    && getMod2(nums[j]) === getMod2(i))
                {
                    [nums[i], nums[j]] = [nums[j], nums[i]];
                    break;
                }
            }
        }
    }

    return nums;
};

function getMod2(num)
{
    return num & 0b1;
}
// @lc code=end

