/*
 * @lc app=leetcode id=435 lang=javascript
 *
 * [435] Non-overlapping Intervals
 */

// @lc code=start
/**
 * @param {[begin: number, end: number][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
    intervals.sort(([begin1, end1], [begin2, end2]) => {
        return end1 - end2;
    });

    const BEGIN = 0;
    const END = 1;

    let currentEnd = intervals[0][END];
    let eraseNumber = 0;

    for (let i = 1; i < intervals.length; i++) {
        const [start, end] = intervals[i];
        if (start >= currentEnd) currentEnd = end;
        else if (end >= currentEnd) {
            eraseNumber++;
        }
    }

    return eraseNumber;
};
// @lc code=end
