/*
 * @lc app=leetcode id=983 lang=javascript
 *
 * [983] Minimum Cost For Tickets
 */

// @lc code=start
/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function (days, costs) {
  const maxDay = days[days.length - 1];
  const keyDays = new Set(days);

  /**
   * the min cost of day i
   * @type {number[]}
   * */
  const dp = [];

  dp[0] = 0;

  for (let i = 1; i <= maxDay; i++) {
    if (keyDays.has(i)) {
      dp[i] = Math.min(
        dp[i - 1] + costs[0],
        dp[Math.max(0, i - 7)] + costs[1],
        dp[Math.max(0, i - 30)] + costs[2],
      );
    } else {
      dp[i] = dp[i - 1];
    }
  }

  return dp[maxDay];
};
// @lc code=end
