/*
 * @lc app=leetcode id=14 lang=javascript
 *
 * [14] Longest Common Prefix
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
const longestCommonPrefix = function (strs) 
{
    let currentIndex = 0;
    let currentChar = '';
    const LEN = strs.length;
    if (LEN === 0)
    {
        return '';
    }
    if (LEN === 1)
    {
        return strs[0];
    }
    while (true)
    {
        for (let i = 0; i <= LEN; i++)
        {
            if (i !== LEN && strs[i].length === 0)
            {
                return "";
            }
            if (i === 0)
            {
                currentChar = strs[i].charAt(currentIndex);
            }
            else if (i === LEN)
            {
                currentIndex++;
            }
            else
            {
                if (currentIndex === strs[i].length || strs[i].charAt(currentIndex) !== currentChar)
                {
                    return strs[0].slice(0, currentIndex);
                }
            }
        }
    }
};
// @lc code=end

