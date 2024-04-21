/*
 * @lc app=leetcode id=1043 lang=javascript
 *
 * [1043] Partition Array for Maximum Sum
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var maxSumAfterPartitioning = function (arr, k) {
  /**
   * dp[i][j] 1 <= j <= k
   * The current partition ends with i
   * The length of the partition is j
   *
   * dp[i][j] = max(arr[i-j+1 to i])*j + max(dp[i-j])
   */
  const dp = new Array(arr.length);
  dp.fill(0);

  for (let i = 0; i < arr.length; i++) {
    let currentMax = 0;
    for (let j = 1; j <= k; j++) {
      if (i - j + 1 < 0) break;
      currentMax = Math.max(currentMax, arr[i - j + 1]);
      dp[i] = Math.max(dp[i], currentMax * j + (dp[i - j] ?? 0));
    }
  }

  return dp[arr.length - 1];
};
// @lc code=end

maxSumAfterPartitioning([1, 15, 7, 9, 2, 5, 10], 3);
