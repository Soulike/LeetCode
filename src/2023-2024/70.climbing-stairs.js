/*
 * @lc app=leetcode id=70 lang=javascript
 *
 * [70] Climbing Stairs
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let prev1 = 0;
  let prev2 = 1;

  for (let i = 1; i <= n; i++) {
    [prev1, prev2] = [prev2, prev1 + prev2];
  }

  return prev2;
};
// @lc code=end
