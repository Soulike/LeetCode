/*
 * @lc app=leetcode id=36 lang=javascript
 *
 * [36] Valid Sudoku
 */

// @lc code=start
/**
 * @param {string[][]} board
 * @return {boolean}
 */
const isValidSudoku = function (board) 
{
    for (let i = 0; i < 9; i++)
    {
        for (let j = 0; j < 9; j++)
        {
            if (i === j)
            {
                if (!validateRow(board, i) || !validateCol(board, j))
                {
                    return false;
                }
            }
            if ((i % 3 === 0 && j%3===0) && !validateSubBox(board, i, j))
            {
                return false;
            }
        }
    }
    return true;
};

/**
 * @param {string[][]} board
 * @param {number} x 
 * @return {boolean}
 */
function validateRow(board, x)
{
    /**@type {Set<string>} */
    const nums = new Set();
    let char = '';
    for (let i = 0; i < 9; i++)
    {
        char = board[x][i];
        if (char === '.')
        {
            continue;
        }
        if (nums.has(char))
        {
            return false;
        }
        else
        {
            nums.add(char);
        }
    }
    return true;
}

/**
 * @param {string[][]} board
 * @param {number} y
 * @return {boolean}
 */
function validateCol(board, y)
{
    /**@type {Set<string>} */
    const nums = new Set();
    let char = '';
    for (let i = 0; i < 9; i++)
    {
        char = board[i][y];
        if (char === '.')
        {
            continue;
        }
        if (nums.has(char))
        {
            return false;
        }
        else
        {
            nums.add(char);
        }
    }
    return true;
}

/**
 * @param {string[][]} board
 * @param {number} x
 * @param {number} y
 */
function validateSubBox(board, x, y)
{
    /**@type {Set<string>} */
    const nums = new Set();
    let char = '';
    for (let i = 0; i < 3; i++)
    {
        for (let j = 0; j < 3; j++)
        {
            char = board[x+i][y+j];
            if (char === '.')
            {
                continue;
            }
            if (nums.has(char))
            {
                return false;
            }
            else
            {
                nums.add(char);
            }
        }
    }
    return true;
}
// @lc code=end

