/*
 * @lc app=leetcode id=1671 lang=javascript
 *
 * [1671] Minimum Number of Removals to Make Mountain Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumMountainRemovals = function (nums) {
  /**
   * increase[i] 以 i-1 为结尾，最长的递增序列长度
   * decrease[i] 以 i+1 为开头，最长的递减序列长度
   */

  const n = nums.length;
  const increase = new Array(n);
  const decrease = new Array(n);
  increase.fill(0);
  decrease.fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (nums[j] < nums[i]) {
        increase[i] = Math.max(increase[i], increase[j] + 1);
      }
    }
  }

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      if (nums[j] < nums[i]) {
        decrease[i] = Math.max(decrease[i], decrease[j] + 1);
      }
    }
  }

  let maxLength = -Infinity;
  for (let i = 1; i < n - 1; i++) {
    // 对于 nums[i]，两侧的数字必须都存在才行
    if (increase[i] !== 0 && decrease[i] !== 0) {
      maxLength = Math.max(increase[i] + decrease[i] + 1, maxLength);
    }
  }

  return n - maxLength;
};
// @lc code=end
