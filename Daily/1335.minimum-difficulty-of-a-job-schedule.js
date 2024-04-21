/*
 * @lc app=leetcode id=1335 lang=javascript
 *
 * [1335] Minimum Difficulty of a Job Schedule
 */

// @lc code=start
/**
 * @param {number[]} jobDifficulty
 * @param {number} d
 * @return {number}
 */
var minDifficulty = function (jobDifficulty, d) {
  const JOB_COUNT = jobDifficulty.length;

  /**
   * dp[i][j] Start from `i`-th job, the min difficulty to finish them in `j` days
   *
   * base case
   * dp[i][1] = max(jobDifficulty after `i`-th job)
   *
   * dp[i][j] = min(
   *  k from i+1 to JOB_COUNT - 1
   *      dp[k][j-1] + max(jobDifficulty[k])
   * )
   * @type {number[][]}
   */
  const dp = new Array(JOB_COUNT);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(d + 1);
    dp[i].fill(Infinity);
  }

  dp[dp.length - 1][1] = jobDifficulty[JOB_COUNT - 1];
  for (let i = dp.length - 2; i >= 0; i--) {
    dp[i][1] = Math.max(dp[i + 1][1], jobDifficulty[i]);
  }

  for (let i = JOB_COUNT - 1; i >= 0; i--) {
    for (let j = 2; j <= d; j++) {
      let maxJobDifficulty = 0;
      for (let k = i + 1; k < JOB_COUNT; k++) {
        maxJobDifficulty = Math.max(maxJobDifficulty, jobDifficulty[k - 1]);
        dp[i][j] = Math.min(maxJobDifficulty + dp[k][j - 1], dp[i][j]);
      }
    }
  }

  return dp[0][d] === Infinity ? -1 : dp[0][d];
};
// @lc code=end

minDifficulty([11, 111, 22, 222, 33, 333, 44, 444], 6); // 843
