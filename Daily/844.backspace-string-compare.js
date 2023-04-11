/*
 * @lc app=leetcode id=844 lang=javascript
 *
 * [844] Backspace String Compare
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
    return buildString(s) === buildString(t);
};

/**
 * @param {string} input
 * @returns {string}
 */
function buildString(input) {
    /** @type {string[]} */
    const stack = [];

    for (const c of input) {
        if (c === '#') stack.pop();
        else stack.push(c);
    }

    return stack.join('');
}
// @lc code=end
