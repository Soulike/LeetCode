/*
 * @lc app=leetcode id=198 lang=javascript
 *
 * [198] House Robber
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
    // 从 0 到 i 可以抢到的最大值
    const dp = [
        nums[0],
        Math.max(nums[0], nums[1]),
    ];
    for (let i = 2; i < nums.length; i++)
    {
        const rob = nums[i] + dp[i - 2];
        const noRob = dp[i - 1];
        dp[i] = Math.max(rob, noRob);
    }
    return dp[dp.length - 1];
};
// @lc code=end