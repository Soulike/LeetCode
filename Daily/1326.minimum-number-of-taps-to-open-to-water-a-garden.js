/*
 * @lc app=leetcode id=1326 lang=javascript
 *
 * [1326] Minimum Number of Taps to Open to Water a Garden
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[]} ranges
 * @return {number}
 */
var minTaps = function (n, ranges) {
    const START = 0;
    const END = 1;

    /** @type {[start: number, end:number][]} */
    const coveredRanges = new Array(n + 1);
    for (let i = 0; i < ranges.length; i++) {
        coveredRanges[i] = [Math.max(i - ranges[i], 0), i + ranges[i]];
    }

    coveredRanges.sort(([start1, end1], [start2, end2]) => {
        if (start1 !== start2) return start1 - start2;
        else return end2 - end1;
    });

    if (coveredRanges[0][START] > 0) return -1;

    let tapCount = 1;
    let currentEnd = coveredRanges[0][END];
    let currentEndIndex = 0;

    if (currentEnd >= n) return 1;

    while (true) {
        let maxNextEnd = currentEnd;
        let maxNextEndIndex = currentEndIndex;
        for (let i = currentEndIndex + 1; i < coveredRanges.length; i++) {
            const [start, end] = coveredRanges[i];
            if (start > currentEnd) break;
            else if (end > maxNextEnd) {
                maxNextEndIndex = i;
                maxNextEnd = end;
            }
        }

        if (maxNextEndIndex === currentEndIndex) return -1;

        tapCount++;

        if (maxNextEnd >= n) return tapCount;

        currentEnd = maxNextEnd;
        currentEndIndex = maxNextEndIndex;
    }
};
// @lc code=end
