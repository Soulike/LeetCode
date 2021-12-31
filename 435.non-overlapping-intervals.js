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
const eraseOverlapIntervals = function (intervals)
{
    if (intervals.length < 2)
    {
        return 0;
    }

    intervals.sort(([, end1], [, end2]) => end1 - end2);
    let removeCount = 0;
    let leftIntervalIndex = 0;
    let rightIntervalIndex = 1;

    while (rightIntervalIndex < intervals.length)
    {
        const [, leftEnd] = intervals[leftIntervalIndex];
        const [rightStart] = intervals[rightIntervalIndex];
        if (rightStart < leftEnd)
        {
            removeCount++;
            rightIntervalIndex++;
        }
        else
        {
            leftIntervalIndex = rightIntervalIndex;
            rightIntervalIndex = leftIntervalIndex + 1;
        }
    }

    return removeCount;
};
// @lc code=end