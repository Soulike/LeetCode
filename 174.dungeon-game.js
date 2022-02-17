/*
 * @lc app=leetcode id=174 lang=javascript
 *
 * [174] Dungeon Game
 */

// @lc code=start
/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function (dungeon)
{
    /**
     * dp[i][j] 从 (i,j) 到 (M-1, N-1) 所需要的最小生命值
     * 
     * base case
     * dp[M-1][N-1] = dungeon[M-1][N-1] < 0?1-dungeon[M-1][N-1]:1
     * 
     * dp[i][j] = Math.min(dp[i+1][j], dp[i][j+1]) - dp[i][j]
     */

    const M = dungeon.length;
    const N = dungeon[0].length;

    const dp = new Array(M);
    for (let i = 0; i < dp.length; i++)
    {
        dp[i] = new Array(N);
    }

    for (let i = M - 1; i >= 0; i--)
    {
        for (let j = N - 1; j >= 0; j--)
        {
            if (i === M - 1 && j === N - 1)
            {
                dp[M - 1][N - 1] = Math.max(1, 1 - dungeon[M - 1][N - 1]);
            }
            else if (i === M - 1)
            {
                dp[i][j] = Math.max(dp[i][j + 1] - dungeon[i][j], 1);
            }
            else if (j === N - 1)
            {
                dp[i][j] = Math.max(dp[i + 1][j] - dungeon[i][j], 1);
            }
            else
            {
                dp[i][j] = Math.max(Math.min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j], 1);
            }
        }
    }

    return dp[0][0];
};
// @lc code=end