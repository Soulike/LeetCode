/*
 * @lc app=leetcode id=1784 lang=javascript
 *
 * [1784] Check if Binary String Has at Most One Segment of Ones
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var checkOnesSegment = function (s)
{
    let left = 0;
    let right = 0;

    for (let i = 0; i <= s.length; i++)
    {
        if (i === s.length || s[i] === '1')
        {
            left = i;
            right = i;
            break;
        }
    }

    let segmentCount = 0;

    while (left < s.length)
    {
        while (right < s.length && s[right] === '1')
        {
            right++;
        }

        segmentCount++;
        if (segmentCount === 2)
        {
            return false;
        }

        left = right;

        for (let i = left; i <= s.length; i++)
        {
            if (i === s.length || s[i] === '1')
            {
                left = i;
                right = i;
                break;
            }
        }
    }

    return segmentCount === 1;
};
// @lc code=end