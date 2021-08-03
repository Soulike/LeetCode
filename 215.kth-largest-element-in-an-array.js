/*
 * @lc app=leetcode id=215 lang=javascript
 *
 * [215] Kth Largest Element in an Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findKthLargest = function (nums, k) 
{
    return helper(nums, k, 0, nums.length);
};

/**
 * 排序范围 [`left`, `right`)
 * @param {number[]} nums
 * @param {number} k
 * @param {number} left
 * @param {number} right 
 * @return {number}
 */
function helper(nums, k, left, right)
{
    const comparedNum = nums[left];
    let leftIndex = left;
    let rightIndex = right - 1;

    while (leftIndex < rightIndex)
    {
        while (nums[rightIndex] <= comparedNum && leftIndex < rightIndex)
        {
            rightIndex--;
        }
        while (nums[leftIndex] >= comparedNum && leftIndex < rightIndex)
        {
            leftIndex++;
        }
        [nums[leftIndex], nums[rightIndex]] = [nums[rightIndex], nums[leftIndex]];
    }
    [nums[left], nums[rightIndex]] = [nums[rightIndex], nums[left]];

    if (rightIndex === k - 1)
    {
        return nums[rightIndex];
    }
    else if (rightIndex > k - 1)
    {
        return helper(nums, k, left, rightIndex);
    }
    else
    {
        return helper(nums, k, rightIndex + 1, right);
    }
}
// @lc code=end