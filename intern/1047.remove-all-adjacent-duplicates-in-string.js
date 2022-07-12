/*
 * @lc app=leetcode id=1047 lang=javascript
 *
 * [1047] Remove All Adjacent Duplicates In String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function (s) {
    const stack = [];

    for (const c of s) {
        if (stack.length === 0) {
            stack.push(c);
        } else {
            const top = stack[stack.length - 1];
            if (top === c) {
                stack.pop();
            } else {
                stack.push(c);
            }
        }
    }

    return stack.join('');
};
// @lc code=end
