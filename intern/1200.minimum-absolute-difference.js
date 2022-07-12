/*
 * @lc app=leetcode id=1200 lang=javascript
 *
 * [1200] Minimum Absolute Difference
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number[][]}
 */
const minimumAbsDifference = function (arr) {
    arr.sort((a, b) => a - b);
    let minDiff = Number.POSITIVE_INFINITY;
    let result = [];
    for (let i = 1; i < arr.length; i++) {
        const diff = arr[i] - arr[i - 1];
        if (diff < minDiff) {
            result = [];
            result.push([arr[i - 1], arr[i]]);
            minDiff = diff;
        } else if (diff === minDiff) {
            result.push([arr[i - 1], arr[i]]);
        }
    }
    return result;
};
// @lc code=end
