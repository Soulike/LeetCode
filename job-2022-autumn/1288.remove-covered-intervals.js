/*
 * @lc app=leetcode id=1288 lang=javascript
 *
 * [1288] Remove Covered Intervals
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var removeCoveredIntervals = function (intervals) {
    intervals.sort(([start1, end1], [start2, end2]) => {
        if (start1 !== start2) {
            return start1 - start2;
        } else {
            return end2 - end1;
        }
    });

    const START = 0;
    const END = 1;

    let currentEnd = intervals[0][END];
    let leftIntervalCount = 1;

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][END] > currentEnd) {
            leftIntervalCount++;
            currentEnd = intervals[i][END];
        }
    }

    return leftIntervalCount;
};
// @lc code=end
