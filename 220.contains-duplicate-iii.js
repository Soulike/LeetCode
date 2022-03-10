/*
 * @lc app=leetcode id=220 lang=javascript
 *
 * [220] Contains Duplicate III
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function (nums, k, t)
{
    if (k >= nums.length - 1)
    {
        for (let i = 0; i < nums.length; i++)
        {
            for (let j = i + 1; j < nums.length; j++)
            {
                if (Math.abs(nums[i] - nums[j]) <= t)
                {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 下标差距小于等于 k
     * 值差距小于等于 t
     */

    // k < nums.length - 1，至少有一个窗口

    let left = 0;
    let right = k;

    for (let i = 0; i <= k; i++)
    {
        for (let j = i + 1; j <= k; j++)
        {
            if (Math.abs(nums[i] - nums[j]) <= t)
            {
                return true;
            }
        }
    }

    while (right <= nums.length - 2)
    {
        left++;
        right++;
        for (let i = left; i < right; i++)
        {
            if (Math.abs(nums[i] - nums[right]) <= t)
            {
                return true;
            }
        }
    }

    return false;
};
// @lc code=end