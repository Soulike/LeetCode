/*
 * @lc app=leetcode id=452 lang=javascript
 *
 * [452] Minimum Number of Arrows to Burst Balloons
 */

// @lc code=start
/**
 * @param {[start: number, end: number][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {
  points.sort(([, end1], [, end2]) => end1 - end2);

  const START = 0;
  const END = 1;
  const N = points.length;

  let arrowCount = 1;
  let currentEnd = points[0][END];
  for (let i = 1; i < N; i++) {
    if (points[i][START] > currentEnd) {
      currentEnd = points[i][END];
      arrowCount++;
    }
  }

  return arrowCount;
};
// @lc code=end
