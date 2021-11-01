/*
 * @lc app=leetcode id=130 lang=javascript
 *
 * [130] Surrounded Regions
 */

// @lc code=start
/**
 * @param {('X'|'O')[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
const solve = function (board)
{
    const m = board.length;
    const n = board[0].length;
    /** @type {boolean[][]} */
    const canReachBorder = new Array(m);
    for (let i = 0; i < m; i++)
    {
        canReachBorder[i] = new Array(n);
        canReachBorder[i].fill(false);
    }
    for (let i = 0; i < m; i++)
    {
        if (board[i][0] === 'O')
        {
            canReachBorder[i][0] = true;
        }
        if (board[i][n - 1] === 'O')
        {
            canReachBorder[i][n - 1] = true;
        }
    }
    for (let i = 1; i < n - 1; i++)
    {
        if (board[0][i] === 'O')
        {
            canReachBorder[0][i] = true;
        }
        if (board[m - 1][i] === 'O')
        {
            canReachBorder[m - 1][i] = true;
        }
    }
    let changed = true;
    while (changed)
    {
        changed = false;
        for (let i = 1; i < m - 1; i++)
        {
            for (let j = 1; j < n - 1; j++)
            {
                if (!canReachBorder[i][j])
                {
                    canReachBorder[i][j] = board[i][j] === 'O' && (canReachBorder[i - 1][j]
                        || canReachBorder[i + 1][j]
                        || canReachBorder[i][j - 1]
                        || canReachBorder[i][j + 1]);

                    if (canReachBorder[i][j])
                    {
                        changed = true;
                    }
                }
            }
        }
    }

    for (let i = 0; i < m; i++)
    {
        for (let j = 0; j < n; j++)
        {
            if (canReachBorder[i][j])
            {
                board[i][j] = 'O';
            }
            else
            {
                board[i][j] = 'X';
            }
        }
    }
};
// @lc code=end