/*
 * @lc app=leetcode id=1510 lang=javascript
 *
 * [1510] Stone Game IV
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
var winnerSquareGame = function (n)
{
    const cache = new Map();
    // 如果拿到 n 个石子，最佳情况下能不能赢
    function helper(n)
    {
        if (cache.has(n))
        {
            return cache.get(n);
        }
        if (n === 0)
        {
            return false;
        }
        for (let i = 1; i <= Math.sqrt(n); i++)
        {
            if (!helper(n - i ** 2))    // 有一种拿法对方输了
            {
                cache.set(n, true);
                return true;
            }
        }
        cache.set(n, false);
        return false;
    }

    return helper(n);
};
// @lc code=end