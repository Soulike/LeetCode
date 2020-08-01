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
const merge = function (intervals) 
{
    const intervalsLength = intervals.length;
    if (intervalsLength < 2)
    {
        return intervals;
    }
    intervals.sort((a, b) => a[0] - b[0]);
    /**@type {number[][]} */
    const result = [intervals[0]];
    let beforeEnd = 0;
    let afterStart = 0;
    let afterEnd = 0;
    for (let i = 1; i < intervalsLength; i++)
    {
        beforeEnd = result[result.length - 1][1];
        afterStart = intervals[i][0];
        afterEnd = intervals[i][1];
        if (afterStart <= beforeEnd)
        {
            result[result.length - 1][1] = Math.max(beforeEnd, afterEnd);
        }
        else
        {
            result.push(intervals[i]);
        }
    }
    return result;
};
// @lc code=end

