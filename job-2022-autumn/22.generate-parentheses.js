/*
 * @lc app=leetcode id=22 lang=javascript
 *
 * [22] Generate Parentheses
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    /** @type {string[]} */
    const results = [];
    /** @type {('('|')')[]} */
    const stack = [];
    let leftCount = 0;
    let leftInStackCount = 0;

    const backtrack = () => {
        if (stack.length === 2 * n) {
            results.push(stack.join(''));
        } else {
            if (leftCount < n) {
                stack.push('(');
                leftCount++;
                leftInStackCount++;

                backtrack();

                leftInStackCount--;
                leftCount--;
                stack.pop();
            }

            if (leftInStackCount > 0) {
                stack.push(')');
                leftInStackCount--;
                backtrack();
                leftInStackCount++;
                stack.pop();
            }
        }
    };

    backtrack();

    return results;
};
// @lc code=end
