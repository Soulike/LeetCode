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
var findNumberOfLIS = function (nums) {
  const N = nums.length;

  /**
   * @type {number[]}
   *
   * dp[i] nums[i] 结尾的 LIS 有几个
   *
   * dp[0] = 1
   */
  const dp = new Array(N);
  dp[0] = 1;

  let maxLISLength = 0;
  let maxLISNumber = 0;

  /** @type {number[]} */
  const lis = new Array(N);
  lis.fill(1);

  for (let i = 0; i < N; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (nums[j] < nums[i]) {
        if (lis[j] + 1 === lis[i]) {
          if (dp[i] === undefined) dp[i] = 0;
          dp[i] += dp[j];
        } else if (lis[j] + 1 > lis[i]) {
          dp[i] = dp[j];
        }
        lis[i] = Math.max(lis[i], lis[j] + 1);
      }
    }

    if (dp[i] === undefined) dp[i] = 1;

    if (lis[i] > maxLISLength) {
      maxLISLength = lis[i];
      maxLISNumber = dp[i];
    } else if (lis[i] === maxLISLength) {
      maxLISNumber += dp[i];
    }
  }

  return maxLISNumber;
};
// @lc code=end

findNumberOfLIS([1, 3, 5, 4, 7]);
