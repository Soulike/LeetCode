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
var minFallingPathSum = function (matrix) {
    /*
     // dp[i][j] 以 i,j 为终点，能够得到的最小下降路径

      base case
      dp[0][j] = matrix[0][j]

      dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j], dp[i-1][j+1]) + matrix[i][j]

      ret = Math.min(dp[matrix.length-1][j])

      可以优化到只有最后一列

      dp = matrix[0][j]

      newDp = Math.min(dp[j-1], dp[j], dp[j+1]) + matrix[i][j]
     */

    let dp = new Array(matrix[0].length);

    for (let j = 0; j < matrix[0].length; j++) {
        dp[j] = matrix[0][j];
    }

    for (let i = 1; i < matrix.length; i++) {
        const newDp = new Array(matrix[0].length);
        for (let j = 0; j < matrix[0].length; j++) {
            if (j > 0 && j < matrix[0].length - 1) {
                newDp[j] = Math.min(dp[j - 1], dp[j], dp[j + 1]) + matrix[i][j];
            } else if (j === 0) {
                newDp[j] = Math.min(dp[j], dp[j + 1]) + matrix[i][j];
            } else {
                newDp[j] = Math.min(dp[j - 1], dp[j]) + matrix[i][j];
            }
        }
        dp = newDp;
    }

    return Math.min(...dp);
};
// @lc code=end
