/*
 * @lc app=leetcode id=20 lang=javascript
 *
 * [20] Valid Parentheses
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    /** @type {string[]} */
    const stack = [];

    for (const c of s) {
        if (c === '(' || c === '[' || c === '{') {
            stack.push(c);
        } else {
            if (stack.length === 0) return false;

            if (c === ')') {
                if (stack[stack.length - 1] !== '(') return false;
                else stack.pop();
            } else if (c === ']') {
                if (stack[stack.length - 1] !== '[') return false;
                else stack.pop();
            } else if (c === '}') {
                if (stack[stack.length - 1] !== '{') return false;
                else stack.pop();
            }
        }
    }

    return stack.length === 0;
};
// @lc code=end
