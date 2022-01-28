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
    coins.sort((a, b) => b - a);

    const cache = new Map();

    function helper(amount)
    {
        if (cache.has(amount))
        {
            return cache.get(amount);
        }
        if (amount === 0)
        {
            return 0;
        }
        if (coins[coins.length - 1] > amount)
        {
            return -1;
        }

        let result = Infinity;
        for (const coin of coins)
        {
            if (amount >= coin)
            {
                const rest = helper(amount - coin);
                if (rest !== -1)
                {
                    result = Math.min(result, rest + 1);
                }
            }
        }
        if (result === Infinity)
        {
            result = -1;
        }
        cache.set(amount, result);
        return result;
    }

    return helper(amount);
};
// @lc code=end

console.log(coinChange([186, 419, 83, 408], 6249));