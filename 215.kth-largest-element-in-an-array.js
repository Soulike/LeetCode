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
    function quickSelect(start, end)
    {
        const comparedNum = nums[start];
        let left = start;
        let right = end;

        while (left < right)
        {
            while (nums[right] <= comparedNum && left < right)
            {
                right--;
            }
            while (nums[left] >= comparedNum && left < right)
            {
                left++;
            }

            [nums[left], nums[right]] = [nums[right], nums[left]];
        }
        [nums[right], nums[start]] = [nums[start], nums[right]];
        if (right + 1 === k)
        {
            return nums[right];
        }
        else if (right + 1 > k)
        {
            return quickSelect(start, right - 1);
        }
        else
        {
            return quickSelect(right + 1, end);
        }
    }

    return quickSelect(0, nums.length - 1);
};
// @lc code=end