/*
 * @lc app=leetcode id=44 lang=javascript
 *
 * [44] Wildcard Matching
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p)
{
    const cache = new Map();
    /**
     * s[i:] 和 p[j:] 可以匹配吗？
     * @param {number} i 
     * @param {number} j 
     */
    function dp(i, j)
    {
        const cacheKey = `${i}-${j}`;
        if (cache.has(cacheKey))
        {
            return cache.get(cacheKey);
        }
        if (i === s.length)
        {
            if (j === p.length)
            {
                cache.set(cacheKey, true);
                return true;
            }
            else if (j < p.length)
            {
                if (p[j] === '*')
                {
                    return dp(i, j + 1);
                }
                else
                {
                    cache.set(cacheKey, false);
                    return false;
                }
            }
        }
        else if (i < s.length)
        {
            let result;
            if (p[j] === '*')
            {
                result = dp(i, j + 1) // 不匹配
                    || dp(i + 1, j);    // 匹配一次或者多次
            }
            else 
            {
                if (s[i] === p[j] || p[j] === '?')
                {
                    result = dp(i + 1, j + 1);
                }
                else
                {
                    result = false;
                }
            }
            cache.set(cacheKey, result);
            return result;
        }
    }

    const result = dp(0, 0);
    return result;
};
// @lc code=end