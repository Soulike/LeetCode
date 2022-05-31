/*
 * @lc app=leetcode id=1461 lang=javascript
 *
 * [1461] Check If a String Contains All Binary Codes of Size K
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
var hasAllCodes = function (s, k)
{
    const totalNumCount = 2 ** k;

    let currentNum = 0;
    const numSet = new Set();

    const kMask = 2 ** (k - 1) - 1;

    for (let i = 0; i < k; i++)
    {
        currentNum <<= 1;
        currentNum += s[i] === '0' ? 0b0 : 0b1;
    }
    numSet.add(currentNum);

    for (let i = k; i < s.length; i++)
    {
        currentNum &= kMask;    // 抹掉最高位
        currentNum <<= 1;
        currentNum += s[i] === '0' ? 0b0 : 0b1;
        numSet.add(currentNum);
        if (numSet.size === totalNumCount)
        {
            return true;
        }
    }

    return false;
};
// @lc code=end