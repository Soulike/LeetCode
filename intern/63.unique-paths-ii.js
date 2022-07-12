/*
 * @lc app=leetcode id=63 lang=javascript
 *
 * [63] Unique Paths II
 */

// @lc code=start
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
const uniquePathsWithObstacles = function (obstacleGrid) {
    const m = obstacleGrid.length;
    if (m < 1) {
        return 0;
    }
    // m >= 1
    const n = obstacleGrid[0].length;
    // 构造计算用二维数组
    /**@type {number[][]} */
    const tempArray = new Array(m);
    for (let i = 0; i < m; i++) {
        tempArray[i] = new Array(n);
    }

    // 计算路径
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (obstacleGrid[i][j] === 1) {
                tempArray[i][j] = 0;
            } else if (i === 0 || j === 0) {
                // obstacleGrid[i][j] === 0
                if (i === 0 && j === 0) {
                    tempArray[i][j] = 1;
                } else if (i === 0 && j !== 0) {
                    tempArray[i][j] = 0 + tempArray[i][j - 1];
                } // i !== 0 && j === 0
                else {
                    tempArray[i][j] = tempArray[i - 1][j] + 0;
                }
            } // obstacleGrid[i][j] === 0 && i !== 0 && j !== 0
            else {
                tempArray[i][j] = tempArray[i - 1][j] + tempArray[i][j - 1];
            }
        }
    }
    return tempArray[m - 1][n - 1];
};
// @lc code=end
