/*
 * @lc app=leetcode id=931 lang=javascript
 *
 * [931] Minimum Falling Path Sum
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function (matrix)
{
    /*
     // dp[i][j] 以 i,j 为终点，能够得到的最小下降路径

      base case
      dp[0][j] = matrix[0][j]

      dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j], dp[i-1][j+1]) + matrix[i][j]

      ret = Math.min(dp[matrix.length-1][j])
     */
    
    const dp = new Array(matrix.length);
    for (let i = 0; i < matrix.length; i++)
    {
        dp[i] = new Array(matrix[0].length);
        dp[i].fill(0);
    }

    

    for (let j = 0; j < matrix[0].length; j++)
    {
        dp[0][j] = matrix[0][j];
    }

    for (let i = 1; i < matrix.length; i++)
    {
        for (let j = 0; j < matrix[0].length; j++)
        {
            if (j > 0 && j < matrix[0].length - 1)
            {
                dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i - 1][j + 1]) + matrix[i][j];
            }
            else if (j === 0)
            {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j + 1]) + matrix[i][j];
            }
            else
            {
                dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j]) + matrix[i][j];
            }
        }
    }

    return Math.min(...dp[matrix.length - 1]);
};
// @lc code=end

