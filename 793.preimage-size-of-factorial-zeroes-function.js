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
    // 因为 trailingZeroes() 是单调递增的，所以可以用二分查找
    let left = 0;
    let right = Number.MAX_SAFE_INTEGER;

    while (true)
    {
        if (left > right)
        {
            return 0;
        }

        const mid = left + Math.floor((right - left) / 2);
        const zeroCount = trailingZeroes(mid);

        if (zeroCount === k)
        {
            return 5;
        }
        else if (zeroCount < k)
        {
            left = mid + 1;
        }
        else
        {
            right = mid - 1;
        }
    }
};

/**
 * @param {number} n
 * @return {number}
 */
function trailingZeroes(n)
{
    let result = 0;
    let divisor = 5;
    while (divisor <= n)
    {
        result += Math.floor(n / divisor);
        divisor *= 5;
    }
    return result;
};
// @lc code=end

preimageSizeFZF(10 ** 9);