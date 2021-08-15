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
    const dp = new Array(amount + 1);
    dp.fill(amount + 1);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++)
    {
        for (let j = 0; j < coins.length; j++)
        {
            if (coins[j] <= i)
            {
                dp[i] = Math.min(dp[i], 1 + dp[i - coins[j]]);
            }
        }
    }
    return dp[amount] === amount + 1 ? -1 : dp[amount];
};
// @lc code=end

// console.log(coinChange([1, 2, 5], 11));

// console.log(coinChange([186, 419, 83, 408], 6249)); // 20

// console.log(coinChange([2], 3));

// console.log(coinChange([411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422], 9864)); // 24

// console.log(coinChange([288, 160, 10, 249, 40, 77, 314, 429], 9208));   // 22