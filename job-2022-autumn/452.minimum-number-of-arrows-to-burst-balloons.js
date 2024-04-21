/*
 * @lc app=leetcode id=452 lang=javascript
 *
 * [452] Minimum Number of Arrows to Burst Balloons
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {
  points.sort(([, end1], [, end2]) => end1 - end2);

  let removeCount = 0;

  for (let i = 0; i < points.length; i++) {
    let j;
    for (j = i + 1; j < points.length; j++) {
      if (points[j][0] > points[i][1]) {
        break;
      }
      removeCount++;
    }
    i = j - 1;
  }

  return points.length - removeCount;
};
// @lc code=end
