/*
 * @lc app=leetcode id=1262 lang=javascript
 *
 * [1262] Greatest Sum Divisible by Three
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumDivThree = function (nums) {
  /**
   * dp[i]
   * 余数为 i 的最大和
   *
   * base case
   * dp[0] = 0
   * dp[1] = 0
   * dp[2] = 0
   *
   */

  const dp = [0, 0, 0];

  for (let i = 0; i < nums.length; i++) {
    const sums = [dp[0] + nums[i], dp[1] + nums[i], dp[2] + nums[i]];
    for (const sum of sums) {
      const remainder = sum % 3;
      dp[remainder] = Math.max(dp[remainder], sum);
    }
  }

  return dp[0];
};
// @lc code=end
