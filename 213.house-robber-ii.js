/*
 * @lc app=leetcode id=213 lang=javascript
 *
 * [213] House Robber II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const rob = function (nums)
{
    if (nums.length === 1)
    {
        return nums[0];
    }
    
    return Math.max(
        helper(0, nums.length - 2),
        helper(1, nums.length - 1)
    );

    function helper(left, right)
    {
        const n = right - left + 1;
        let rob = nums[left];
        let noRob = 0;
        let prevRob = 0;

        for (let i = left + 1; i < left + n; i++)
        {
            prevRob = rob;
            rob = noRob + nums[i];
            noRob = Math.max(noRob, prevRob);
        }

        return Math.max(rob, noRob);
    }
};