/*
 * @lc app=leetcode id=830 lang=javascript
 *
 * [830] Positions of Large Groups
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number[][]}
 */
const largeGroupPositions = function (s)
{
    let currentGroupLetter = s[0];
    let currentGroupStartIndex = 0;
    /**@type {number[][]} */
    const groups = [];
    const LENGTH = s.length;
    for (let i = 1; i < LENGTH; i++)
    {
        if (s.charAt(i) !== currentGroupLetter)
        {
            if (i - currentGroupStartIndex >= 3)
            {
                groups.push([currentGroupStartIndex, i - 1]);
            }
            currentGroupStartIndex = i;
            currentGroupLetter = s.charAt(i);
        }
    }
    if (LENGTH - currentGroupStartIndex >= 3)
    {
        groups.push([currentGroupStartIndex, LENGTH - 1]);
    }
    return groups;
};
// @lc code=end

