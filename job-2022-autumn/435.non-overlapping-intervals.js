/*
 * @lc app=leetcode id=435 lang=javascript
 *
 * [435] Non-overlapping Intervals
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
    intervals.sort(([, end1], [, end2]) => end1 - end2);

    let removeCount = 0;

    for (let i = 0; i < intervals.length; i++) {
        let j;
        for (j = i + 1; j < intervals.length; j++) {
            if (intervals[j][0] >= intervals[i][1]) {
                break;
            }
            removeCount++;
        }
        i = j - 1;
    }

    return removeCount;
};
// @lc code=end
