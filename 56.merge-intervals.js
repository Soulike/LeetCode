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
    intervals.sort(([s1, e1], [s2, e2]) =>
    {
        if (s1 !== s2)
        {
            return s1 - s2;
        }
        else
        {
            return e1 - e2;
        }
    });

    const results = [];
    let currentStart = intervals[0][0];
    let currentEnd = intervals[0][1];

    for (const [start, end] of intervals)
    {
        if (start > currentEnd)
        {
            results.push([currentStart, currentEnd]);
            currentStart = start;
            currentEnd = end;
        }
        else
        {
            currentEnd = Math.max(currentEnd, end);
        }
    }

    results.push([currentStart, currentEnd]);
    return results;
};
// @lc code=end

