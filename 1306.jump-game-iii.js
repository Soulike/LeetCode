/*
 * @lc app=leetcode id=1306 lang=javascript
 *
 * [1306] Jump Game III
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
const canReach = function (arr, start)
{
    const visitedIndexes = new Set();
    const cache = new Map();
    return helper(arr, start, visitedIndexes, cache);
};

/**
 * @param {number[]} arr
 * @param {number} start
 * @param {Set<number>} visitedIndexes
 * @param {Map<number, boolean>} cache
 * @return {boolean}
 */
function helper(arr, start, visitedIndexes, cache)
{
    const cached = cache.get(start);
    if (cached !== undefined)
    {
        return cached;
    }

    if (arr[start] === 0)
    {
        cache.set(start, true);
        return true;
    }
    else if (visitedIndexes.has(start))
    {
        cache.set(start, false);
        return false;
    }
    else
    {
        visitedIndexes.add(start);
        let reachable = false;
        const step = arr[start];
        if (start + step < arr.length)
        {
            reachable = reachable || helper(arr, start + step, visitedIndexes, cache);
        }
        if (reachable)
        {
            cache.set(start, true);
            return true;
        }
        if (start - step >= 0)
        {
            reachable = reachable || helper(arr, start - step, visitedIndexes, cache);
        }
        cache.set(start, reachable);
        return reachable;
    }
}
// @lc code=end