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

    // dp[i] 价值为 i 的钱至少要由多少个硬币组成
    const dp = [];

    /**
     * base case 
     * dp[0] = 0
     * dp[...coins] = 1
     * dp[...other] = Infinity
     * 
     * for(i from 1 to amount)
     * dp[i] = min(dp[i-...coins])+1
     */

    dp[0] = 0;
    for (const coin of coins)
    {
        dp[coin] = 1;
    }

    for (let i = 1; i <= amount; i++)
    {
        for (const coin of coins)
        {
            dp[i] = Math.min(dp[i] ?? Infinity, (dp[i - coin] ?? Infinity)+ 1);
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
};
// @lc code=end