/*
 * @lc app=leetcode id=221 lang=javascript
 *
 * [221] Maximal Square
 */

// @lc code=start
/**
 * @param {string[][]} matrix
 * @return {number}
 */
const maximalSquare = function (matrix) 
{
    const M = matrix.length;
    const N = matrix[0].length;

    const dp = new Array(M);
    for (let i = 0; i < M; i++)
    {
        dp[i] = new Array(N);
    }

    let max = 0;

    for (let i = 0; i < M; i++)
    {
        for (let j = 0; j < N; j++)
        {
            if (i === 0 || j === 0)
            {
                dp[i][j] = Number.parseInt(matrix[i][j]);

                max = Math.max(max, dp[i][j]);
            }
            else if (matrix[i][j] === "0")
            {
                dp[i][j] = 0;
                max = Math.max(max, dp[i][j]);
            }
            else
            {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
                max = Math.max(max, dp[i][j]);
            }
        }
    }
    return max ** 2;
};
// @lc code=end