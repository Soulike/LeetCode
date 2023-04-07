/*
 * @lc app=leetcode id=1020 lang=javascript
 *
 * [1020] Number of Enclaves
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var numEnclaves = function (grid) {
    const SEA = 0;
    const LAND = 1;
    const M = grid.length;
    const N = grid[0].length;

    /**
     * @param {number} x
     * @param {number} y
     * @returns {void}
     */
    const flood = (x, y) => {
        if (x < 0 || y < 0 || x >= M || y >= N || grid[x][y] === SEA) return;

        grid[x][y] = SEA;
        flood(x - 1, y);
        flood(x + 1, y);
        flood(x, y - 1);
        flood(x, y + 1);
    };

    for (let i = 0; i < M; i++) {
        flood(i, 0);
        flood(i, N - 1);
    }

    for (let j = 0; j < N; j++) {
        flood(0, j);
        flood(M - 1, j);
    }

    let landNumber = 0;
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (grid[i][j] === LAND) {
                landNumber++;
            }
        }
    }

    return landNumber;
};
// @lc code=end
