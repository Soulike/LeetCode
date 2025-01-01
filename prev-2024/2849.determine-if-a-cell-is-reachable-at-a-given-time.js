/*
 * @lc app=leetcode id=2849 lang=javascript
 *
 * [2849] Determine if a Cell Is Reachable at a Given Time
 */

// @lc code=start
/**
 * @param {number} sx
 * @param {number} sy
 * @param {number} fx
 * @param {number} fy
 * @param {number} t
 * @return {boolean}
 */
var isReachableAtTime = function (sx, sy, fx, fy, t) {
  if (sx === fx && sy === fy) {
    return t !== 1;
  }
  const xDiff = Math.abs(sx - fx);
  const yDiff = Math.abs(sy - fy);

  const minSeconds = Math.max(xDiff, yDiff);
  return t >= minSeconds;
};
// @lc code=end
