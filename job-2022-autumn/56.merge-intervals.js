/*
 * @lc app=leetcode id=56 lang=javascript
 *
 * [56] Merge Intervals
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
    intervals.sort(([start1, end1], [start2, end2]) => {
        if (start1 !== start2) {
            return start1 - start2;
        } else {
            return end2 - end1;
        }
    });

    const START = 0;
    const END = 1;

    /** @type {[start:number, end:number][]} */
    const results = [];
    let currentStart = intervals[0][START];
    let currentEnd = intervals[0][END];

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][START] > currentEnd) {
            results.push([currentStart, currentEnd]);
            currentStart = intervals[i][START];
            currentEnd = intervals[i][END];
        } else if (intervals[i][END] > currentEnd) {
            currentEnd = intervals[i][END];
        }
    }

    results.push([currentStart, currentEnd]);

    return results;
};
// @lc code=end
