/*
 * @lc app=leetcode id=32 lang=javascript
 *
 * [32] Longest Valid Parentheses
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
    if (s.length === 0) {
        return 0;
    }

    let maxLength = 0;

    const stack = [];
    for (let i = 0; i < s.length; i++) {
        if (stack.length === 0) {
            stack.push(i);
        } else if (s[i] === '(') {
            stack.push(i);
        } else {
            if (s[stack[stack.length - 1]] === '(') {
                stack.pop();
            } else {
                stack.push(i);
            }
        }
    }

    // 最后栈里剩下的都是无效括号，中间夹的都是有效括号的范围
    if (stack.length === 0) {
        return s.length;
    } else {
        maxLength = Math.max(
            maxLength,
            s.length - stack[stack.length - 1] - 1,
            stack[0] - 0,
        );

        for (let i = 1; i < stack.length; i++) {
            maxLength = Math.max(maxLength, stack[i] - stack[i - 1] - 1);
        }

        return maxLength;
    }
};
// @lc code=end
