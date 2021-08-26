/*
 * @lc app=leetcode id=240 lang=javascript
 *
 * [240] Search a 2D Matrix II
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
const searchMatrix = function (matrix, target) 
{
    return helper(matrix, 0, 0, matrix.length - 1, matrix[0].length - 1, target);
};

/**
 * @param {number[][]} matrix
 * @param {number} minRow
 * @param {number} minCol
 * @param {number} maxRow
 * @param {number} maxCol
 * @param {number} target
 * @return {boolean}
 */
function helper(matrix, minRow, minCol, maxRow, maxCol, target)
{
    if (minRow === maxRow && minCol === maxCol)
    {
        return matrix[minRow][minCol] === target;
    }
    const midRow = Math.floor((minRow + maxRow) / 2);
    const midCol = Math.floor((minCol + maxCol) / 2);
    const midValue = matrix[midRow][midCol];
    if (midValue === target)
    {
        return true;
    }
    else if (midValue > target)
    {
        let found = false;
        if (midRow - 1 >= minRow)
        {
            found = found || helper(matrix, minRow, minCol, midRow - 1, maxCol, target);
        }
        if (found)
        {
            return true;
        }
        if (midCol - 1 >= minCol)
        {
            found = found || helper(matrix, midRow, minCol, maxRow, midCol - 1, target);
        }
        return found;
    }
    else    // midValue < target
    {
        let found = false;
        if (midRow + 1 <= maxRow)
        {
            found = found || helper(matrix, midRow + 1, minCol, maxRow, maxCol, target);
        }
        if (found)
        {
            return true;
        }
        if (midCol + 1 <= maxCol)
        {
            found = found || helper(matrix, minRow, midCol + 1, midRow, maxCol, target);
        }
        return found;
    }
}
// @lc code=end

console.log(searchMatrix([
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]],27));