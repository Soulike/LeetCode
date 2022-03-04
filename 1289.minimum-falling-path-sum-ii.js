/*
 * @lc app=leetcode id=1289 lang=javascript
 *
 * [1289] Minimum Falling Path Sum II
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minFallingPathSum = function (grid)
{
    /**
     * m = grid.length
     * n = grid[0].length
     * 
     * dp[i][j] 到第 i 层时，从 j 开始下降，最小下降成本是多少？
     * 
     * base case
     * 
     * dp[m-1][j] = grid[m-1][j]
     * 
     * dp[i][j] = grid[i][j] + min(dp[i+1][k]) k!==j
     * 
     * 内存压缩 
     * dp = dp[i]
     * prevDp = dp[i+1]
     * 
     * base case
     * 
     * prevDp[j] = grid[m-1][j]
     * 
     * dp[j] = grid[i][j] + min(prevDp[k]) k!==j
     */

    const m = grid.length;
    const n = grid[0].length;

    let prevDp = grid[m - 1];
    let dp = new Array(m);

    for (let i = m - 2; i >= 0; i--)
    {
        for (let j = 0; j < n; j++)
        {
            let minRestSum = Infinity;
            for (let k = 0; k < n; k++)
            {
                if (k !== j)
                {
                    minRestSum = Math.min(minRestSum, prevDp[k]);
                }
                dp[j] = grid[i][j] + minRestSum;
            }
        }
        prevDp = dp;
        dp = new Array(m);
    }

    return Math.min(...prevDp);
};
// @lc code=end