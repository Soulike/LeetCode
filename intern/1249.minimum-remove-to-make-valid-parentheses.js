/*
 * @lc app=leetcode id=1249 lang=javascript
 *
 * [1249] Minimum Remove to Make Valid Parentheses
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function (s) {
    const chars = [...s];
    /**
     * @type {['('|')',number][]} - [括号，下标]
     */
    const stack = [];

    for (let i = 0; i < chars.length; i++) {
        if (chars[i] === '(' || chars[i] === ')') {
            if (chars[i] === '(') {
                stack.push(['(', i]);
            } else if (chars[i] === ')') {
                if (stack.length === 0 || stack[stack.length - 1][0] === ')') {
                    stack.push([')', i]);
                } else {
                    stack.pop();
                }
            }
        }
    }

    for (const [, index] of stack) {
        chars[index] = '';
    }

    return chars.join('');
};
// @lc code=end
