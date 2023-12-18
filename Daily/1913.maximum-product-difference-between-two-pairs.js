/*
 * @lc app=leetcode id=1913 lang=javascript
 *
 * [1913] Maximum Product Difference Between Two Pairs
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProductDifference = function (nums) {
    let min = Infinity;
    let secondMin = Infinity;
    let max = -Infinity;
    let secondMax = -Infinity;

    for (const num of nums) {
        if (num <= min) {
            secondMin = min;
            min = num;
        } else if (num < secondMin) {
            secondMin = num;
        }

        if (num >= max) {
            secondMax = max;
            max = num;
        } else if (num > secondMax) {
            secondMax = num;
        }
    }

    return max * secondMax - min * secondMin;
};
// @lc code=end
