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
    const cache = new Map();
    /**
     * 返回任意一个合法答案，如果没有，返回 null
     * @param {number} aCount - str 末尾连续的 a 个数
     * @param {number} bCount - str 末尾连续的 b 个数
     * @param {number} leftA
     * @param {number} leftB
     * @returns {string[] | null}
     */
    function dfs(aCount, bCount, leftA, leftB)
    {
        const cacheKey = `${aCount}-${bCount}-${leftA}-${leftB}`;
        if (cache.has(cacheKey))
        {
            return cache.get(cacheKey);
        }

        if (leftA === 0 && leftB === 0)
        {
            const result = [];
            cache.set(cacheKey, []);
            return result;
        }
        else
        {
            if (aCount < 2 && leftA > 0)    // 可以接 a
            {
                const result = dfs(aCount + 1, 0, leftA - 1, leftB);
                if (result !== null)
                {
                    result.push('a');
                    cache.set(cacheKey, [...result]);
                    return result;
                }
            }

            if (bCount < 2 && leftB > 0)    // 可以接 b
            {
                const result = dfs(0, bCount + 1, leftA, leftB - 1);
                if (result !== null)
                {
                    result.push('b');
                    cache.set(cacheKey, [...result]);
                    return result;
                }
            }
            cache.set(cacheKey, null);
            return null;
        }
    }

    return dfs(0, 0, a, b).join('');
};
// @lc code=end

console.log(strWithout3a3b(71, 81));