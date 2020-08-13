/*
 * @lc app=leetcode id=75 lang=javascript
 *
 * [75] Sort Colors
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const sortColors = function (nums) 
{
    const length = nums.length;
    if (length >= 2)
    {
        let left = 0;
        let right = length - 1;
        for (let i = 0; i <= right; i++)
        {
            if (nums[i] === 0)
            {
                if (i === left)
                {
                    continue;
                }
                swap(nums, i, left);
                left++;
                i--;
            }
            if (nums[i] === 2)
            {
                if (i === right)
                {
                    continue;
                }
                swap(nums, i, right);
                right--;
                i--;
            }
        }
    }
};

/**
 * @param {number[]} nums 
 * @param {number} index1 
 * @param {number} index2 
 */
function swap(nums, index1, index2)
{
    [nums[index1], nums[index2]] = [nums[index2], nums[index1]];
}
// @lc code=end