/*
 * @lc app=leetcode id=416 lang=javascript
 *
 * [416] Partition Equal Subset Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
const canPartition = function (nums)
{
    const sum = nums.reduce((prev, current) => prev + current);
    if (sum % 2)
    {
        return false;
    }
    else
    {
        const target = sum / 2;
        /**
         * dp[i] 代表是否有数组元素可以相加和为 i
         */
        const dp = new Array(target + 1);
        dp.fill(false);
        dp[0] = true;
        for (const num of nums)
        {
            for (let i = target; i >= num; i--)
            {
                dp[i] = dp[i] || dp[i - num];
            }
        }
        return dp[target];
    }
};
// @lc code=end