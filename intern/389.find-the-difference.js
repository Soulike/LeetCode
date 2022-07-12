/*
 * @lc app=leetcode id=389 lang=javascript
 *
 * [389] Find the Difference
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var findTheDifference = function (s, t) {
    let c = 0;
    for (let i = 0; i < s.length; i++) {
        c ^= s.charCodeAt(i);
    }
    for (let i = 0; i < t.length; i++) {
        c ^= t.charCodeAt(i);
    }

    return String.fromCharCode(c);
};
// @lc code=end
