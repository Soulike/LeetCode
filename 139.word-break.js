/*
 * @lc app=leetcode id=139 lang=javascript
 *
 * [139] Word Break
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const wordBreak = function (s, wordDict)
{
    const cache = new Map();
    return helper(s, new Set(wordDict), cache);
};

/**
 * @param {string} s
 * @param {Set<string>} wordDict
 * @param {Map<string, boolean>} cache
 * @return {boolean}
 */
function helper(s, wordDict, cache)
{
    const cacheResult = cache.get(s);
    if (cacheResult !== undefined)
    {
        return cacheResult;
    }
    const LENGTH = s.length;
    if (LENGTH === 0)
    {
        return true;
    }
    if (wordDict.has(s))
    {
        cache.set(s, true);
        return true;
    }
    for (let i = 1; i < LENGTH; i++)
    {
        const leftString = s.slice(0, i);
        const rightString = s.slice(i);
        if (helper(leftString, wordDict, cache)
            && helper(rightString, wordDict, cache))
        {
            cache.set(s, true);
            return true;
        }
    }

    cache.set(s, false);
    return false;
}
// @lc code=end