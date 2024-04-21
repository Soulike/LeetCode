/*
 * @lc app=leetcode id=1523 lang=javascript
 *
 * [1523] Count Odd Numbers in an Interval Range
 */

// @lc code=start
/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countOdds = function (low, high) {
  if (isEven(low)) {
    low++;
  }
  if (isEven(high)) {
    high--;
  }

  return (high - low) / 2 + 1;
};

/**
 * @param {number} number
 * @returns {boolean}
 */
function isEven(number) {
  return (number & 0b1) === 0;
}
// @lc code=end
