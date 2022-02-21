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
    /**
     * rob[i] 抢第 i 房子，最多拿到多少钱
     * noRob[i] 不抢第 i 个房子，最多拿到多少钱
     * 
     * base case
     * rob[0] = nums[0]
     * noRob[0] = 0
     * 
     * rob[i] = noRob[i-1]+nums[i]
     * noRob[i] = max(noRob[i-1], rob[i-1])
     * 
     * 返回 max(rob[n-1], noRob[n-1])
     * 
     * 空间优化
     * base case 
     * rob = nums[0]
     * noRob = 0;
     * 
     * prevRob = rob
     * rob = noRob+nums[i]
     * noRob = max(noRob, prevRob)
     * 
     * 返回 max(rob, noRob)
     */

    const n = nums.length;
    let rob = nums[0];
    let noRob = 0;
    let prevRob = 0;

    for (let i = 1; i < n; i++)
    {
        prevRob = rob;
        rob = noRob + nums[i];
        noRob = Math.max(noRob, prevRob);
    }

    return Math.max(rob, noRob)
};
// @lc code=end