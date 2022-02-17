/*
 * @lc app=leetcode id=518 lang=javascript
 *
 * [518] Coin Change 2
 */

// @lc code=start
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins)
{
    /**
     * 背包问题
     * dp[i][j] 使用前 i 个硬币，有多少种组合能构成数量 j 的钱
     * 
     * base case
     * dp[0][j] = 0
     * dp[i][0] = 1 // 背包本身就是满的
     * 
     * 不要第 i 个硬币
     * dp[i][j] = dp[i-1][j]
     * 
     * 要第 i 个硬币
     * dp[i][j] = dp[i][j-coins[i-1]]
     */

    const dp = new Array(coins.length + 1);
    for (let i = 0; i < dp.length; i++)
    {
        dp[i] = new Array(amount + 1);
        if (i === 0)
        {
            dp[i].fill(0);
        }
        dp[i][0] = 1;
    }

    for (let i = 1; i <= coins.length; i++)
    {
        for (let j = 1; j <= amount; j++)
        {
            if (j - coins[i - 1] < 0)
            {
                dp[i][j] = dp[i - 1][j];
            }
            else
            {
                dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]];
            }
        }
    }

    return dp[coins.length][amount];
};
// @lc code=end