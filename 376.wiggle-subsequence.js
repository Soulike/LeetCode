/*
 * @lc app=leetcode id=376 lang=javascript
 *
 * [376] Wiggle Subsequence
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function (nums) {
  /**
   * positiveDiffMaxLength[i]
   * negativeDiffMaxLength[i]
   *
   * 当与下一个元素差值分别是正和负时，构成的最长序列
   *
   * base case
   * positiveDiffMaxLength[n-1] = 1
   * negativeDiffMaxLength[n-1] = 1
   *
   * 对于 i，向后查找符合正负的数字，并将其符号相反长度+1，查找最大值
   * 如果查找到最后都没有找到，长度为 1
   *
   * 可以简化为 O(n)
   * 只记录目前见过的最长的两个符号序列的长度
   * 对于 i，并将其符号相反最长长度+1
   */

  const n = nums.length;

  let positiveDiffMaxLength = 1;
  let negativeDiffMaxLength = 1;

  for (let i = n - 2; i >= 0; i--) {
    const diff = nums[i] - nums[i + 1];
    if (diff > 0) {
      negativeDiffMaxLength = Math.max(
        negativeDiffMaxLength,
        positiveDiffMaxLength + 1
      );
    } else if (diff < 0) {
      positiveDiffMaxLength = Math.max(
        positiveDiffMaxLength,
        negativeDiffMaxLength + 1
      );
    }
  }

  return Math.max(positiveDiffMaxLength, negativeDiffMaxLength);
};
// @lc code=end
