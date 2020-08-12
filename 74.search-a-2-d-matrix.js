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
    const m = matrix.length;
    if (m < 1)
    {
        return false;
    }
    const n = matrix[0].length;
    if (n < 1)
    {
        return false;
    }
    return arrayBinarySearch(matrix, 0, m - 1, target);
};

/**
 * @param {number[]} array
 * @param {number} left
 * @param {number} right
 * @param {number} target
 * @return {boolean}
 */
function binarySearch(array, left, right, target)
{
    if (left > right || left === right && array[left] !== target)
    {
        return false;
    }
    const mid = Math.floor((left + right) / 2);
    const midValue = array[mid];
    if (target === midValue)
    {
        return true;
    }
    else if (target > midValue)
    {
        return binarySearch(array, mid + 1, right, target);
    }
    else    // target < midValue
    {
        return binarySearch(array, left, mid - 1, target);
    }
}

/**
 * @param {number[][]} array
 * @param {number} left
 * @param {number} right
 * @param {number} target
 * @return {boolean}
 */
function arrayBinarySearch(array, left, right, target)
{
    if (left > right)
    {
        return false;
    }
    const n = array[left].length;
    if(left === right)
    {
        if (target < array[left][0] || target > array[left][n-1])
        {
            return false;
        }
        else
        {
            return binarySearch(array[left], 0, n - 1, target);
        }
    }
    else    // left < right
    {
        const mid = Math.floor((left + right) / 2);
        const midMinValue = array[mid][0];
        const midMaxValue = array[mid][n - 1];
        if (target < midMinValue)
        {
            return arrayBinarySearch(array, left, mid - 1, target);
        }
        else if (target > midMaxValue)
        {
            return arrayBinarySearch(array, mid + 1, right, target);
        }
        else
        {
            return binarySearch(array[mid], 0, n - 1, target);   
        }
    }
}
// @lc code=end