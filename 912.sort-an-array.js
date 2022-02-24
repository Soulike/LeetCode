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
    quickSort(nums);
    return nums;
};

function quickSort(nums)
{
    helper(0, nums.length - 1);

    function helper(left, right)
    {
        if (left >= right)
        {
            return;
        }

        let leftIndex = left;
        let rightIndex = right;
        const comparedNum = nums[left];

        while (leftIndex < rightIndex)
        {
            while (nums[rightIndex] >= comparedNum
                && leftIndex < rightIndex)
            {
                rightIndex--;
            }
            while (nums[leftIndex] <= comparedNum
                && leftIndex < rightIndex)
            {
                leftIndex++;
            }
            [nums[leftIndex], nums[rightIndex]] = [nums[rightIndex], nums[leftIndex]];
        }
        [nums[left], nums[rightIndex]] = [nums[rightIndex], nums[left]];

        helper(left, rightIndex - 1);
        helper(rightIndex + 1, right);
    }
}
// @lc code=end