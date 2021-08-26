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
    const ROW_LENGTH = matrix[0].length;

    for (const row of matrix)
    {
        if (row[0] === target || row[ROW_LENGTH - 1] === target)
        {
            return true;
        }
        else if (row[0] < target && row[ROW_LENGTH - 1] > target)
        {
            if (binarySearch(row, target))
            {
                return true;
            }
        }
    }
    return false;
};

/**
 * 
 * @param {number[]} numbers 
 * @param {number} target 
 * @returns {boolean}
 */
function binarySearch(numbers, target)
{
    let left = 0;
    let right = numbers.length - 1;
    let mid = Math.floor((left + right) / 2);
    while (left <= right)
    {
        mid = Math.floor((left + right) / 2);
        if (numbers[mid] === target)
        {
            return true;
        }
        else if (numbers[mid] < target)
        {
            left = mid + 1;
        }
        else
        {
            right = mid - 1;
        }
    }
    return false;
}
// @lc code=end

console.log(searchMatrix([
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]], 13));