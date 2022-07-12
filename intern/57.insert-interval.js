/*
 * @lc app=leetcode id=57 lang=javascript
 *
 * [57] Insert Interval
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
const insert = function (intervals, newInterval) {
    const START = 0b01;
    const END = 0b10;
    const OTHER = undefined;
    const flags = [];
    for (const [start, end] of intervals) {
        flags[start] = (flags[start] ?? 0) | START;
        flags[end] = (flags[end] ?? 0) | END;
    }
    const [start, end] = newInterval;
    flags.fill(OTHER, start, end + 1);

    flags[start] = (flags[start] ?? 0) | START;
    flags[end] = (flags[end] ?? 0) | END;

    let result = [];
    for (let i = 0; i < flags.length; i++) {
        if ((flags[i] & START) !== 0b0) {
            let lastEndIndex = -1;
            // j=i, 因为 start 和 end 可能是同一个数
            for (let j = i; j <= flags.length; j++) {
                if (j === flags.length) {
                    // lastEndIndex 肯定存在
                    result.push([i, lastEndIndex]);
                    i = lastEndIndex;
                    break;
                }
                if ((flags[j] & START) !== 0b0) {
                    if (lastEndIndex !== -1) {
                        result.push([i, lastEndIndex]);
                        i = lastEndIndex;
                        break;
                    }
                }
                if ((flags[j] & END) !== 0b0) {
                    lastEndIndex = j;
                }
            }
        }
    }
    return result;
};
// @lc code=end
