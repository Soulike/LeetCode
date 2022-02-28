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
    let leftBracketCount = 0;

    for (const c of s)
    {
        if (c === '(')
        {
            leftBracketCount++;
        }
        else
        {
            if (leftBracketCount === 0)
            {
                addCount++;
            }
            else
            {
                leftBracketCount--;
            }
        }
    }

    return addCount + leftBracketCount;
};
// @lc code=end