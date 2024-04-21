/*
 * @lc app=leetcode id=263 lang=javascript
 *
 * [263] Ugly Number
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
var isUgly = function (n) {
  if (n < 1) return false;
  while (n > 1) {
    const nCopy = n;
    if (n % 2 === 0) {
      n /= 2;
    }
    if (n % 3 === 0) {
      n /= 3;
    }
    if (n % 5 === 0) {
      n /= 5;
    }

    if (n === nCopy) {
      return false;
    }
  }
  return true;
};
// @lc code=end
