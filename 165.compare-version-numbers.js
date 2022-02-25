/*
 * @lc app=leetcode id=165 lang=javascript
 *
 * [165] Compare Version Numbers
 */

// @lc code=start
/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2)
{
    const version1Split = version1.split('.').map((val) => Number.parseInt(val));
    const version2Split = version2.split('.').map((val) => Number.parseInt(val));

    while (version1Split.length < version2Split.length)
    {
        version1Split.push(0);
    }

    while (version2Split.length < version1Split.length)
    {
        version2Split.push(0);
    }

    const n = version1Split.length;

    for (let i = 0; i < n; i++)
    {
        if (version1Split[i] > version2Split[i])
        {
            return 1;
        }
        else if (version2Split[i] > version1Split[i])
        {
            return -1;
        }
    }

    return 0;
};
// @lc code=end