/*
 * @lc app=leetcode id=856 lang=javascript
 *
 * [856] Score of Parentheses
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var scoreOfParentheses = function (s)
{
    /** @type {('('|number)[]} */
    const stack = [];

    for (const c of s)
    {
        if (c === '(')
        {
            stack.push('(');
        }
        else
        {
            if (stack[stack.length - 1] === '(')
            {
                stack.pop();
                stack.push(1);
            }
            else
            {
                let currentScore = 0;
                while (stack[stack.length - 1] !== '(')
                {
                    currentScore += stack.pop();
                }
                stack.pop();
                stack.push(currentScore * 2);
            }
        }
    }

    return stack.reduce((prev, curr) => prev+curr);
};
// @lc code=end