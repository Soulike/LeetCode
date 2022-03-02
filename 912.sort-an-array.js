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
    shellSort(nums);
    return nums;
};

function shellSort(nums)
{
    let gap = Math.max(1, Math.floor(nums.length / 2));

    for (; gap >= 1; gap = Math.floor(gap / 2))
    {
        for (let i = gap; i < nums.length; i++)
        {
            const num = nums[i];
            let slot = i - gap;
            for (; slot >= 0 && nums[slot] > num; slot -= gap)
            {
                nums[slot + gap] = nums[slot];
            }
            nums[slot + gap] = num;
        }
    }
}

// @lc code=end

console.log(sortArray([5, 1, 1, 2, 0, 0]));