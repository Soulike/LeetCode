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
    intervals.sort(([start1, end1], [start2, end2]) =>
    {
        if (end1 === end2)
        {
            return start2 - start1;
        }
        else
        {
            return end1 - end2;
        }
    });

    let currentIntervals = intervals;
    let nextIntervals = [];

    while (true)
    {
        for (let i = 0; i < currentIntervals.length - 1; i++)
        {
            const [start1, end1] = currentIntervals[i];
            const [start2, end2] = currentIntervals[i + 1];

            if (end1 < end2)
            {
                if (start1 < start2)
                {
                    nextIntervals.push(currentIntervals[i]);
                }
            }
        }

        nextIntervals.push(currentIntervals[currentIntervals.length - 1]);

        if (currentIntervals.length === nextIntervals.length)
        {
            return nextIntervals.length;
        }

        currentIntervals = nextIntervals;
        nextIntervals = [];
    }
};
// @lc code=end