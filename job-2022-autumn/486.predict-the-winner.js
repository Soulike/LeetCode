/*
 * @lc app=leetcode id=486 lang=javascript
 *
 * [486] Predict the Winner
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var PredictTheWinner = function (nums) {
  /**
   * dp[i][j] 取 [i,j] 区间的石头，最多能比对方多拿多少分
   *
   * dp[i][i] = nums[i]
   *
   * dp[i][j] = Math.max(
   *  nums[i] - dp[i+1][j],
   *  nums[j] - dp[i][j-1]
   * )
   */

  /** @type {number[]} */
  const dp = new Array(nums.length);

  for (let i = nums.length - 1; i >= 0; i--) {
    dp[i] = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      dp[j] = Math.max(nums[i] - dp[j], nums[j] - dp[j - 1]);
    }
  }

  return dp[nums.length - 1] >= 0;
};
// @lc code=end
