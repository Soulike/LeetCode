/*
 * @lc app=leetcode id=80 lang=javascript
 *
 * [80] Remove Duplicates from Sorted Array II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function (nums) 
{
    const LENGTH = nums.length;
    if (LENGTH <= 2)
    {
        return LENGTH;
    }

    // 查找多于两个的数字，多出的数字填写成 NaN
    for (let i = 2; i < LENGTH; i++)
    {
        if (nums[i-2] === nums[i])
        {
            for (let j = i; j < LENGTH; j++)
            {
                if (nums[j] !== nums[i-2])
                {
                    i = j;
                    break;
                }
                nums[j] = NaN;
            }
        }
    }

    // 把 NaN 删除掉，每删除一个减少一个实际长度
    let actualLength = LENGTH;
    for (let i = 0; i < actualLength; i++)
    {
        if (Number.isNaN(nums[i]))
        {
            for (let j = i + 1; j < actualLength; j++)
            {
                nums[j - 1] = nums[j];
            }
            actualLength--;
            i--;
        }
    }
    return actualLength;
};
// @lc code=end