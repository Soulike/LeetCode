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
    /**
     * 区间按照 start 从小到大排序，如果 start 相同，end 按照从大到小排序
     */

    intervals.sort(([s1, e1], [s2, e2]) => {
        if (s1 !== s2) {
            return s1 - s2;
        } else {
            return e2 - e1;
        }
    });

    let count = 0;
    let maxEnd = -1;

    for (const [, end] of intervals) {
        if (end > maxEnd) {
            count++;
            maxEnd = end;
        }
    }

    return count;
};
// @lc code=end
