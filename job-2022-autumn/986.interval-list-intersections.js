/*
 * @lc app=leetcode id=986 lang=javascript
 *
 * [986] Interval List Intersections
 */

// @lc code=start
/**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */
var intervalIntersection = function (firstList, secondList) {
    const results = [];

    let firstListIndex = 0;
    let secondListIndex = 0;

    while (
        firstListIndex < firstList.length &&
        secondListIndex < secondList.length
    ) {
        const [start1, end1] = firstList[firstListIndex];
        const [start2, end2] = secondList[secondListIndex];

        if (end1 < start2) {
            // 1 在 2 前面
            firstListIndex++;
        } else if (start1 < start2 && end1 <= end2) {
            // 1 在 2 前面，但一部分在 2 当中
            results.push([start2, end1]);
            firstListIndex++;
        } else if (start1 >= start2 && end1 <= end2) {
            // 1 在 2 里面
            results.push([start1, end1]);
            firstListIndex++;
        } else if (start1 <= start2 && end1 >= end2) {
            // 2 在 1 里面
            results.push([start2, end2]);
            secondListIndex++;
        } else if (start1 <= end2 && end1 > end2) {
            // 2 在 1 前面，但一部分在 1 当中
            results.push([start1, end2]);
            secondListIndex++;
        } else if (end2 < start1) {
            // 2 在 1 前面
            secondListIndex++;
        }
    }

    return results;
};
// @lc code=end
