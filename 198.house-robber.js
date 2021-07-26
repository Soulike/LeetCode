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
    // 抢当前房子能得到的最大值
    let robMax = nums[0];
    // 不抢当前房子能得到的最大值
    let notRobMax = 0;

    // 抢前一个房子能得到的最大值
    let preRobMax = robMax;
    // 不抢前一个房子能得到的最大值
    let preNotRobMax = notRobMax;

    for (let i = 1; i < nums.length; i++)
    {
        preRobMax = robMax;
        preNotRobMax = notRobMax;

        // 要抢当前的房子，那前一个房子就不能抢
        robMax = preNotRobMax + nums[i];

        // 不抢当前房子，那前一个房子可抢可不抢
        notRobMax = Math.max(preNotRobMax, preRobMax);
    }

    return Math.max(robMax, notRobMax);
};
// @lc code=end