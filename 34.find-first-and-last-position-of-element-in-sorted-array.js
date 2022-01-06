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
    if (nums.length === 0
        || target < nums[0] || target > nums[nums.length - 1])
    {
        return [-1,-1];
    }
    if (nums.length === 1)
    {
        return nums[0] === target ? [0, 0] : [-1, -1];
    }
    // nums.length >= 2
    const index = binarySearch();
    if (index === -1)
    {
        return [-1, -1];
    }
    // index !== -1
    let left = index - 1;
    let right = index + 1;
    while (nums[left] === target)
    {
        left--;
    }
    while (nums[right] === target)
    {
        right++;
    }
    return [left + 1, right - 1];

    function binarySearch()
    {
        let left = 0;
        let right = nums.length - 1;
        let mid = Math.floor((left + right) / 2);

        while (left <= right)
        {
            if (target > nums[mid])
            {
                left = mid + 1;
            }
            else if (target < nums[mid])
            {
                right = mid - 1;
            }
            else
            {
                return mid;
            }
            mid = Math.floor((left + right) / 2);
        }

        return -1;
    }
};
// @lc code=end

