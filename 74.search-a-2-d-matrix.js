/*
 * @lc app=leetcode id=74 lang=javascript
 *
 * [74] Search a 2D Matrix
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
const searchMatrix = function (matrix, target) 
{
    const row = rowBinarySearch(matrix, target);
    if (row === null)
    {
        return false;
    }
    return binarySearch(row, target);
};

/**
 * @param {number[][]} matrix 
 * @param {number} target 
 * @returns {number[] | null}
 */
function rowBinarySearch(matrix, target)
{
    let startRowIndex = 0;
    let endRowIndex = matrix.length - 1;
    const colCount = matrix[0].length;

    while (startRowIndex <= endRowIndex)
    {
        const midRowIndex = startRowIndex + Math.floor((endRowIndex - startRowIndex) / 2);
        const midRow = matrix[midRowIndex];
        const min = midRow[0];
        const max = midRow[colCount - 1];
        if (min <= target
            && max >= target)
        {
            return midRow;
        }
        else if (min > target)
        {
            endRowIndex = midRowIndex - 1;
        }
        else if (max < target)
        {
            startRowIndex = midRowIndex + 1;
        }
    }

    return null;
}

/**
 * 
 * @param {number[]} array 
 * @param {number} target 
 * @returns {boolean}
 */
function binarySearch(array, target)
{
    let startIndex = 0;
    let endIndex = array.length - 1;

    while (startIndex <= endIndex)
    {
        const midIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
        const midVal = array[midIndex];

        if (midVal === target)
        {
            return true;
        }
        else if (midVal < target)
        {
            startIndex = midIndex + 1;
        }
        else if (midVal > target)
        {
            endIndex = midIndex - 1;
        }
    }

    return false;
}
// @lc code=end