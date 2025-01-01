/*
 * @lc app=leetcode id=1137 lang=javascript
 *
 * [1137] N-th Tribonacci Number
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var tribonacci = function (n) {
  /** @type {Uint32Array} */
  const last3Numbers = new Uint32Array([0, 1, 1]);
  if (n < 3) return last3Numbers[n];
  for (let i = 3; i <= n; i++) {
    [last3Numbers[0], last3Numbers[1], last3Numbers[2]] = [
      last3Numbers[1],
      last3Numbers[2],
      last3Numbers[0] + last3Numbers[1] + last3Numbers[2],
    ];
  }

  return last3Numbers[2];
};
// @lc code=end
