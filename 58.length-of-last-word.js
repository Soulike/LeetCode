/*
 * @lc app=leetcode id=58 lang=javascript
 *
 * [58] Length of Last Word
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s)
{
    s = s.trimEnd();
    let right = s.length - 1;
    while (right >= 0
        && s[right] !== ' ')
    {
        right--;
    }

    return s.length - right - 1;
};
// @lc code=end

