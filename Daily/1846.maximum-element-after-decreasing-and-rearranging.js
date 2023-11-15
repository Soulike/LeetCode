/*
 * @lc app=leetcode id=1846 lang=javascript
 *
 * [1846] Maximum Element After Decreasing and Rearranging
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
var maximumElementAfterDecrementingAndRearranging = function (arr) {
    arr.sort((a, b) => a - b);

    let max = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max++;
        }
    }

    return max;
};
// @lc code=end
