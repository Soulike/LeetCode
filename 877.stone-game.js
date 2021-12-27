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
     * dp[i][j] 从 piles[i] ~ piles[j] 范围内，一方可以比另外一方拿石头多的数量
     */
    const dp = new Array(piles.length);
    for (let i = 0; i < dp.length; i++)
    {
        dp[i] = [];
        dp[i][i] = piles[i];
    }

    /**
     * 如果拿 piles[i]，剩下的是对手拿，那么 dp[i][j] = piles[i] - dp[i+1][j]
     * 也就是说，通过拿 piles[i]，对手在剩下部分会比我多拿 dp[i+1][j] 个石头，减去就是通过拿 piles[i] 在 i~j 范围内可以比对手多拿的石头
     * 如果拿 piles[j] 同理, dp[i][j] = piles[j] - dp[i][j-1]，取最大值即可
     */

    // 先计算差距近的，因为差距为 0 的已经初始化过了
    for (let d = 1; d < piles.length; d++)
    {
        for (let i = 0; i < piles.length - d; i++)
        {
            dp[i][i + d] = Math.max(
                piles[i] - (dp[i + 1][i + d]),
                piles[i + d] - dp[i][i + d - 1]);
        }
    }
    return dp[0][piles.length - 1] > 0;
};
// @lc code=end

