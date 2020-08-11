/*
 * @lc app=leetcode id=64 lang=javascript
 *
 * [64] Minimum Path Sum
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
const minPathSum = function (grid) 
{
    const m = grid.length;
    if (m < 1)
    {
        return 0;
    }
    // m > 0
    const n = grid[0].length;
    if (n < 1)
    {
        return 0;
    }
    /**@type {number[][]} */
    const tempArray = new Array(m);
    for (let i = 0; i < m; i++)
    {
        tempArray[i] = new Array(n);
    }
    for (let i = 0; i < m; i++)
    {
        for (let j = 0; j < n; j++)
        {
            if (i !== 0 && j !== 0)
            {
                tempArray[i][j] = Math.min(tempArray[i - 1][j], tempArray[i][j - 1]) + grid[i][j];
            }
            else if (i === 0 && j !== 0)
            {
                tempArray[i][j] = tempArray[i][j - 1] + grid[i][j];
            }
            else if (i !== 0 && j === 0)
            {
                tempArray[i][j] = tempArray[i-1][j] + grid[i][j];
            }
            else    // i === 0 && j === 0
            {
                tempArray[i][j] = grid[i][j];
            }
        }
    }
    return tempArray[m - 1][n - 1];
};
// @lc code=end