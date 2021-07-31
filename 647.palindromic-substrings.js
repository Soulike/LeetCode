/*
 * @lc app=leetcode id=647 lang=javascript
 *
 * [647] Palindromic Substrings
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
const countSubstrings = function (s) 
{
    let count = 0;
    let nextOdd = true;
    let nextEven = true;
    for (let i = 0; i < s.length; i++)
    {
        nextOdd = true;
        nextEven = true;
        for (let j = 0; i - j >= 0 && i + j < s.length; j++)
        {
            if (nextOdd && s.charAt(i - j) === s.charAt(i + j))
            {
                count++;
                nextOdd = true;
            }
            else
            {
                nextOdd = false;
            }

            if (i + j + 1 < s.length && s.charAt(i - j) === s.charAt(i + j + 1) && nextEven)
            {
                nextEven = true;
                count++;
            }
            else
            {
                nextEven = false;
            }

            if (!nextEven && !nextOdd)
            {
                break;
            }
        }
    }
    return count;
};
// @lc code=end

