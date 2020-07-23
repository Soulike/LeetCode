/*
 * @lc app=leetcode id=34 lang=javascript
 *
 * [34] Find First and Last Position of Element in Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const searchRange = function (nums, target) 
{
    if (nums.length === 0 || target < nums[0] || target > nums[nums.length - 1])
    {
        return [-1,-1];
    }
    if (nums.length === 1)
    {
        return nums[0] === target ? [0, 0] : [-1, -1];
    }
    // nums.length >= 2
    const index = binarySearch(nums, 0, nums.length, target);
    if (index === -1)
    {
        return [-1, -1];
    }
    // index !== -1
    let left = index - 1;
    let right = index + 1;
    while (nums[left] === target || nums[right] === target)
    {
        if (nums[left] === target)
        {
            left--;
        }
        if (nums[right] === target)
        {
            right++;
        }
    }
    return [left + 1, right - 1];
};

/**
 * @param {number[]} nums 
 * @param {number} start 开始下标
 * @param {number} end 结束下标，不在范围中
 * @param {number} target 
 * @return {number}
 */
function binarySearch(nums, start, end, target)
{
    if (end === start)
    {
        return -1;
    }
    if (end - start === 1)
    {
        return nums[start] === target ? start : -1;
    }
    const mid = Math.floor((start + end) / 2);
    const midNum = nums[mid];
    if (midNum === target)
    {
        return mid;
    }
    else if (midNum > target)
    {
        return binarySearch(nums, start, mid, target);
    }
    else    // midNum < target
    {
        return binarySearch(nums, mid + 1, end, target);
    }
}
// @lc code=end

