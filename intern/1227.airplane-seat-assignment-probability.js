/*
 * @lc app=leetcode id=1227 lang=javascript
 *
 * [1227] Airplane Seat Assignment Probability
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var nthPersonGetsNthSeat = function (n) {
  return n === 1 ? 1 : 0.5;
};
// @lc code=end
