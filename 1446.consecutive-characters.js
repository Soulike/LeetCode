/*
 * @lc app=leetcode id=1446 lang=javascript
 *
 * [1446] Consecutive Characters
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
const maxPower = function (s)
{
    const LENGTH = s.length;
    if (LENGTH < 2)
    {
        return 1;
    }
    let leftIndex = 0;
    let rightIndex = 0;
    let maxPower = 0;
    while (rightIndex < s.length)
    {
        rightIndex++;
        if (s[rightIndex] !== s[leftIndex])
        {
            maxPower = Math.max(maxPower, rightIndex - leftIndex);
            leftIndex = rightIndex;
        }
    }
    return maxPower;
};
// @lc code=end