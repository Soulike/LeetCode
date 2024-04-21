/*
 * @lc app=leetcode id=213 lang=javascript
 *
 * [213] House Robber II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length === 1) {
    return nums[0];
  }
  return Math.max(rob1(nums.slice(0, -1)), rob1(nums.slice(1)));
};

/**
 * @param {number[]} nums
 * @return {number}
 */
function rob1(nums) {
  /**
   * dp[i][0] 不偷 nums[i] 能获得的最大数量
   * dp[i][1] 偷 nums[i] 能获得的最大数量
   *
   * base case
   * dp[0][0] = 0
   * dp[0][1] = nums[0]
   *
   * dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1])
   * dp[i][1] = dp[i-1][0] + nums[i]
   *
   * return Math.max(dp[n-1][0], dp[n-1][1])
   *
   * 内存压缩
   *
   * base case
   *
   * prevDp[0] = 0
   * prevDp[1] = nums[0]
   *
   * dp[0] = Math.max(prevDp[0],prevDp[1])
   * dp[1] = prevDp[0] + nums[i]
   *
   * return Math.max(dp[0], dp[1])
   */

  const n = nums.length;

  /** @type {number[]} */
  let prevDp = [0, nums[0]];
  /** @type {number[]} */
  let dp = [0, 0];

  for (let i = 1; i < n; i++) {
    dp[0] = Math.max(prevDp[0], prevDp[1]);
    dp[1] = prevDp[0] + nums[i];

    [prevDp, dp] = [dp, prevDp];
  }

  return Math.max(prevDp[0], prevDp[1]);
}
// @lc code=end
