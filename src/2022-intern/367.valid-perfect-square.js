/*
 * @lc app=leetcode id=367 lang=javascript
 *
 * [367] Valid Perfect Square
 */

// @lc code=start
/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function (num) {
  let left = 0;
  let right = 2 ** 16;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const current = mid * mid;
    if (current === num) {
      return true;
    } else if (current > num) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return false;
};
// @lc code=end
