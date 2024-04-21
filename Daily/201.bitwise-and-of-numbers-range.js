/*
 * @lc app=leetcode id=201 lang=javascript
 *
 * [201] Bitwise AND of Numbers Range
 */

// @lc code=start
/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var rangeBitwiseAnd = function (left, right) {
  // Find the common prefix as all bits after the prefix can be 0 during counting
  let prefixLength = 0;
  while (left !== right) {
    left >>= 1;
    right >>= 1;
    prefixLength++;
  }
  return left << prefixLength;
};
// @lc code=end

rangeBitwiseAnd(1, 2147483647);
