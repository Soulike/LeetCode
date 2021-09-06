/*
 * @lc app=leetcode id=209 lang=javascript
 *
 * [209] Minimum Size Subarray Sum
 */

// @lc code=start
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
const minSubArrayLen = function (target, nums)
{
    let left = 0;
    let right = 0;
    let sum = nums[0];
    let minSubArrayLength = Number.POSITIVE_INFINITY;
    const LENGTH = nums.length;
    while (right < LENGTH)
    {
        if (sum >= target)
        {
            minSubArrayLength = Math.min(minSubArrayLength, right - left + 1);

            sum -= nums[left];
            left++;
            if (right < left)
            {
                right = left;
                sum = nums[right];
            }
        }
        else    // sum < target
        {
            right++;
            if (right >= LENGTH)
            {
                break;
            }
            sum += nums[right];
        }
    }
    if (minSubArrayLength === Number.POSITIVE_INFINITY)
    {
        minSubArrayLength = 0;
    }
    return minSubArrayLength;
};
// @lc code=end