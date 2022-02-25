/*
 * @lc app=leetcode id=877 lang=javascript
 *
 * [877] Stone Game
 */

// @lc code=start
/**
 * @param {number[]} piles
 * @return {boolean}
 */
const stoneGame = function (piles)
{
    /**
     * dp[i][j] 当面对 [i,j] 的石头堆时，先手拿可以比对手多拿多少石头
     * 
     * base case 
     * dp[i][i] = piles[i]
     * 
     * dp[i][j] = Math.max(
     *  piles[i] - dp[i+1][j],
     *  piles[j] - dp[i][j-1]
     * )
     */

    const n = piles.length;
    const dp = new Array(n);
    for (let i = 0; i < n; i++)
    {
        dp[i] = new Array(n);
        dp[i][i] = piles[i];
    }

    for (let i = n - 2; i >= 0; i--)
    {
        for (let j = i + 1; j < n; j++)
        {
            dp[i][j] = Math.max(
                piles[i] - dp[i + 1][j],
                piles[j] - dp[i][j - 1]
            );
        }
    }

    return dp[0][n - 1] > 0;
};
// @lc code=end