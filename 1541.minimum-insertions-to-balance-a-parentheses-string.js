/*
 * @lc app=leetcode id=1541 lang=javascript
 *
 * [1541] Minimum Insertions to Balance a Parentheses String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var minInsertions = function (s)
{
    const stack = [];
    let addCount = 0;

    for (let i = 0; i < s.length; i++)
    {
        if (s[i] === '(')
        {
            if (stack.length === 0)
            {
                stack.push('(');
            }
            else if (stack[stack.length - 1] === ')')
            {
                addCount++;
                stack.pop();
                stack.pop();
                stack.push('(');
            }
            else
            {
                stack.push('(');
            }
        }
        else
        {
            if (stack.length === 0)
            {
                addCount++;
                stack.push('(');
                stack.push(')');
            }
            else if (stack[stack.length - 1] === ')')
            {
                stack.pop();
                stack.pop();
            }
            else
            {
                stack.push(')');
            }
        }
    }

    while (stack.length > 0)
    {
        if (stack[stack.length - 1] === '(')
        {
            addCount += 2;
            stack.pop();
        }
        else
        {
            addCount += 1;
            stack.pop();
            stack.pop();
        }
    }

    return addCount;
};
// @lc code=end