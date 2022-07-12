/*
 * @lc app=leetcode id=334 lang=javascript
 *
 * [334] Increasing Triplet Subsequence
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function (nums) {
    let num1 = Infinity;
    let num2 = Infinity;

    for (const num of nums) {
        if (num1 >= num) {
            num1 = num;
        } else if (num2 >= num) {
            // num1 < num
            num2 = num;
        } // num1 < num && num2 < num
        else {
            return true;
        }
    }

    return false;
};
// @lc code=end
