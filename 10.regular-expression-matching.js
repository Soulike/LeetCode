/*
 * @lc app=leetcode id=10 lang=javascript
 *
 * [10] Regular Expression Matching
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
     * 从 s 的 i 位置和 p 的 j 位置开始，之后能否全部匹配？
     * @param {number} i 
     * @param {number} j 
     */
    function helper(i, j)
    {
        const cacheKey = `${i}-${j}`;
        if (cache.has(cacheKey))
        {
            return cache.get(cacheKey);
        }
        if (i === s.length && j === p.length)
        {
            return true;
        }
        if (j === p.length)
        {
            return false;
        }

        if (i === s.length)
        {
            // 下一个不是*号
            if (j === p.length - 1 || p[j + 1] !== '*')
            {
                return false;
            }
            else    // 下一个是 * 号
            {
                return helper(i, j + 2);
            }
        }

        let result;

        // 下一个不是*号
        if (j === p.length - 1 || p[j + 1] !== '*')
        {
            if (p[j] === '.' || p[j] === s[i])
            {
                result = helper(i + 1, j + 1);
            }
            else
            {
                result = false;
            }
        }
        else    // 下一个是 * 号
        {
            if (p[j] === '.' || p[j] === s[i])
            {
                result = helper(i, j + 2) // 匹配 0 次
                    || helper(i + 1, j);    // 匹配多次
            }
            else
            {
                result = helper(i, j + 2); // 匹配 0 次
            }
        }

        cache.set(cacheKey, result);
        return result;
    }

    return helper(0, 0);
};
// @lc code=end

console.log(isMatch('a', 'a*'));