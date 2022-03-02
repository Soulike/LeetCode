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
    function helper(left, right)
    {
        if (left >= right)
        {
            return;
        }

        const leftCopy = left;
        const rightCopy = right;
        const randomIndex = left + Math.round(Math.random() * (right - left));

        [nums[leftCopy], nums[randomIndex]] = [nums[randomIndex], nums[leftCopy]];
        const comparedNum = nums[leftCopy];

        while (left < right)
        {
            while (nums[right] >= comparedNum && left < right)
            {
                right--;
            }

            while (nums[left] <= comparedNum && left < right)
            {
                left++;
            }

            [nums[left], nums[right]] = [nums[right], nums[left]];
        }

        [nums[leftCopy], nums[right]] = [nums[right], nums[leftCopy]];

        helper(leftCopy, right - 1);
        helper(right + 1, rightCopy);
    }

    helper(0, nums.length - 1);
}

// @lc code=end

console.log(sortArray([3,5,8,7,5]));