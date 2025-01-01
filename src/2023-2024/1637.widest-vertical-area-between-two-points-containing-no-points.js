/*
 * @lc app=leetcode id=1637 lang=javascript
 *
 * [1637] Widest Vertical Area Between Two Points Containing No Points
 */

// @lc code=start
/** @typedef {[x: number, y: number]} Point */
/**
 * @param {Point[]} points
 * @return {number}
 */
var maxWidthOfVerticalArea = function (points) {
  points.sort((a, b) => a[0] - b[0]);

  let maxDiff = -Infinity;

  for (let i = 1; i < points.length; i++) {
    maxDiff = Math.max(points[i][0] - points[i - 1][0], maxDiff);
  }

  return maxDiff;
};
// @lc code=end
