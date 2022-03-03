/*
 * @lc app=leetcode id=1223 lang=javascript
 *
 * [1223] Dice Roll Simulation
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[]} rollMax
 * @return {number}
 */
var dieSimulator = function (n, rollMax)
{
    const MOD = 10 ** 9 + 7;
    const cache = new Map();
    function dfs(k, kCount, length)
    {
        const cacheKey = `${k}-${kCount}-${length}`;
        if (cache.has(cacheKey))
        {
            return cache.get(cacheKey);
        }

        if (length === n)
        {
            return 1;
        }

        let result = 0;
        if (kCount === rollMax[k-1])
        {
            for (let i = 1; i <= 6; i++)
            {
                if (i !== k)
                {
                    result += dfs(i, 1, length + 1);
                }
            }
        }
        else
        {
            for (let i = 1; i <= 6; i++)
            {
                if (i !== k)
                {
                    result += dfs(i, 1, length + 1);
                }
                else
                {
                    result += dfs(i, kCount + 1, length + 1);
                }
            }
        }

        cache.set(cacheKey, result % MOD);
        return result % MOD;
    }

    let result = 0;
    for (let i = 1; i <= 6; i++)
    {
        result += dfs(i, 1, 1);
    }
    return result % MOD;
};
// @lc code=end