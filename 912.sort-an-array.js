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
    return mergeSort(nums);
};

/**
 * @param {number[]} nums
 * @returns {number[]}
 */
function mergeSort(nums)
{
    if (nums.length === 1)
    {
        return nums;
    }
    const mid = Math.floor(nums.length / 2);
    return mergeArray(
        mergeSort(nums.slice(0, mid)),
        mergeSort(nums.slice(mid))
    );
}

/**
 * @param {number[]} nums1 
 * @param {number[]} nums2 
 * @returns {number[]}
 */
function mergeArray(nums1, nums2)
{
    const NUMS1_LENGTH = nums1.length;
    const NUMS2_LENGTH = nums2.length;
    const mergedNums = [];

    let i = 0;
    let j = 0;
    while (i < NUMS1_LENGTH && j < NUMS2_LENGTH)
    {
        if (nums1[i] < nums2[j])
        {
            mergedNums.push(nums1[i]);
            i++;
        }
        else
        {
            mergedNums.push(nums2[j]);
            j++;
        }
    }

    for (;i < NUMS1_LENGTH;i++)
    {
        mergedNums.push(nums1[i]);
    }

    for (; j < NUMS2_LENGTH; j++)
    {
        mergedNums.push(nums2[j]);
    }

    return mergedNums;
}
// @lc code=end

