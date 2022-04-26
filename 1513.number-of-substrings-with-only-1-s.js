/*
 * @lc app=leetcode id=1513 lang=javascript
 *
 * [1513] Number of Substrings With Only 1s
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var numSub = function (s)
{
    const MOD = 10 ** 9 + 7;
    let numSubCount = 0;
    let currentSubCount = 0;

    for (const c of s)
    {
        if (c === '1')
        {
            currentSubCount++;
            numSubCount += currentSubCount;
        }
        else
        {
            currentSubCount = 0;
        }
    }

    return numSubCount % MOD;
};

// @lc code=end