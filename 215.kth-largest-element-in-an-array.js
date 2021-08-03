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
    quickSort(nums);
    return nums[nums.length - k];
};

/**
 * @param {number[]} nums 
 */
function quickSort(nums)
{
    quickSortHelper(nums, 0, nums.length);
}

/**
 * [`left`, `right`)
 * @param {number[]} nums 
 * @param {number} left
 * @param {number} right
 * @returns {void}
 */
function quickSortHelper(nums, left, right)
{
    if (right - left <= 1)
    {
        return;
    }

    const comparedNum = nums[left];
    let leftIndex = left;
    let rightIndex = right - 1;

    while (leftIndex < rightIndex)
    {
        while (nums[rightIndex] >= comparedNum && leftIndex < rightIndex)
        {
            rightIndex--;
        }
        while (nums[leftIndex] <= comparedNum && leftIndex < rightIndex)
        {
            leftIndex++;
        }
        [nums[leftIndex], nums[rightIndex]] = [nums[rightIndex], nums[leftIndex]];
    }
    [nums[left], nums[rightIndex]] = [nums[rightIndex], nums[left]];

    quickSortHelper(nums, left, rightIndex);
    quickSortHelper(nums, rightIndex + 1, right);
}
// @lc code=end