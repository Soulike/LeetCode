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
    return String.fromCharCode(getASCIISum(t) - getASCIISum(s));
};

/**
 * @param {string} s
 * @returns {number}
 */
function getASCIISum(s) {
    let sum = 0;
    for (let i = 0; i < s.length; i++) {
        sum += s.charCodeAt(i);
    }
    return sum;
}
// @lc code=end
