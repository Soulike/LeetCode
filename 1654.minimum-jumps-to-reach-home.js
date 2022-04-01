/*
 * @lc app=leetcode id=1654 lang=javascript
 *
 * [1654] Minimum Jumps to Reach Home
 */

// @lc code=start
/**
 * @param {number[]} forbidden
 * @param {number} a
 * @param {number} b
 * @param {number} x
 * @return {number}
 */
var minimumJumps = function (forbidden, a, b, x)
{
    const forbiddenSet = new Set(forbidden);
    const MAX = 2000 + a + b;

    const cache = new Map();
    const visited = new Set();
    /**
     * 从 start 起跳，最少需要跳多少次到终点
     * @param {number} start 
     * @param {boolean} lastIsBackward
     * @returns {number} - 如果不可能到达终点，返回 Infinity
     */
    function dfs(start, lastIsBackward)
    {
        const cacheKey = `${start}-${lastIsBackward}`;
        if (cache.has(cacheKey))
        {
            return cache.get(cacheKey);
        }

        if (start === x)
        {
            return 0;
        }

        if (start > MAX
            || start < 0
            || forbiddenSet.has(start)
            || visited.has(cacheKey))
        {
            return Infinity;
        }

        visited.add(cacheKey);

        let result;

        if (lastIsBackward)
        {
            result = 1 + dfs(start + a, false);
        }
        else
        {
            result = 1 + Math.min(
                dfs(start + a, false),
                dfs(start - b, true),
            );
        }

        cache.set(cacheKey, result);
        return result;
    }

    const result = dfs(0, false);
    return result === Infinity ? -1 : result;
};
// @lc code=end