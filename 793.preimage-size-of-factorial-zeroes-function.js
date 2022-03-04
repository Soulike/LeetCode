/*
 * @lc app=leetcode id=793 lang=javascript
 *
 * [793] Preimage Size of Factorial Zeroes Function
 */

// @lc code=start
/**
 * @param {number} k
 * @return {number}
 */
var preimageSizeFZF = function (k)
{
    let left = 0;
    let right = Number.MAX_SAFE_INTEGER;

    while (left < right)
    {
        const mid = left + Math.floor((right - left) / 2);
        const midVal = trailingZeroes(mid);

        if (midVal === k)
        {
            return 5;
        }
        else if (midVal > k)
        {
            right = mid - 1;
        }
        else
        {
            left = mid + 1;
        }
    }

    return 0;
    
};


const cache = new Map();
/**
 * @param {number} n
 * @return {number}
 */
function trailingZeroes(n)
{
    if (cache.has(n))
    {
        return cache.get(n);
    }
    let count = 0;
    let exp = 1;
    while (true)
    {
        const currentCount = Math.floor(n / 5 ** exp);
        if (currentCount === 0)
        {
            cache.set(n, count);
            return count;
        }
        count += currentCount;
        exp++;
    }
};
// @lc code=end
