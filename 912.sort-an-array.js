/*
 * @lc app=leetcode id=912 lang=javascript
 *
 * [912] Sort an Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArray = function (nums)
{
    mergeSort(nums, 0, nums.length);
    return nums;
};

function mergeSort(nums, left, right)
{
    const LENGTH = right - left;
    if (LENGTH < 2)
    {
        return nums;
    }

    const mergedNums = [];

    const mid = Math.floor(left + LENGTH / 2);

    mergeSort(nums, left, mid)
    mergeSort(nums, mid, right);

    let index1 = left;
    let index2 = mid;

    while (index1 < mid || index2 < right)
    {
        if (index1 === mid)
        {
            mergedNums.push(nums[index2++]);
        }
        else if (index2 === right)
        {
            mergedNums.push(nums[index1++]);
        }
        else
        {
            if (nums[index1] < nums[index2])
            {
                mergedNums.push(nums[index1++]);
            }
            else
            {
                mergedNums.push(nums[index2++]);
            }
        }
    }
    for (let i = left; i < right; i++)
    {
        nums[i] = mergedNums[i - left];
    }
}
// @lc code=end

