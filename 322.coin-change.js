/*
 * @lc app=leetcode id=322 lang=javascript
 *
 * [322] Coin Change
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
const coinChange = function (coins, amount) 
{
    const minCoin = Math.min(...coins);
    const cache = new Map();

    function helper(amountLeft)
    {
        const cached = cache.get(amountLeft);
        if (cached !== undefined)
        {
            return cached;
        }

        if (amountLeft === 0)
        {
            return 0;
        }
        if (amountLeft < minCoin)
        {
            return -1;
        }
        let minCoinCount = Number.POSITIVE_INFINITY;

        for (const coin of coins)
        {
            const result = helper(amountLeft - coin);
            if (result !== -1)
            {
                minCoinCount = Math.min(minCoinCount, 1 + result);
            }
        }

        if (minCoinCount === Number.POSITIVE_INFINITY)
        {
            minCoinCount = -1;
        }
        cache.set(amountLeft, minCoinCount);
        return minCoinCount;
    }

    return helper(amount);
};
// @lc code=end