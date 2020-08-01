/*
 * @lc app=leetcode id=59 lang=javascript
 *
 * [59] Spiral Matrix II
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[][]}
 */
const generateMatrix = function (n) 
{
    let [top, right, bottom, left] = [0, n - 1, n - 1, 0];
    /**@type {number[][]} */
    const result =new Array(n);
    for (let i = 0; i < n; i++)
    {
        result[i] = new Array(n);
    }
    let currentNum = 1;
    while (true)
    {
        if (left <= right)
        {
            generateTop(result, top, left, right, currentNum);
            ++top;
            currentNum += right - left + 1;
        }
        else
        {
            break;
        }

        if (top <= bottom)
        {
            generateRight(result, right, top, bottom, currentNum);
            --right;
            currentNum += bottom - top + 1;
        }
        else
        {
            break;
        }

        if (left <= right)
        {
            generateBottom(result, bottom, left, right, currentNum);
            --bottom;
            currentNum += right - left + 1;
        }
        else
        {
            break;
        }

        if (top <= bottom)
        {
            generateLeft(result, left, top, bottom, currentNum);
            ++left;
            currentNum += bottom - top + 1;
        }
        else
        {
            break;
        }
    }
    return result;
};

/**
 * @param {number[][]} matrix 
 * @param {number} top 
 * @param {number} left 
 * @param {number} right 
 * @param {number} startNum 
 */
function generateTop(matrix, top, left, right, startNum)
{
    for (let i = left; i <= right; i++)
    {
        matrix[top][i] = startNum++;
    }
}

/**
 * @param {number[][]} matrix 
 * @param {number} right 
 * @param {number} top 
 * @param {number} bottom 
 * @param {number} startNum 
 */
function generateRight(matrix, right, top, bottom, startNum)
{
    for (let i = top; i <= bottom; i++)
    {
        matrix[i][right] = startNum++;
    }
}

/**
 * @param {number[][]} matrix 
 * @param {number} bottom 
 * @param {number} left 
 * @param {number} right 
 * @param {number} startNum 
 */
function generateBottom(matrix, bottom, left, right, startNum)
{
    for (let i = right; i >= left; i--)
    {
        matrix[bottom][i] = startNum++;
    }
}

/**
 * @param {number[][]} matrix 
 * @param {number} left 
 * @param {number} top 
 * @param {number} bottom 
 * @param {number} startNum
 */
function generateLeft(matrix, left, top, bottom, startNum)
{
    for (let i = bottom; i >= top; i--)
    {
        matrix[i][left] = startNum++;
    }
}
// @lc code=end

console.log(generateMatrix(0))