/*
 * @lc app=leetcode id=57 lang=javascript
 *
 * [57] Insert Interval
 */

// @lc code=start
/**
 * @param {[start:number, end:number][]} intervals
 * @param {[start:number, end:number]} newInterval
 * @return {[start:number, end:number][]}
 */
var insert = function (intervals, newInterval) {
    const START = 0;
    const END = 1;

    /** @type {[start:number, end:number][]} */
    const beforeIntervals = [];
    /** @type {[start:number, end:number][]} */
    const afterIntervals = [];

    for (let i = 0; i < intervals.length; i++) {
        const interval = intervals[i];
        if (interval[END] < newInterval[START]) {
            /*
                    |--N--|
            |--I--|
            */
            beforeIntervals.push(interval);
        } else if (interval[START] > newInterval[END]) {
            /*
                    |--I--|
            |--N--|
            */
            afterIntervals.push(interval);
        } else if (newInterval[START] < interval[START]) {
            if (newInterval[END] <= interval[END]) {
                /*
                |--N--|
                  |--I--|
                */
                newInterval[END] = interval[END];
            } else {
                /*
                |----N----|
                  |--I--|
                */
                // skip;
            }
        } else if (newInterval[START] === interval[START]) {
            if (newInterval[END] <= interval[END]) {
                /*
                |--N--|
                |----I----|
                */
                newInterval[END] = interval[END];
            } else {
                /*
                |----N----|
                |--I--|
                */
                // skip;
            }
        } else {
            // newInterval[START] > interval[START]
            newInterval[START] = interval[START];

            if (newInterval[END] <= interval[END]) {
                /*
                  |--N--|
                |----I----|
                */
                newInterval[END] = interval[END];
            } else {
                /*
                  |--N--|
                |--I--|
                */
                // skip;
            }
        }
    }

    const mergedIntervals = [
        ...beforeIntervals,
        newInterval,
        ...afterIntervals,
    ];
    return mergedIntervals;
};
// @lc code=end
