/*
 * @lc app=leetcode id=1641 lang=javascript
 *
 * [1641] Count Sorted Vowel Strings
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var countVowelStrings = function (n)
{
    /**
     * a e i o u 对应 1 2 3 4 5
     */
    const cache = new Map();
    return helper(1, n, cache);
};

/**
 * 以 startsWith 开头，还剩下 n 个位置，有多少种合法的字符串
 * @param {1|2|3|4|5} startsWith 
 * @param {number} n 
 * @param {Map<string, number>} cache
 * @returns {number}
 */
function helper(startsWith, n, cache)
{
    if (n === 0)
    {
        return 1;
    }

    const cacheKey = `${startsWith}-${n}`;
    if (cache.has(cacheKey))
    {
        return cache.get(cacheKey);
    }
    
    let count = 0;
    for (let i = startsWith; i <= 5; i++)
    {
        count += helper(i, n - 1, cache);
    }

    cache.set(cacheKey, count);
    return count;
}
// @lc code=end