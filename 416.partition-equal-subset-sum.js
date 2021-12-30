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

        /** 背包问题，让最多的数字装进去等于 target */
        /**
         * dp[i][maxSum] 在数字和限制为 maxSum 的情况下，取 0...i-1 范围内的 nums 做和能否等于 maxSum
         * 
         * base case
         * dp[0][maxSum] = false
         * dp[i][0] = true
         * 
         * 如果要取 nums[i-1]
         * dp[i][maxSum] = dp[i-1][maxSum-nums[i-1]]
         * 如果不取 nums[i-1]
         * dp[i][maxSum] = dp[i-1][maxSum]
         */

        const dp = new Array(nums.length + 1);
        for (let i = 0; i <= nums.length; i++)
        {
            dp[i] = new Array(target + 1);

            dp[i][0] = true;
            if (i === 0)
            {
                dp[i].fill(false);
            }
        }

        for (let i = 1; i <= nums.length; i++)
        {
            for (let maxSum = 1; maxSum <= target; maxSum++)
            {
                if (maxSum - nums[i - 1] < 0)   // 装不下，只能选择不取
                {
                    dp[i][maxSum] = dp[i - 1][maxSum];
                }
                else
                {
                    dp[i][maxSum] = dp[i - 1][maxSum - nums[i - 1]] || dp[i - 1][maxSum];
                }
            }
        }

        return dp[nums.length][target];
    }
};
// @lc code=end