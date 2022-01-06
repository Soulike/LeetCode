/*
 * @lc app=leetcode id=1254 lang=javascript
 *
 * [1254] Number of Closed Islands
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var closedIsland = function (grid)
{
    const ROW_COUNT = grid.length;
    const COL_COUNT = grid[0].length;
    const LAND = 0;
    const VISITED_LAND = -1;

    for (let i = 0; i < ROW_COUNT; i++)
    {
        visit(i, 0);
        visit(i, COL_COUNT - 1);
    }

    for (let j = 0; j < COL_COUNT; j++)
    {
        visit(0, j);
        visit(ROW_COUNT - 1, j);
    }

    let closedIslandCount = 0;

    for (let i = 0; i < ROW_COUNT; i++)
    {
        for (let j = 0; j < COL_COUNT; j++)
        {
            if (grid[i][j] === LAND)
            {
                closedIslandCount++;
                visit(i, j);
            }
        }
    }

    return closedIslandCount;

    function visit(i, j)
    {
        if (i < 0 || i === ROW_COUNT
            || j < 0 || j === COL_COUNT
            || grid[i][j] !== LAND)
        {
            return;
        }
        grid[i][j] = VISITED_LAND;
        visit(i - 1, j);
        visit(i + 1, j);
        visit(i, j - 1);
        visit(i, j + 1);
    }
};
// @lc code=end

