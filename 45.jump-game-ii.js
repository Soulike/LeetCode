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
    /**
     * dp[i] 从 i 位置到终点所需的最小跳跃数
     * 
     * base case
     * dp[target] = 0
     * 
     * dp[i] = 
     * if nums[i] === 0
     *  Infinity
     * else if i+nums[i] >= target
     *  1
     * else
     *  min(1+dp[i+1...nums[i]]) 
     */

    const n = nums.length;
    const dp = new Array(n);
    dp[n - 1] = 0;

    for (let i = n - 2; i >= 0; i--)
    {
        if (nums[i] === 0)
        {
            dp[i] = Infinity;
        }
        else if (i + nums[i] >= n - 1)
        {
            dp[i] = 1;
        }
        else
        {
            dp[i] = Infinity;
            for (let j = nums[i]; j >= 1; j--)
            {
                dp[i] = Math.min(dp[i], dp[i + j]);
            }
            dp[i]++;
        }
    }

    return dp[0];
};
// @lc code=end