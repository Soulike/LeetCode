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
var removeCoveredIntervals = function (intervals)
{
    if (intervals.length === 1)
    {
        return 1;
    }

    // 按照 start 升序排序，如果 start 相同，按照 end 降序排序
    intervals.sort(([start1, end1], [start2, end2]) =>
    {
        if (start1 === start2)
        {
            return end2 - end1;
        }
        else
        {
            return start1 - start2;
        }
    });

    let count = 0;
    let right = -1; // 当前见过的最大的 end

    for (const [_, end] of intervals)
    {
        if (end > right)    // 见到了更大的，是新区间
        {
            count++;
            right = end;
        }
        // 没见到更大的，start 也一定大于等于之前的，所以会被合并
    }

    return count;
};
// @lc code=end