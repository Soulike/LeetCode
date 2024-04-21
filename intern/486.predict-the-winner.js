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
   * n = nums.length
   *
   * dp[i][j] 当数字还剩下 [i,j] 时，先手取能比对手最多多拿到的分数
   *
   * base case
   * dp[i][i] = nums[i]
   *
   * dp[i][j] = max(
   * nums[i] - dp[i+1][j],
   * nums[j] - dp[i][j-1]
   * )
   *
   * return dp[0][n-1]
   */

  const n = nums.length;

  const dp = new Array(n);
  for (let i = 0; i < n; i++) {
    dp[i] = new Array(n);
    dp[i][i] = nums[i];
  }

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      dp[i][j] = Math.max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1]);
    }
  }

  return dp[0][n - 1] >= 0;
};
// @lc code=end
