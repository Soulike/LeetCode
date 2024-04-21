/*
 * @lc app=leetcode id=371 lang=javascript
 *
 * [371] Sum of Two Integers
 */

// @lc code=start
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
const getSum = function (a, b) {
  if (b === 0) {
    return a;
  }
  const sum = a ^ b;
  const carry = (a & b & 0x7fffffff) << 1;
  return getSum(sum, carry);
};
// @lc code=end
