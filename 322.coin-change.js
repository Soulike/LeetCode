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
    const cache = new Map();
    return helper(coins, 0, amount, cache);
};

/**
 * @param {number[]} coins
 * @param {number} startCoinIndex
 * @param {number} amount
 * @param {Map<number, Map<number, number>>} cache
 * @return {number}
 */
function helper(coins, startCoinIndex, amount, cache)
{
    let amountToResult = cache.get(startCoinIndex);
    if (amountToResult === undefined)
    {
        amountToResult = new Map();
        cache.set(startCoinIndex, amountToResult);
    }
    else
    {
        const cachedResult = amountToResult.get(amount);
        if (cachedResult !== undefined)
        {
            return cachedResult;
        }
    }

    if (startCoinIndex === coins.length - 1)
    {
        let result = 0;
        let currentCoin = coins[startCoinIndex];
        if (Number.isInteger(amount / currentCoin))
        {
            result = Math.floor(amount / currentCoin);
        }
        else
        {
            result = -1;
        }
        amountToResult.set(amount, result);
        return result;
    }
    let currentCoin = coins[startCoinIndex];
    let minCoinAmount = Number.MAX_SAFE_INTEGER;
    for (let i = 0; ; i++)
    {
        if (currentCoin * i > amount)
        {
            break;
        }
        const leftCoinAmount = helper(coins, startCoinIndex + 1, amount - currentCoin * i, cache);
        if (leftCoinAmount !== -1 && leftCoinAmount + i < minCoinAmount)
        {
            minCoinAmount = leftCoinAmount + i;
        }
    }
    const result = minCoinAmount === Number.MAX_SAFE_INTEGER ? -1 : minCoinAmount;
    amountToResult.set(amount, result);
    return result;
}
// @lc code=end

// console.log(coinChange([1, 2, 5], 11));

// console.log(coinChange([186, 419, 83, 408], 6249)); // 20

// console.log(coinChange([2], 3));

// console.log(coinChange([411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422], 9864)); // 24

// console.log(coinChange([288, 160, 10, 249, 40, 77, 314, 429], 9208));   // 22