/*
 * @lc app=leetcode id=673 lang=javascript
 *
 * [673] Number of Longest Increasing Subsequence
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums)
{
    const n = nums.length;
    /**
     * dp[i] 以 nums[i] 为结尾可以构成的最长递增子序列及路径个数
     * @type {[number, number][]} - [长度，路径个数]
     */
    const dp = new Array(n);
    for (let i = 0; i < n; i++)
    {
        dp[i] = [1, 1];
    }

    let maxLength = 1;

    for (let i = 0; i < n; i++)
    {
        for (let j = i - 1; j >= 0; j--)
        {
            if (nums[j] < nums[i])
            {
                if (dp[j][0] + 1 > dp[i][0])
                {
                    dp[i][0] = dp[j][0] + 1;
                    dp[i][1] = dp[j][1];
                }
                else if (dp[j][0] + 1 === dp[i][0])
                {
                    dp[i][1] += dp[j][1];
                }

                if (dp[i][0] > maxLength)
                {
                    maxLength = dp[i][0];
                }
            }
        }
    }

    let maxLengthPathCount = 0;
    for (const [length, pathCount] of dp)
    {
        if (length === maxLength)
        {
            maxLengthPathCount += pathCount;
        }
    }

    return maxLengthPathCount;
};
// @lc code=end