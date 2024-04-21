/*
 * @lc app=leetcode id=2264 lang=javascript
 *
 * [2264] Largest 3-Same-Digit Number in String
 */

// @lc code=start
/**
 * @param {string} num
 * @return {string}
 */
var largestGoodInteger = function (num) {
  let maxInteger = -1;

  for (let i = 1; i < num.length - 1; i++) {
    if (num[i - 1] === num[i] && num[i] === num[i + 1]) {
      maxInteger = Math.max(maxInteger, Number.parseInt(num[i]));
    }
  }

  return maxInteger === -1 ? '' : maxInteger.toString().repeat(3);
};
// @lc code=end
