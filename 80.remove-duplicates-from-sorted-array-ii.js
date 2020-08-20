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

    let putIndex = 0;   // 这一轮循环要放的位置
    let checkIndex = 0; // 查找下一个合适数字的位置
    for (; checkIndex < LENGTH; ++checkIndex)
    {
        if (putIndex < 2    // 前两个数字直接复制
            || nums[putIndex - 2] < nums[checkIndex]    // 只要 checkIndex 位置的数字比 putIndex-2 位置的大，那就是合适的数字
        )
        {
            nums[putIndex] = nums[checkIndex];
            ++putIndex;
        }
    }
    return putIndex;
};
// @lc code=end