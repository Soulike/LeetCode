/*
 * @lc app=leetcode id=51 lang=javascript
 *
 * [51] N-Queens
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n)
{
    const board = new Array(n);
    for (let i = 0; i < n; i++)
    {
        board[i] = new Array(n);
        board[i].fill('.');
    }
    const results = [];

    function isValidPosition(row, col)
    {
        for (let i = 0; i < row; i++)
        {
            if (board[i][col] === 'Q')
            {
                return false;
            }
        }

        for (let d = 1; row - d >= 0 && col - d >= 0; d++)
        {
            if (board[row - d][col - d] === 'Q')
            {
                return false;
            }
        }

        for (let d = 1; row - d >=0 && col + d < n; d++)
        {
            if (board[row - d][col + d] === 'Q')
            {
                return false;
            }
        }

        return true;
    }

    /**
     * @param {number} queueCount 这次递归要放第几个皇后，从 0 开始
     */
    function helper(queueCount, startRow)
    {
        if (queueCount === n)
        {
            results.push(board.map(row => row.join('')));
        }
        else
        {
            for (let i = startRow; i < n; i++)
            {
                for (let j = 0; j < n; j++)
                {
                    if (isValidPosition(i, j))
                    {
                        board[i][j] = 'Q';
                        helper(queueCount + 1, i + 1);
                        board[i][j] = '.';
                    }
                }
            }
        }
    }

    helper(0, 0);

    return results;
};
// @lc code=end

console.log(solveNQueens(9));