/*
 * @lc app=leetcode id=984 lang=javascript
 *
 * [984] String Without AAA or BBB
 */

// @lc code=start
/**
 * @param {number} a
 * @param {number} b
 * @return {string}
 */
var strWithout3a3b = function (a, b)
{
    const n = a + b;
    const cache = new Map();
    /**
     * 返回任意一个合法答案，如果没有，返回 null
     * @param {string[]} strArr
     * @param {number} aCount - str 末尾连续的 a 个数
     * @param {number} bCount - str 末尾连续的 b 个数
     * @param {number} leftA
     * @param {number} leftB
     * @returns {string | null}
     */
    function dfs(strArr, aCount, bCount, leftA, leftB)
    {
        const cacheKey = `${aCount}-${bCount}-${leftA}-${leftB}`;
        if (cache.has(cacheKey))
        {
            return cache.get(cacheKey);
        }
        
        if (strArr.length === n)
        {
            const result = strArr.join('');
            cache.set(cacheKey, result);
            return result;
        }
        else
        {
            if (aCount < 2 && leftA > 0)    // 可以接 a
            {
                strArr.push('a');
                const result = dfs(strArr, aCount + 1, 0, leftA - 1, leftB);
                strArr.pop();
                if (result !== null)
                {
                    cache.set(cacheKey, result);
                    return result;
                }
            }

            if (bCount < 2 && leftB > 0)    // 可以接 b
            {
                strArr.push('b');
                const result = dfs(strArr, 0, bCount + 1, leftA, leftB - 1);
                strArr.pop();
                if (result !== null)
                {
                    cache.set(cacheKey, result);
                    return result;
                }
            }
            cache.set(cacheKey, null);
            return null;
        }
    }

    return dfs([], 0, 0, a, b);
};
// @lc code=end

console.log(strWithout3a3b(71, 81));