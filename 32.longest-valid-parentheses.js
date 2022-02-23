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
var longestValidParentheses = function (s)
{
    if (s.length === 0)
    {
        return 0;
    }

    let left = 0;
    let right = 0;
    let openLeftBracket = 0;
    let maxLength = 0;

    while (s[left] !== '(' && right < s.length)
    {
        left++;
        right++;
    }

    if (left === s.length)
    {
        return 0;
    }

    openLeftBracket = 1;

    while (right < s.length - 1)
    {
        right++;
        if (s[right] === '(')
        {
            openLeftBracket++;
        }
        else if (s[right] === ')')
        {
            openLeftBracket--;
        }

        if (openLeftBracket === 0)
        {
            maxLength = Math.max(maxLength, right - left + 1);
        }
        else if (openLeftBracket < 0)
        {
            left = right + 1;
            right++;
            while (s[left] !== '(' && right < s.length)
            {
                left++;
                right++;
            }
            if (left < s.length)
            {
                openLeftBracket = 1;
            }
            else
            {
                openLeftBracket = 0;
            }
        }
    }

    if (openLeftBracket > 0)
    {
        const stack = [];
        for (let i = left; i <= right; i++)
        {
            if (s[i] === '(')
            {
                stack.push(i);
            }
            else
            {
                stack.pop();
            }
        }

        maxLength = Math.max(maxLength,
            right - stack[stack.length - 1],
            stack[0] - left);

        for (let i = 1; i < stack.length; i++)
        {
            maxLength = Math.max(maxLength,
                stack[i] - stack[i - 1] - 1);
        }
    }

    return maxLength;
};
// @lc code=end

longestValidParentheses('(()()(())((');