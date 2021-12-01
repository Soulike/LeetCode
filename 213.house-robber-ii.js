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
    return Math.max(rob1(nums.slice(1)), rob1(nums.slice(0, -1)));
};

/**
 * @param {number[]} nums
 * @return {number}
 */
function rob1(nums) 
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

console.log(rob([6, 6, 4, 8, 4, 3, 3, 10]));