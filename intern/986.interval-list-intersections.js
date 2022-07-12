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
    let results = [];
    let firstIndex = 0;
    let secondIndex = 0;
    while (firstIndex < firstList.length && secondIndex < secondList.length) {
        const [start1, end1] = firstList[firstIndex];
        const [start2, end2] = secondList[secondIndex];

        if (end1 < start2) {
            firstIndex++;
        } else if (start1 > end2) {
            secondIndex++;
        } else if (start1 >= start2) {
            if (end1 >= end2) {
                results.push([start1, end2]);
                secondIndex++;
            } else {
                results.push([start1, end1]);
                firstIndex++;
            }
        } else {
            if (end1 >= end2) {
                results.push([start2, end2]);
                secondIndex++;
            } else {
                results.push([start2, end1]);
                firstIndex++;
            }
        }
    }

    return results;
};
// @lc code=end
