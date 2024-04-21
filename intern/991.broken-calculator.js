/*
 * @lc app=leetcode id=991 lang=javascript
 *
 * [991] Broken Calculator
 */

// @lc code=start
/**
 * @param {number} startValue
 * @param {number} target
 * @return {number}
 */
var brokenCalc = function (startValue, target) {
  let step = 0;
  while (target > startValue) {
    step++;
    if (target % 2 === 0) {
      target /= 2;
    } else {
      target += 1;
    }
  }

  return step + startValue - target;
};
// @lc code=end
