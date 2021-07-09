/*
 * @lc app=leetcode id=279 lang=javascript
 *
 * [279] Perfect Squares
 */

// @lc code=start

/**@type {number[]} */
const cache = [];

/**
 * @param {number} n
 * @return {number}
 */
const numSquares = function (n) 
{
    if (cache[n])
    {
        return cache[n];
    }
    if (n < 4)
    {
        return n;
    }
    let min = Number.POSITIVE_INFINITY;
    let square = 0;
    for (let i = 2; ; i++)
    {
        square = i * i;
        if (square === n)
        {
            return 1;
        }
        else if (square < n)
        {
            min = Math.min(1 + numSquares(n - square), min);
        }
        else
        {
            break;
        }
    }
    if (!cache[n])
    {
        cache[n] = min;
    }
    return min;
};
// @lc code=end

