/*
 * @lc app=leetcode id=172 lang=javascript
 *
 * [172] Factorial Trailing Zeroes
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function (n) {
  let count = 0;
  let exp = 1;
  while (true) {
    const currentCount = Math.floor(n / 5 ** exp);
    if (currentCount === 0) {
      return count;
    }
    count += currentCount;
    exp++;
  }
};
// @lc code=end
