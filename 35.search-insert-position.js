/*
 * @lc app=leetcode id=35 lang=javascript
 *
 * [35] Search Insert Position
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const searchInsert = function (nums, target)
{
    if (target < nums[0])
    {
        return 0;
    }
    else if (target > nums[nums.length - 1])
    {
        return nums.length;
    }
    else
    {
        let left = 0;
        let right = nums.length;
        let mid = 0;
        while (true)
        {
            mid = Math.floor((left + right) / 2);
            if (nums[mid] < target)
            {
                if (nums[mid + 1] > target)
                {
                    return mid + 1;
                }
                else
                {
                    left = mid + 1;
                }
            }
            else if (nums[mid] > target)
            {
                if (nums[mid - 1] < target)
                {
                    return mid;
                }
                else
                {
                    right = mid;
                }
            }
            else
            {
                return mid;
            }
        }
    }
};

// @lc code=end