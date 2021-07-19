/*
 * @lc app=leetcode id=200 lang=javascript
 *
 * [200] Number of Islands
 */

// @lc code=start

const WATER = '0';
const LAND = '1';
const VISITED_LAND = '2';

/**
 * @param {string[][]} grid
 * @return {number}
 */
const numIslands = function (grid) 
{
    let islandNum = 0;
    const ROW_LENGTH = grid[0].length;
    const COL_LENGTH = grid.length;
    for (let i = 0; i < COL_LENGTH; i++)
    {
        for (let j = 0; j < ROW_LENGTH; j++)
        {
            if (grid[i][j] === LAND)
            {
                islandNum++;
                visit(grid, i, j);
            }
        }
    }
    return islandNum;
};

/**
 * @param {string[][]} grid
 * @param {number} i
 * @param {number} j
 * @return {void}
 */
function visit(grid, i, j)
{
    grid[i][j] = VISITED_LAND;
    if (i - 1 >= 0 && grid[i - 1][j] === LAND)
    {
        visit(grid, i - 1, j);
    }
    if (j - 1 >= 0 && grid[i][j - 1] === LAND)
    {
        visit(grid, i, j - 1);
    }
    if (i + 1 < grid.length && grid[i + 1][j] === LAND)
    {
        visit(grid, i + 1, j);
    }
    if (j + 1 < grid[0].length && grid[i][j + 1] === LAND)
    {
        visit(grid, i, j + 1);
    }
}
// @lc code=end