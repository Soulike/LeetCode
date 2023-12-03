/*
 * @lc app=leetcode id=1266 lang=javascript
 *
 * [1266] Minimum Time Visiting All Points
 */

// @lc code=start
/** @typedef {[x: number, y: number]} {Point} */

/**
 * @param {Point[]} points
 * @return {number}
 */
var minTimeToVisitAllPoints = function (points) {
    let minTime = 0;
    for (let i = 0; i < points.length - 1; i++) {
        minTime += minTimeBetween(points[i], points[i + 1]);
    }
    return minTime;
};

/**
 *
 * @param {Point} point1
 * @param {Point} point2
 * @returns {number}
 */
function minTimeBetween(point1, point2) {
    const xDiff = Math.abs(point1[0] - point2[0]);
    const yDiff = Math.abs(point1[1] - point2[1]);

    const diagonalTime = Math.min(xDiff, yDiff);
    return diagonalTime + (xDiff - diagonalTime) + (yDiff - diagonalTime);
}
// @lc code=end
