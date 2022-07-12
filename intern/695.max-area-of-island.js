/*
 * @lc app=leetcode id=695 lang=javascript
 *
 * [695] Max Area of Island
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
    const ROW_COUNT = grid.length;
    const COL_COUNT = grid[0].length;
    const LAND = 1;
    const WATER = 0;
    const VISITED_LAND = -1;

    let maxIslandArea = 0;

    for (let i = 0; i < ROW_COUNT; i++) {
        for (let j = 0; j < COL_COUNT; j++) {
            if (grid[i][j] === LAND) {
                maxIslandArea = Math.max(maxIslandArea, visit(i, j));
            }
        }
    }

    return maxIslandArea;

    function visit(i, j) {
        if (
            i < 0 ||
            i === ROW_COUNT ||
            j < 0 ||
            j === COL_COUNT ||
            grid[i][j] !== LAND
        ) {
            return 0;
        }
        let islandArea = 1;
        grid[i][j] = VISITED_LAND;
        islandArea +=
            visit(i - 1, j) +
            visit(i + 1, j) +
            visit(i, j - 1) +
            visit(i, j + 1);
        return islandArea;
    }
};
// @lc code=end
