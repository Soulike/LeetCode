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
    let emptyGridCount = 1;

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
    const m = grid.length;
    const n = grid[0].length;
    grid[i][j] = -1;
    let pathCount = 0;

    if (i > 0)
    {
        if (grid[i - 1][j] === 2)
        {
            if ((i === m - 1 || grid[i + 1][j] === -1)
                && (j === 0 || grid[i][j - 1] === -1)
                && (j === n - 1 || grid[i][j + 1] === -1))
            {
                if (walkedGridCount + 1 === emptyGridCount)
                {
                    pathCount += 1;
                }
            }
        }
        else if (grid[i - 1][j] === 0)
        {
            pathCount += helper(grid, i - 1, j, walkedGridCount + 1, emptyGridCount);
        }
    }
    if (i < m - 1)
    {
        if (grid[i + 1][j] === 2)
        {
            if ((i === 0 || grid[i - 1][j] === -1)
                && (j === 0 || grid[i][j - 1] === -1)
                && (j === n - 1 || grid[i][j + 1] === -1))
            {
                if (walkedGridCount + 1 === emptyGridCount)
                {
                    pathCount += 1;
                }
            }
        }
        else if (grid[i + 1][j] === 0)
        {
            pathCount += helper(grid, i + 1, j, walkedGridCount + 1, emptyGridCount);
        }
    }

    if (j > 0)
    {
        if (grid[i][j - 1] === 2)
        {
            if ((j === n - 1 || grid[i][j + 1] === -1)
                && (i === 0 || grid[i - 1][j] === -1)
                && (i === m - 1 || grid[i + 1][j] === -1))
            {
                if (walkedGridCount + 1 === emptyGridCount)
                {
                    pathCount += 1;
                }
            }
        }
        else if (grid[i][j - 1] === 0)
        {
            pathCount += helper(grid, i, j - 1, walkedGridCount + 1, emptyGridCount);
        }
    }
    if (j < n - 1)
    {
        if (grid[i][j + 1] === 2)
        {
            if ((j === 0 || grid[i][j - 1] === -1)
                && (i === 0 || grid[i - 1][j] === -1)
                && (i === m - 1 || grid[i + 1][j] === -1))
            {
                if (walkedGridCount + 1 === emptyGridCount)
                {
                    pathCount += 1;
                }
            }
        }
        else if (grid[i][j + 1] === 0)
        {
            pathCount += helper(grid, i, j + 1, walkedGridCount + 1, emptyGridCount);
        }
    }

    grid[i][j] = 0;
    return pathCount;
}
// @lc code=end