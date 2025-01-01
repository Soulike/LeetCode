/*
 * @lc app=leetcode id=746 lang=javascript
 *
 * [746] Min Cost Climbing Stairs
 */

// @lc code=start
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  const dp = new Array(3);
  dp[0] = dp[1] = 0;

  for (let i = 2; i <= cost.length; i++) {
    dp[i % 3] = Math.min(
      dp[(i - 1) % 3] + cost[i - 1],
      dp[(i - 2) % 3] + cost[i - 2],
    );
  }

  return dp[cost.length % 3];
};
// @lc code=end

minCostClimbingStairs([10, 15, 20]);
