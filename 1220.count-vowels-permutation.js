/*
 * @lc app=leetcode id=1220 lang=javascript
 *
 * [1220] Count Vowels Permutation
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var countVowelPermutation = function (n)
{
    const cache = new Map();
    /**
     *  
     * @param {'a'|'e'|'i'|'o'|'u'|null} lastLetter 
     * @param {number} n 
     * @returns {number}
     */
    function helper(lastLetter, n)
    {
        const cacheKey = `${lastLetter}-${n}`;
        if (cache.has(cacheKey))
        {
            return cache.get(cacheKey);
        }

        if (n === 0)
        {
            return 1;
        }

        let count = 0;

        if (lastLetter === null)
        {
            count += helper('a', n - 1);
            count += helper('e', n - 1);
            count += helper('i', n - 1);
            count += helper('o', n - 1);
            count += helper('u', n - 1);
        }
        else if (lastLetter === 'a')
        {
            count += helper('e', n - 1);
        }
        else if (lastLetter === 'e')
        {
            count += helper('a', n - 1);
            count += helper('i', n - 1);
        }
        else if (lastLetter === 'i')
        {
            count += helper('a', n - 1);
            count += helper('e', n - 1);
            count += helper('o', n - 1);
            count += helper('u', n - 1);
        }
        else if (lastLetter === 'o')
        {
            count += helper('i', n - 1);
            count += helper('u', n - 1);
        }
        else if (lastLetter === 'u')
        {
            count += helper('a', n - 1);
        }

        const result = count % (10 ** 9 + 7);
        cache.set(cacheKey, result);
        return result;
    }

    return helper(null, n);
};
// @lc code=end