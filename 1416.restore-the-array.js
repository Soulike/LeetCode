/*
 * @lc app=leetcode id=1416 lang=javascript
 *
 * [1416] Restore The Array
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var numberOfArrays = function (s, k)
{
    const MOD = 10 ** 9 + 7;

    const cache = new Map();
    function dfs(startIndex)
    {
        if (cache.has(startIndex))
        {
            return cache.get(startIndex);
        }
        if (s[startIndex] === '0')
        {
            return 0;
        }
        if (startIndex === s.length - 1)
        {
            return Number.parseInt(s[startIndex]) <= k
                ? 1
                : 0;
        }

        let splitIndex = startIndex;
        let currentNum = 0;
        let count = 0;

        while (splitIndex < s.length)
        {
            currentNum *= 10;
            currentNum += Number.parseInt(s[splitIndex]);
            if (currentNum > k)
            {
                break;
            }

            if (splitIndex < s.length - 1)
            {
                count += dfs(splitIndex + 1);
            }
            else    // 逗号放在最后，整个数字就是一种可能性
            {
                count++;
            }
            count %= MOD;
            splitIndex++;
        }

        cache.set(startIndex, count);
        return count;
    }

    const result = dfs(0);
    return result;
};
// @lc code=end

numberOfArrays('1317',2000);