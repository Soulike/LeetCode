/*
 * @lc app=leetcode id=980 lang=javascript
 *
 * [980] Unique Paths III
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
const uniquePathsIII = function (grid)
{
    const m = grid.length;
    const n = grid[0].length;
    let i = 0;
    let j = 0;
    let emptyGridCount = 1; // including start grid

    for (let k = 0; k < m; k++)
    {
        for (let l = 0; l < n; l++)
        {
            if (grid[k][l] === 0)
            {
                emptyGridCount++;
            }
            else if (grid[k][l] === 1)
            {
                i = k;
                j = l;
            }
        }
    }
    return helper(grid, i, j, 0, emptyGridCount);
};

/**
 * 从 `(i,j)` 出发，有多少种到达终点的方式
 * @param {number[][]} grid 
 * @param {number} i 出发点横坐标
 * @param {number} j 出发点纵坐标
 * @param {number} walkedGridCount 已经路过的位置数量
 * @param {number} emptyGridCount 应该被路过的位置数量
 * @returns {number}
 */
function helper(grid, i, j, walkedGridCount, emptyGridCount)
{
    if (grid[i][j] === 2)
    {
        return walkedGridCount === emptyGridCount ? 1 : 0;
    }

    const m = grid.length;
    const n = grid[0].length;
    grid[i][j] = -1;    // 已经路过，设置为障碍物
    walkedGridCount++;
    let pathCount = 0;

    if (i > 0 && grid[i - 1][j] !== -1)
    {
        pathCount += helper(grid, i - 1, j, walkedGridCount, emptyGridCount);
    }
    if (i < m - 1 && grid[i + 1][j] !== -1)
    {
        pathCount += helper(grid, i + 1, j, walkedGridCount, emptyGridCount);
    }

    if (j > 0 && grid[i][j - 1] !== -1)
    {
        pathCount += helper(grid, i, j - 1, walkedGridCount, emptyGridCount);
    }
    if (j < n - 1 && grid[i][j + 1] !== -1)
    {
        pathCount += helper(grid, i, j + 1, walkedGridCount, emptyGridCount);
    }

    grid[i][j] = 0; // 路过完成，恢复
    return pathCount;
}
// @lc code=end