/*
 * @lc app=leetcode id=1463 lang=javascript
 *
 * [1463] Cherry Pickup II
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var cherryPickup = function (grid) {
    /**
     * dp[i][j][k] the most picked cherries when
     *  robot a moved to grid[i][j]
     *  robot b moved to grid[i][k]
     *
     * base case
     *  dp[0][0][N-1] = grid[0][0] + grid[0][N-1]
     *
     * dp[i][j][k] = Math.max(
     *  dp[i-1][j][k],
     *  dp[i-1][j-1][k],
     *  dp[i-1][j+1][k],
     *  dp[i-1][j][k-1],
     *  dp[i-1][j-1][k-1],
     *  dp[i-1][j+1][k-1],
     *  dp[i-1][j][k+1],
     *  dp[i-1][j-1][k+1],
     *  dp[i-1][j+1][k+1],
     * ) + j === k ? grid[i][j] : grid[i][j] + grid[i][k];
     */

    const M = grid.length;
    const N = grid[0].length;
    const dp = new Array(2);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(N);
        for (let j = 0; j < N; j++) {
            dp[i][j] = new Array(N);
            dp[i][j].fill(-1); // -1 means impossible to reach
        }
    }

    dp[0][0][N - 1] = grid[0][0] + grid[0][N - 1];
    let maxPicks = 0;

    for (let i = 1; i < M; i++) {
        const prevRow = (i - 1) % 2;
        const currRow = i % 2;
        for (let j = 0; j < N; j++) {
            for (let k = 0; k < N; k++) {
                const prevMax = Math.max(
                    j - 1 >= 0 && k - 1 >= 0 ? dp[prevRow][j - 1][k - 1] : -1,
                    j - 1 >= 0 ? dp[prevRow][j - 1][k] : -1,
                    j - 1 >= 0 && k + 1 < N ? dp[prevRow][j - 1][k + 1] : -1,
                    k - 1 >= 0 ? dp[prevRow][j][k - 1] : -1,
                    dp[prevRow][j][k],
                    k + 1 < N ? dp[prevRow][j][k + 1] : -1,
                    j + 1 < N && k - 1 >= 0 ? dp[prevRow][j + 1][k - 1] : -1,
                    j + 1 < N ? dp[prevRow][j + 1][k] : -1,
                    j + 1 < N && k + 1 < N ? dp[prevRow][j + 1][k + 1] : -1,
                );
                if (prevMax !== -1)
                    dp[currRow][j][k] =
                        prevMax +
                        (j === k ? grid[i][j] : grid[i][j] + grid[i][k]);
                maxPicks = Math.max(dp[currRow][j][k], maxPicks);
            }
        }
    }

    return maxPicks;
};
// @lc code=end

cherryPickup([
    [0, 8, 7, 10, 9, 10, 0, 9, 6],
    [8, 7, 10, 8, 7, 4, 9, 6, 10],
    [8, 1, 1, 5, 1, 5, 5, 1, 2],
    [9, 4, 10, 8, 8, 1, 9, 5, 0],
    [4, 3, 6, 10, 9, 2, 4, 8, 10],
    [7, 3, 2, 8, 3, 3, 5, 9, 8],
    [1, 2, 6, 5, 6, 2, 0, 10, 0],
]);
