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
    const sum = nums.reduce((prev, curr) => prev + curr);
    const subsetSum = sum / 2;
    if (!Number.isInteger(subsetSum))
    {
        return false;
    }

    /**
     * 背包问题
     * dp[i][j] 对于前 i 个物品，是否存在正好装满大小为 j 的背包的方法
     * 
     * base case 
     * dp[0][j] = false
     * dp[i][0] = true
     * 
     * // 不装第 i 个物品
     * dp[i][j] = dp[i-1][j]
     * 
     * // 装第 i 个物品 
     * dp[i][j] = dp[i-1][j-nums[i-1]]2
     */

    const dp = new Array(nums.length + 1);
    for (let i = 0; i < dp.length; i++)
    {
        dp[i] = new Array(subsetSum + 1);
        dp[i][0] = true;
    }

    dp[0].fill(false);
    dp[0][0] = true;

    for (let i = 1; i <= nums.length; i++)
    {
        for (let j = 1; j <= subsetSum; j++)
        {
            if (j - nums[i - 1] < 0)    // 装不下
            {
                dp[i][j] = dp[i - 1][j];
            }
            else
            {
                dp[i][j] =
                    dp[i - 1][j]
                    || dp[i - 1][j - nums[i - 1]];
            }
        }
    }

    return dp[nums.length][subsetSum];
};
// @lc code=end