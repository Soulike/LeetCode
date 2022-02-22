/*
 * @lc app=leetcode id=1312 lang=javascript
 *
 * [1312] Minimum Insertion Steps to Make a String Palindrome
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var minInsertions = function (s)
{
    const cache = new Map();
    function helper(left, right)
    {
        const cacheKey = `${left}-${right}`;
        if (cache.has(cacheKey))
        {
            return cache.get(cacheKey);
        }
        const length = right - left + 1;
        if (length < 2)
        {
            return 0;
        }
        while (left < right
            && s.charAt(left) === s.charAt(right))
        {
            left++;
            right--;
        }

        if (left >= right)
        {
            cache.set(cacheKey, 0);
            return 0;
        }

        const result = 1 + Math.min(
            helper(left + 1, right), // 把左边的字符插入到 right+1
            helper(left, right - 1), // 把右边的字符插入到 left-1
        );
        cache.set(cacheKey, result);
        return result;
    }

    const result = helper(0, s.length - 1);
    return result;
};
// @lc code=end