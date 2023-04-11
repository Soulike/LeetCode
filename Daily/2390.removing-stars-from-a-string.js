/*
 * @lc app=leetcode id=2390 lang=javascript
 *
 * [2390] Removing Stars From a String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var removeStars = function (s) {
    /** @type {string[]} */
    const stack = [];

    for (const c of s) {
        if (c === '*') stack.pop();
        else stack.push(c);
    }

    return stack.join('');
};
// @lc code=end
