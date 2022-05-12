/*
 * @lc app=leetcode id=50 lang=javascript
 *
 * [50] Pow(x, n)
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n)
{
    let sign = 1;
    if (x === 0)
    {
        return 0;
    }
    else if (x < 0)
    {
        if (n % 2 === 1)
        {
            sign = -1;
        }
        x = -x;
    }

    if (n > 0)
    {
        return sign * positivePow(x, n);
    }
    else if (n < 0)
    {
        return sign * positivePow(1 / x, -n);
    }
    else
    {
        return sign * 1;
    }
};

/**
 * 
 * @param {number} x - 大于 0
 * @param {number} n - 大于 0
 */
function positivePow(x, n)
{
    if (x === 1)
    {
        return 1;
    }

    let result = 1;
    while (n > 0 && result !== 0)
    {
        result *= x;
        n--;
    }
    return result;
}
// @lc code=end