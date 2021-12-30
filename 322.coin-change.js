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
    /**
     * dp[a] = i 到数额 a，至少需要 i 个硬币
     * dp[a] = min(dp[a-...coin] + 1)
     * 
     * base case dp[coin] = 1
     * dp[0] = 0;
     */
    const dp = new Array(amount + 1);
    dp.fill(Number.POSITIVE_INFINITY);
    for (const coin of coins)
    {
        dp[coin] = 1;
    }
    dp[0] = 0;

    for (let a = 1; a <= amount; a++)
    {
        if (dp[a] === 1)
        {
            continue;
        }
        for (let j = 0; j < coins.length; j++)
        {
            const leftAmount = a - coins[j];
            if (leftAmount >= 0)
            {
                dp[a] = Math.min(dp[a], dp[leftAmount] + 1);
            }
        }
    }

    return dp[amount] === Number.POSITIVE_INFINITY ? -1 : dp[amount];
};
// @lc code=end

console.log(coinChange([1,2,5], 11))