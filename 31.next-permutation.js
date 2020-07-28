/*
 * @lc app=leetcode id=31 lang=javascript
 *
 * [31] Next Permutation
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const nextPermutation = function (nums) 
{
    let i = nums.length - 2;
    while (i >= 0 && nums[i + 1] <= nums[i])
    {
        i--;
    }
    if (i >= 0)
    {
        let j = nums.length - 1;
        while (j >= 0 && nums[j] <= nums[i])
        {
            j--;
        }
        swap(nums, i, j);
    }
    reverse(nums, i + 1, nums.length -1);
};

/**
 * 
 * @param {number[]} nums 
 * @param {number} index1 
 * @param {number} index2 
 */
function swap(nums, index1, index2)
{
    if (index1 !== index2)
    {
        [nums[index1], nums[index2]] = [nums[index2], nums[index1]];
    }
}

/**
 * 
 * @param {number[]} nums 
 * @param {number} left
 * @param {number} right
 */
function reverse(nums, left, right)
{
    if (left !== right)
    {
        const length = right - left + 1;
        for (let i = left; i < left + length/2; i++)
        {
            swap(nums, i, right - i+left);
        }
    }
}
// @lc code=end

console.log(nextPermutation([1, 2, 3, 4, 5, 6, 4, 3, 2, 1]))