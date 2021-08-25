/*
 * @lc app=leetcode id=300 lang=javascript
 *
 * [300] Longest Increasing Subsequence
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const lengthOfLIS = function (nums) 
{
    /**
     * 以数组 i 位置为末尾，最长的严格递增序列长度
     * @type {number[]}
     */
    const dp = [];
    dp[0] = 1;
    let maxLength = 1;
    for (let i = 1; i < nums.length; i++)
    {
        const currentNum = nums[i];
        let beforeMaxLength = 0;
        for (let j = 0; j < i; j++)
        {
            if (nums[j] < currentNum)
            {
                beforeMaxLength = Math.max(beforeMaxLength, dp[j]);
            }
        }
        dp[i] = beforeMaxLength + 1;
        maxLength = Math.max(maxLength, dp[i]);
    }
    return maxLength;
};
// @lc code=end