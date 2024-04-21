/*
 * @lc app=leetcode id=1109 lang=javascript
 *
 * [1109] Corporate Flight Bookings
 */

// @lc code=start
/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
var corpFlightBookings = function (bookings, n) {
  const result = new Array(n + 1);
  const diffs = new Array(n + 1);
  diffs.fill(0);

  for (const [start, end, count] of bookings) {
    diffs[start - 1] += count;
    diffs[end] -= count;
  }

  diffs.reduce((prev, curr, i) => {
    result[i] = prev + curr;
    return prev + curr;
  }, 0);

  return result.slice(0, -1);
};
// @lc code=end
