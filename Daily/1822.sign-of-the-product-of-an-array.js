/*
 * @lc app=leetcode id=1822 lang=javascript
 *
 * [1822] Sign of the Product of an Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var arraySign = function (nums) {
    let sign = 1;
    for (const num of nums) {
        if (num === 0) return 0;

        if (num < 0) {
            sign *= -1;
        }
    }

    return sign;
};
// @lc code=end
