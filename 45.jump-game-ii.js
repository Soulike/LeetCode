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
    const LENGTH = nums.length;
    const minJump = new Array(nums.length); // 到达第 i 个为止最少需要跳几次
    minJump.fill(Number.MAX_SAFE_INTEGER);
    minJump[0] = 0;
    let maxIndex = 0;
    for (let i = 0; i < LENGTH; i++)
    {
        maxIndex = Math.min(nums[i] + i, nums.length - 1);
        for (let j = i + 1; j <= maxIndex; j++)
        {
            minJump[j] = Math.min(minJump[i] + 1, minJump[j]);
        }
    }
    return minJump[minJump.length - 1];
};
// @lc code=end

console.log(jump([2, 3, 0, 1, 4]));