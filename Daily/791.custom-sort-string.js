/*
 * @lc app=leetcode id=791 lang=javascript
 *
 * [791] Custom Sort String
 */

// @lc code=start
/**
 * @param {string} order
 * @param {string} s
 * @return {string}
 */
var customSortString = function (order, s) {
    return s
        .split('')
        .sort((a, b) => order.indexOf(a) - order.indexOf(b))
        .join('');
};
// @lc code=end
