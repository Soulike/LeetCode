/*
 * @lc app=leetcode id=45 lang=javascript
 *
 * [45] Jump Game II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const jump = function (nums)
{
    function helper(start)
    {
        if (start >= nums.length - 1)
        {
            return 0;
        }

        const maxReachIndex = nums[start] + start;

        if (maxReachIndex >= nums.length - 1)
        {
            return 1;
        }

        let nextMaxReach = -1;
        let nextIndex = -1;
        for (let i = start + 1; i <= maxReachIndex; i++)
        {
            if (i + nums[i] > nextMaxReach)
            {
                nextMaxReach = i + nums[i];
                nextIndex = i;
            }
        }
        return 1 + helper(nextIndex);
    }

    return helper(0);
};
// @lc code=end