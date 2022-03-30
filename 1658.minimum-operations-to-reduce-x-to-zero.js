/*
 * @lc app=leetcode id=1658 lang=javascript
 *
 * [1658] Minimum Operations to Reduce X to Zero
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minOperations = function (nums, x)
{
    /**
     * 问题可以转化为寻找一个最长子数组，其和为 sum - x
     */
    const target = nums.reduce((prev, curr) => prev + curr, -x);

    if (target === 0)
    {
        return nums.length;
    }
    else if (target < 0)
    {
        return -1;
    }

    let left = 0;
    let right = 0;
    let windowSum = nums[0];
    let maxLength = 0;

    while (right < nums.length)
    {
        if (windowSum === target)
        {
            maxLength = Math.max(maxLength, right - left + 1);
        }
        
        if (windowSum >= target)
        {
            if (left >= 0)
            {
                windowSum -= nums[left];
            }
            left++;
            if (right < left)
            {
                right = left;
                windowSum = nums[left];
            }
        }
        else // (windowSum < target)
        {
            if (right < nums.length - 1)
            {
                right++;
                windowSum += nums[right];
            }
            else
            {
                break;
            }
        }
    }

    return maxLength === 0 ? -1 : nums.length - maxLength;
};
// @lc code=end