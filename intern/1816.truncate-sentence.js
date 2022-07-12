/*
 * @lc app=leetcode id=1816 lang=javascript
 *
 * [1816] Truncate Sentence
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var truncateSentence = function (s, k) {
    for (let i = 0; i < s.length; i++) {
        if (s[i] === ' ') {
            k--;
            if (k === 0) {
                return s.slice(0, i);
            }
        }
    }
    return s;
};
// @lc code=end
