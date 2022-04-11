/*
 * @lc app=leetcode id=1260 lang=javascript
 *
 * [1260] Shift 2D Grid
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var shiftGrid = function (grid, k)
{
    const m = grid.length;
    const n = grid[0].length;
    const size = m * n;
    k %= size;

    if (k === 0)
    {
        return grid;
    }

    const flattenGrid = grid.flat();
    const resultFlattenGrid = [...flattenGrid.slice(-k), ...flattenGrid.slice(0, -k)];

    for (let i = 0; i < size; i++)
    {
        const col = i % n;
        const row = (i - col) / n;

        grid[row][col] = resultFlattenGrid[i];
    }

    return grid;
};


// @lc code=end