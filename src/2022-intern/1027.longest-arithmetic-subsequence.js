/*
 * @lc app=leetcode id=1027 lang=javascript
 *
 * [1027] Longest Arithmetic Subsequence
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const longestArithSeqLength = function (nums) {
  const LENGTH = nums.length;
  let maxLength = 0;
  /**
   * 到 nums[i] 为止，等差值为 j 的最大长度
   * @type {number[][]}
   */
  const dp = new Array(LENGTH);
  for (let i = 0; i < LENGTH; i++) {
    // 差值为 [-500,500]
    dp[i] = [];
  }

  for (let i = 0; i < LENGTH; i++) {
    for (let j = 0; j < i; j++) {
      // 差值为 [-500,500]，平移为正数方便数组存储
      const diff = nums[i] - nums[j] + 500;
      dp[i][diff] = (dp[j][diff] ?? 0) + 1;
      maxLength = Math.max(maxLength, dp[i][diff] + 1);
    }
  }

  return maxLength;
};
// @lc code=end
