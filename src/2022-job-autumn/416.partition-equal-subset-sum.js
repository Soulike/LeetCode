/*
 * @lc app=leetcode id=416 lang=javascript
 *
 * [416] Partition Equal Subset Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((prev, curr) => prev + curr);
  const target = sum / 2;
  if (!Number.isInteger(target)) {
    return false;
  }
  const n = nums.length;

  /**
   * dp[i][j] 对于 [0,i] 的物品，是否有一种方法恰好装满容量 j
   *
   * base case
   * dp[i].fill(false)
   * dp[i][nums[i]] = true
   * dp[i][0] = true
   *
   * dp[i][j] = dp[i-1][j] || dp[i-1][j-nums[i]]
   *
   * 空间压缩
   *
   * base case
   * prevDp.fill(false)
   * prevDp[i] = true
   * prevDp[0] = false
   *
   * dp[j] = prevDp[j] || prevDp[j-nums[i]]
   *
   */
  /** @type {boolean[]} */
  let prevDp = new Array(target + 1);
  /** @type {boolean[]} */
  let dp = new Array(target + 1);

  prevDp.fill(false);
  prevDp[0] = true;
  prevDp[nums[0]] = true;

  for (let i = 1; i < n; i++) {
    for (let j = 1; j <= target; j++) {
      if (j - nums[i] > 0) {
        dp[j] = prevDp[j] || prevDp[j - nums[i]];
      } else {
        dp[j] = prevDp[j];
      }
    }
    [prevDp, dp] = [dp, prevDp];
  }

  return prevDp[target];
};
// @lc code=end
