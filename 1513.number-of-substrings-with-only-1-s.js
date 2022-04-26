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
    let leftIndex = -1; // 连续 1 的最左侧下标
    let rightIndex = -1;    // 连续 1 的最右侧的下一个下标

    for (let i = 0; i < s.length; i++)
    {
        if (s[i] === '1')
        {
            leftIndex = i;
            rightIndex = i + 1;
            break;
        }
    }

    if (leftIndex === -1)
    {
        return 0;
    }

    while (true)
    {
        while (rightIndex < s.length
            && s[rightIndex] === '1')
        {
            rightIndex++;
        }
        numSubCount += getSunStrNum(rightIndex - leftIndex) % MOD;
        numSubCount %= MOD;

        if (rightIndex === s.length)
        {
            return numSubCount;
        }
        else
        {
            leftIndex = rightIndex;

            while (leftIndex < s.length
                && s[leftIndex] === '0')
            {
                leftIndex++;
            }

            if (leftIndex === s.length)
            {
                return numSubCount;
            }
            else
            {
                rightIndex = leftIndex + 1;
            }
        }
    }
};

function getSunStrNum(n)
{
    return n * (n + 1) / 2;
}
// @lc code=end