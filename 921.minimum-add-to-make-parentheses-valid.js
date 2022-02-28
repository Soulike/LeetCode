/*
 * @lc app=leetcode id=921 lang=javascript
 *
 * [921] Minimum Add to Make Parentheses Valid
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var minAddToMakeValid = function (s)
{
    let addCount = 0;
    let stack = [];
    for (const c of s)
    {
        if (c === '(')
        {
            stack.push(c);
        }
        else if (c === ')')
        {
            if (stack.length === 0 
                || stack[stack.length - 1] !== '(')
            {
                addCount++;
            }
            else
            {
                stack.pop();
            }
        }
    }

    addCount += stack.length;

    return addCount;
};
// @lc code=end