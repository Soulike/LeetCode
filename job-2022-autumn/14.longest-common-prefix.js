/*
 * @lc app=leetcode id=14 lang=javascript
 *
 * [14] Longest Common Prefix
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  /**
   * @param {number} startIndex
   * @returns {string}
   */
  const helper = (startIndex) => {
    if (strs[0].length === startIndex) return '';

    for (let i = 1; i < strs.length; i++) {
      if (
        strs[i].length === startIndex ||
        strs[i][startIndex] !== strs[i - 1][startIndex]
      ) {
        return '';
      }
    }
    return strs[0][startIndex] + helper(startIndex + 1);
  };

  return helper(0);
};
// @lc code=end
