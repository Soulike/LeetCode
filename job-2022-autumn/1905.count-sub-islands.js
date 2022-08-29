/*
 * @lc app=leetcode id=1905 lang=javascript
 *
 * [1905] Count Sub Islands
 */

// @lc code=start
/**
 * @param {number[][]} grid1
 * @param {number[][]} grid2
 * @return {number}
 */
var countSubIslands = function (grid1, grid2) {
    const m = grid1.length;
    const n = grid1[0].length;
    const WATER = 0;
    const LAND = 1;

    /**
     * @param {number} i
     * @param {number} j
     */
    const floodGrid2 = (i, j) => {
        if (i < 0 || i >= m || j < 0 || j >= n || grid2[i][j] === WATER) {
            return;
        }

        grid2[i][j] = WATER;
        floodGrid2(i + 1, j);
        floodGrid2(i - 1, j);
        floodGrid2(i, j + 1);
        floodGrid2(i, j - 1);
    };

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid1[i][j] === WATER) {
                floodGrid2(i, j);
            }
        }
    }

    let subIslandCount = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid2[i][j] === LAND) {
                subIslandCount++;
                floodGrid2(i, j);
            }
        }
    }

    return subIslandCount;
};
// @lc code=end
